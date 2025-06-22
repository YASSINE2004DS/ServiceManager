import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'avoir react-router-dom installé
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCircle,
    faSignOutAlt,
    faPlusCircle,
    faIdCardAlt,
} from '@fortawesome/free-solid-svg-icons';
import { UserIdAndRole, token } from '../../Pages/Authentification/Authentification'; // import deux fonctions un pour la verifications

// Le logo de votre entreprise (à remplacer par le chemin réel de votre image)
import companyLogo from '../../Shared/Assets/safarelec-logo.png'; // Créez un dossier 'assets' dans 'src' et mettez votre logo ici
import styles from './PageHeader.module.css';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Pour détecter les clics en dehors du menu
    const { user_Id, role } = UserIdAndRole(token);
    const [InfoUser, SetInfoUser] = useState({});

    const userInitials =
        InfoUser.first_name && InfoUser.last_name
            ? InfoUser.first_name[0].toUpperCase() + InfoUser.last_name[0].toUpperCase()
            : 'US';

    // Ferme le menu si l'on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const RecupererInfoUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                SetInfoUser(response.data);
            } catch (error) {
                if (error.response.data.Error) {
                    console.log('Erreur :' + error.response.data.Error);
                    navigate('/errorPage');
                } else {
                    console.log('Erreur : ' + error.message);
                }
            }
        };

        RecupererInfoUser();
    }, [user_Id]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleAddIntervention = () => {
        setIsDropdownOpen(false); // Ferme le menu
        navigate('/AddIntervention'); // Navigue vers la page d'ajout d'intervention
    };

    const handleViewProfile = () => {
        setIsDropdownOpen(false); // Ferme le menu
        navigate('/profile'); // Navigue vers la page de profil
    };

    const handleLogout = () => {
        setIsDropdownOpen(false); // Ferme le menu

        // 1. Supprimer le token d'authentification (localStorage, Redux, Context, etc.)
        localStorage.removeItem('token'); // Exemple

        // 2. Rediriger l'utilisateur vers la page de connexion
        navigate('/login'); // Ou '/login'
    };

    return (
        <header className={styles['main-header']}>
            <div className={styles['header-left']}>
                <div className={styles['logo-container']}>
                    <img src={companyLogo} alt="Safarelec Logo" className={styles['company-logo']} />
                </div>
            </div>
            <div className={styles['header-right']}>
                <div className={styles['user-info-container']} ref={dropdownRef}>
                    <span className={styles['user-email']}>{InfoUser.email}</span>
                    <div className={styles['avatar-wrapper']} onClick={toggleDropdown}>
                        <div className={styles['user-avatar']}>{userInitials}</div>
                    </div>
                    {isDropdownOpen && (
                        <div className={styles['dropdown-menu']}>
                            <ul>
                                {role !== 'admin' && (
                                    <li onClick={handleAddIntervention}>
                                        <FontAwesomeIcon
                                            icon={faPlusCircle}
                                            className={styles['dropdown-icon']}
                                        />
                                        Ajouter Intervention
                                    </li>
                                )}
                                <li onClick={handleLogout}>
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className={styles['dropdown-icon']}
                                    />
                                    Déconnexion
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
