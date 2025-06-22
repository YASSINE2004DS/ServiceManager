import React, { useEffect, useState } from 'react';
import CompteCard from './CompteCard';
import styles from './ComptesNonActive.module.css'; // Import the CSS Module

const ComptesNonActive = () => {
    const [comptesNonActives, setComptesNonActives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // New state for error messages

    const token = localStorage.getItem('token');

    // Function to fetch accounts (can be reused if needed for re-fetching)
    const fetchComptes = async () => {
        setLoading(true); // Always set loading to true when fetching
        setError(null); // Clear previous errors
        if (!token) {
            setError('Aucun token d\'authentification trouvé. Veuillez vous connecter.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/user/inactive', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json(); // Try to get error message from backend
                throw new Error(errorData.message || 'Erreur lors du chargement des comptes.');
            }
            const data = await response.json();
            setComptesNonActives(data);
        } catch (err) {
            console.error("Error fetching inactive accounts:", err);
            setError(err.message || 'Une erreur inattendue est survenue lors du chargement des comptes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComptes();
    }, [token]); // Dependency on token to re-fetch if it changes

    const handleValidate = async (id) => {
        setError(null); // Clear previous errors
        if (!token) {
            setError('Vous n\'êtes pas authentifié pour effectuer cette action.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/user/active/${id}`, {
                method: 'POST', // Assuming POST for activation
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Add content-type if your backend expects it
                },
            });

            const responseData = await response.json(); // Always parse response to check for messages

            if (!response.ok) {
                // Use backend's error message if available, otherwise a generic one
                throw new Error(responseData.message || responseData.Error || 'Échec de l’activation du compte.');
            }

            // If successful, remove the activated account from the list
            setComptesNonActives((prev) => prev.filter((compte) => compte.user_id !== id));
            // Optional: Show a success message if needed, e.g., with another state
            // setSuccessMessage('Compte activé avec succès !');

        } catch (err) {
            console.error(`Erreur lors de l'activation du compte ${id} :`, err);
            setError(err.message || 'Une erreur inattendue est survenue lors de l\'activation.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Comptes Non Actifs</h1>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            {loading ? (
                <p className={styles.message}>Chargement des comptes...</p>
            ) : comptesNonActives.length === 0 ? (
                <p className={styles.message}>Aucun compte non actif pour le moment.</p>
            ) : (
                <div className={styles.contentGrid}>
                    {comptesNonActives.map((compte) => (
                        <CompteCard
                            key={compte.user_id} // Use user_id as key as it's consistent with backend data
                            {...compte}
                            onValidate={() => handleValidate(compte.user_id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComptesNonActive;