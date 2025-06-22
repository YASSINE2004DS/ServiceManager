// src/components/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartBar, faUsers, faLayerGroup, faTools, faBuilding, 
    faUserSlash, faCog, faBuildingColumns, faFileExport, faPlusCircle,
    faBars, faTimes // Icônes pour le menu toggle
} from '@fortawesome/free-solid-svg-icons'; // Assurez-vous d'avoir toutes ces icônes installées

import PageHeader from '../../Pages/PageCommunComponnent/PageHeader';
import ShowIntervention from '../PageShowIntervention/ShowIntervention.jsx';
import SectionManagement from '../SectionManagement/SectionManagement.jsx';
import AgenceManagement from '../AgenceManagement/AgenceManagement.jsx';
import StatistiquesServives from '../PageStatistiquesService/StatistiquesService.jsx';
import UsersManagement from '../UsersManagement/UsersManagement.jsx'; // J'ai corrigé le chemin ici, assurez-vous qu'il est correct
import ComptesNonActive from '../ComptesNonActiveManagement/ComptesNonActive.jsx';
import Composants from '../EntrepriseManagement/ComposantsManagement/ComposantPage.jsx';
import Entreprises from '../EntrepriseManagement/EntreprisesManagement/EntreprisesPage.jsx';
import Exportation from '../EntrepriseManagement/ExportationManagement/ExportationsPage.jsx';
import AddExportation from '../EntrepriseManagement/ExportationManagement/components/ExportationFormModal.jsx';

import styles from './PageAdmin.module.css'; // Importation du module CSS

// Mapping des composants pour un rendu dynamique plus propre
const componentMap = {
    statistiques: StatistiquesServives,
    utilisateurs: UsersManagement,
    sections: SectionManagement,
    interventions: ShowIntervention,
    agences: AgenceManagement,
    comptesNonActive: ComptesNonActive,
    composants: Composants, // Correction de la clé pour être cohérente
    entreprises: Entreprises,
    exportation: Exportation, // Correction de la clé
    AddExportation: AddExportation, // Correction de la clé
};

// Éléments du menu avec leurs icônes
const menuItems = [
    { key: 'statistiques', label: 'Statistiques', icon: faChartBar },
    { key: 'utilisateurs', label: 'Utilisateurs', icon: faUsers },
    { key: 'sections', label: 'Sections', icon: faLayerGroup },
    { key: 'interventions', label: 'Interventions', icon: faTools },
    { key: 'agences', label: 'Agences', icon: faBuilding },
    { key: 'comptesNonActive', label: 'Comptes non actifs', icon: faUserSlash },
    { key: 'composants', label: 'Composants', icon: faCog }, // J'ai changé 'Composants' à 'composants' pour la cohérence
    { key: 'entreprises', label: 'Entreprises', icon: faBuildingColumns },
];


export default function AdminDashboard() {
    const { Page } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    // Gérer la taille de la fenêtre pour fermer la sidebar sur les grands écrans
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isSidebarOpen) {
                setIsSidebarOpen(false);
                document.body.style.overflow = '';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarOpen]);

    // Gérer le scroll du body quand le sidebar est ouvert/fermé sur mobile
    useEffect(() => {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
        } else {
            document.body.style.overflow = '';
        }
    }, [isSidebarOpen]);

    const CurrentComponent = componentMap[Page];

    return (
        <div className={styles.globalContainer}>
            <PageHeader />
            <div className={styles.dashboardLayout}>
                <aside
                    className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
                >
                    <div className={styles.sidebarHeader}>
                        <h2>Admin Panel</h2>
                    </div>
                    <nav className={styles.sidebarNav}>
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.key}>
                                    <a
                                        href={`/admin/${item.key}`}
                                        className={`${styles.navItem} ${Page === item.key ? styles.active : ''}`}
                                        onClick={() => {
                                            if (window.innerWidth <= 768) setIsSidebarOpen(false); // Ferme la sidebar après la sélection sur mobile
                                        }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} className={styles.navIcon} />
                                        <span className={styles.navLabel}>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                            {/* Ajoutez l'élément pour AddExportation si nécessaire, car il n'est pas dans menuItems */}
                            {Page === 'addExportation' && (
                                <li>
                                    <span className={`${styles.navItem} ${styles.active}`}>
                                        <FontAwesomeIcon icon={faPlusCircle} className={styles.navIcon} />
                                        <span className={styles.navLabel}>Ajouter Exportation</span>
                                    </span>
                                </li>
                            )}
                        </ul>
                    </nav>
                </aside>

                {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>} {/* Overlay pour mobile */}

                <main className={styles.mainContent}>
                    <button
                        className={`${styles.menuToggle} ${isSidebarOpen ? styles.active : ''}`}
                        onClick={toggleSidebar}
                        aria-label="Toggle Menu"
                    >
                        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                    </button>
                    {CurrentComponent ? <CurrentComponent /> : null}
                    {/* Ou un message si la page n'est pas trouvée */}
                    {!CurrentComponent && <div className={styles.notFoundMessage}>Sélectionnez une option dans le menu latéral.</div>}
                </main>
            </div>
        </div>
    );
}