import React                                                              from 'react';
import { useNavigate }                                                    from 'react-router-dom';
import { FontAwesomeIcon }                                                from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faEnvelopeOpenText, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './CompteNonActive.module.css'; // Make sure to create this CSS module

const AccountNotActivated = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login'); // Assuming your login page route is '/login'
    };

    const handleGoToHome = () => {
        navigate('/'); // Assuming your home page route is '/'
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <FontAwesomeIcon icon={faExclamationTriangle} className={styles.warningIcon} />
                <h1 className={styles.title}>Compte Non Activé</h1>
                <p className={styles.message}>
                    Votre compte n'est pas encore activé.
                </p>
                <p className={styles.subMessage}>
                    Veuillez vérifier votre boîte de réception e-mail (et votre dossier de spam) pour le lien d'activation que nous vous avons envoyé.
                </p>

                <div className={styles.instructions}>
                    <p>
                        <FontAwesomeIcon icon={faEnvelopeOpenText} className={styles.instructionIcon} />
                        Un email d'activation a été envoyé à l'adresse que vous avez fournie lors de l'inscription.
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faSignInAlt} className={styles.instructionIcon} />
                        Une fois activé, vous pourrez vous connecter.
                    </p>
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={handleGoToLogin} className={styles.button}>
                        <FontAwesomeIcon icon={faSignInAlt} className={styles.buttonIcon} />
                        Aller à la page de connexion
                    </button>
                    <button onClick={handleGoToHome} className={`${styles.button} ${styles.secondaryButton}`}>
                        <FontAwesomeIcon icon={faHome} className={styles.buttonIcon} />
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountNotActivated;