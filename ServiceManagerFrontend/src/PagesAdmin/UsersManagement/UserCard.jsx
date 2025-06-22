import React, { useState } from 'react';
import styles from './UserCard.module.css'; // Import the new CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faPen, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ id, first_name, last_name, email, role, agency, users, setUsers, fetchUsers }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        first_name,
        last_name,
        role,
    });
    const [feedbackMessage, setFeedbackMessage] = useState({ type: '', message: '' });
    const token = localStorage.getItem('token');

    // Reset editedUser to current props when starting edit mode
    const startEditing = () => {
        setEditedUser({ first_name, last_name, role }); // Only editable fields
        setFeedbackMessage({ type: '', message: '' }); // Clear any previous feedback
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setFeedbackMessage({ type: '', message: '' }); // Clear previous messages
        if (!editedUser.first_name || !editedUser.last_name || !editedUser.role) {
            setFeedbackMessage({ type: 'error', message: 'Veuillez remplir tous les champs.' });
            return;
        }

        try {
            // Only send fields that are editable and might change
            const userUpdatePayload = {
                first_name: editedUser.first_name,
                last_name: editedUser.last_name,
                role: editedUser.role,
                // Do NOT send email or agency_id here unless they are meant to be editable via this card
                // If agency_id needs to be editable, you'd add an input for it and fetch agency list for a select
            };

            const response = await fetch(`http://localhost:8000/api/user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userUpdatePayload),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.Error || data.message || 'Échec de la mise à jour de l\'utilisateur.';
                setFeedbackMessage({ type: 'error', message: errorMessage });
                return;
            }

            // If update is successful, refresh the users list in parent component
            // This ensures agency name updates if agency_id was changed in the backend via another mechanism
            if (fetchUsers) {
                await fetchUsers();
            } else {
                // Fallback: update local state if fetchUsers is not passed
                const updatedUsers = users.map((user) =>
                    user.id === id ? { ...user, ...editedUser } : user
                );
                setUsers(updatedUsers);
            }
            setFeedbackMessage({ type: 'success', message: 'Utilisateur mis à jour avec succès !' });
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            setFeedbackMessage({ type: 'error', message: 'Erreur inattendue lors de la mise à jour.' });
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser({ first_name, last_name, role }); // Reset to original values
        setFeedbackMessage({ type: '', message: '' }); // Clear feedback
    };

    const handleDelete = async () => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${first_name} ${last_name} ?`)) return;
        setFeedbackMessage({ type: '', message: '' }); // Clear previous messages

        try {
            const response = await fetch(`http://localhost:8000/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.Error || data.message || 'Échec de la suppression de l\'utilisateur.';
                setFeedbackMessage({ type: 'error', message: errorMessage });
                return;
            }

            // Remove user locally or trigger a full refresh
            if (fetchUsers) {
                await fetchUsers(); // Refresh the entire list
            } else {
                const updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);
            }
            setFeedbackMessage({ type: 'success', message: 'Utilisateur supprimé avec succès !' });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            setFeedbackMessage({ type: 'error', message: 'Erreur inattendue lors de la suppression.' });
        }
    };

    return (
        <div className={styles.userCard}>
            {feedbackMessage.message && (
                <div className={`${styles.feedbackMessage} ${feedbackMessage.type === 'error' ? styles.errorMessage : styles.successMessage}`}>
                    {feedbackMessage.message}
                </div>
            )}

            <div className={styles.userInfo}>
                <span className={styles.userId}>#{id}</span>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="first_name"
                            value={editedUser.first_name}
                            onChange={handleChange}
                            placeholder="Prénom"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={editedUser.last_name}
                            onChange={handleChange}
                            placeholder="Nom"
                        />
                    </>
                ) : (
                    <>
                        <span className={styles.userName}>
                            {`${first_name} ${last_name}`}
                        </span>
                        <span className={styles.userEmail}>{email}</span>
                    </>
                )}
            </div>

            <div className={styles.userDetails}>
                {isEditing ? (
                    <div className={styles.formField}> {/* Re-using formField for consistency */}
                        <label htmlFor={`role-${id}`}>Rôle :</label>
                        <select
                            id={`role-${id}`} // Unique ID for accessibility
                            name="role"
                            value={editedUser.role}
                            onChange={handleChange}
                        >
                            <option value="user">Utilisateur</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                ) : (
                    <>
                        <span className={styles.userRole}>
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />
                            Rôle: <span>{role}</span>
                        </span>
                        <span className={styles.userAgency}>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
                            Agence: <span>{agency}</span>
                        </span>
                    </>
                )}
            </div>

            <div className={styles.userActions}>
                {isEditing ? (
                    <>
                        <button className={`${styles.actionButton} ${styles.saveButton}`} onClick={handleSave}>
                            <FontAwesomeIcon icon={faSave} /> Enregistrer
                        </button>
                        <button className={`${styles.actionButton} ${styles.cancelButton}`} onClick={handleCancel}>
                            <FontAwesomeIcon icon={faTimes} /> Annuler
                        </button>
                    </>
                ) : (
                    <>
                        <button className={`${styles.actionButton} ${styles.editButton}`} onClick={startEditing}>
                            <FontAwesomeIcon icon={faPen} /> Modifier
                        </button>
                        <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} /> Supprimer
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCard;