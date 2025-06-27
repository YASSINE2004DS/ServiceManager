import React                                                       from 'react';
import styles                                                      from './CompteCard.module.css';
import { FontAwesomeIcon }                                         from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUserTag, faCheckCircle, faTrashAlt }from '@fortawesome/free-solid-svg-icons';
import Swal                                                        from 'sweetalert2'; // Import SweetAlert2
import { ConfirmeOperation }                                       from '../../Shared/Components/SweetAlert';


// Make sure to accept 'user_id' as a prop
const CompteCard = ({ user_id, first_name, last_name, email, role, onValidate, onDelete }) => {
    const token = localStorage.getItem('token');

    // Determine role class for potential specific styling
    const roleClass = role === 'admin' ? styles.roleAdmin : styles.roleUser;

    const handleDelete = async () => {
        // Show SweetAlert2 confirmation dialog
        const result = await Swal.fire({
            title: `Confirmer la suppression de ${first_name} ${last_name} ?`,
            text: "Cette action est irréversible et supprimera définitivement le compte.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545', // Red confirm button
            cancelButtonColor: '#6c757d', // Grey cancel button
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler',
            reverseButtons: true // Puts cancel on left, confirm on right
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8000/api/user/${user_id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const responseData = await response.json();

                if (!response.ok) {
                    // Display error message from backend or a generic one
                    Swal.fire(
                        'Erreur !',
                        responseData.message || responseData.Error || 'Échec de la suppression du compte.',
                        'error'
                    );
                    return;
                }

                // If successful, call the onDelete prop (passed from parent)
                // This allows the parent (ComptesNonActive) to update its state
                if (onDelete) {
                    onDelete(user_id);
                }

                Swal.fire(
                    'Supprimé !',
                    'Le compte a été supprimé avec succès.',
                    'success'
                );

            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
                Swal.fire(
                    'Erreur !',
                    'Une erreur inattendue est survenue lors de la suppression.',
                    'error'
                );
            }
        }
    };

    return (
        <div className={styles.compteCard}>
            <div className={styles.cardInfo}>
                <p className={styles.infoItem}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                    <strong>Nom :</strong> <span className={styles.infoValue}>{first_name} {last_name}</span>
                </p>
                <p className={styles.infoItem}>
                    <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                    <strong>Email :</strong> <span className={styles.infoValue}>{email}</span>
                </p>
                <p className={styles.infoItem}>
                    <FontAwesomeIcon icon={faUserTag} className={styles.icon} />
                    <strong>Rôle :</strong> <span className={`${styles.infoValue} ${roleClass}`}>{role}</span>
                </p>
            </div>

            <div className={styles.buttonContainer}> {/* New container for buttons */}
                <button className={`${styles.actionButton} ${styles.validateButton}`} onClick={()=>{
                    ConfirmeOperation(`Etes-vous sûr de vouloir Activé le compte de  ${first_name + last_name}?`,
                     'Compte est activé ',
                     ()=> onValidate()
                    )
                }}>
                    <FontAwesomeIcon icon={faCheckCircle} /> Valider
                </button>
                <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Supprimer
                </button>
            </div>
        </div>
    );
};

export default CompteCard;