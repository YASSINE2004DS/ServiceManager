import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './UsersManagement.module.css'; // Import the CSS module

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: 'user',
        agency_id: '',
    });
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const getAgencyName = async (agencyId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/agency/${agencyId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();
            return data.name || 'Inconnue';
        } catch (error) {
            console.error('Error fetching agency:', error);
            return 'Inconnue';
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();

            const formattedUsers = await Promise.all(
                data.map(async (user) => {
                    const agencyName = user.agency_id ? await getAgencyName(user.agency_id) : 'Non attribuée';
                    return {
                        id: user.user_id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: typeof user.role === 'string' ? user.role.toLowerCase() : 'user',
                        agency: agencyName,
                        agency_id: user.agency_id,
                    };
                })
            );

            setUsers(formattedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Échec du chargement des utilisateurs. Veuillez réessayer.');
        }
    };

    useEffect(() => {
        if (token) fetchUsers();
        else {
            console.error('Aucun token trouvé, veuillez vous connecter.');
            setError('Vous n\'êtes pas authentifié. Veuillez vous connecter.');
        }
    }, [token]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.email ||
            !formData.password ||
            !formData.confirm_password
        ) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        // Destructure to remove confirm_password and agency_id (if not directly sent)
        // Adjust this based on your backend's expected payload for user creation
        const { confirm_password, agency_id, ...dataToSend } = formData;

        try {
            const response = await fetch('http://localhost:8000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (!response.ok) {
                const message = result.message || result.Error || 'Une erreur inconnue est survenue.';
                setError(`Erreur lors de la création de l'utilisateur : ${message}`);
                return;
            }

            await fetchUsers(); // Refresh the list of users

            // Reset form and hide it
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: '',
                role: 'user',
                agency_id: '',
            });
            setShowAddForm(false);
            // Optionally, set a success message here
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            setError('Une erreur est survenue lors de la création de l\'utilisateur.');
        }
    };

    return (
        <div className={styles.usersManagementContainer}>
            <div className={styles.sectionHeader}>
                <h2>Gestion des utilisateurs</h2>
                <button className={styles.primaryButton} onClick={() => setShowAddForm(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Ajouter un utilisateur
                </button>
            </div>

            {showAddForm && (
                <div className={styles.addFormSection}>
                    {error && <p className={styles.alertMessage}>{error}</p>}

                    <form className={styles.formGrid} onSubmit={handleAddUser}>
                        <div className={styles.formField}>
                            <label htmlFor="first_name">Prénom :</label>
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                placeholder="Prénom de l'utilisateur"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="last_name">Nom :</label>
                            <input
                                id="last_name"
                                type="text"
                                name="last_name"
                                placeholder="Nom de l'utilisateur"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="email">Email :</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Adresse email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="password">Mot de passe :</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="confirm_password">Confirmer le mot de passe :</label>
                            <input
                                id="confirm_password"
                                type="password"
                                name="confirm_password"
                                placeholder="Confirmer le mot de passe"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="role">Rôle :</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                <option value="user">Utilisateur</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className={styles.formButtons}>
                            <button type="submit" className={styles.submitButton}>Créer</button>
                            <button type="button" className={styles.cancelButton} onClick={() => setShowAddForm(false)}>
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.usersCardsGrid}>
                {users.length === 0 && !error ? (
                    <p className={styles.noUsersMessage}>Aucun utilisateur trouvé pour le moment.</p>
                ) : (
                    users.map((user) => (
                        <UserCard key={user.id} {...user} users={users} setUsers={setUsers} fetchUsers={fetchUsers} />
                    ))
                )}
            </div>
        </div>
    );
};

export default UsersManagement;