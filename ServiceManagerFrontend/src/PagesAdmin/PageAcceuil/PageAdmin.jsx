import React, { useState, useEffect } from 'react';
import './PageAdmin.css';
import PageHeader from '../../Pages/PageCommunComponnent/PageHeader'; // import page qui contient le header
// import PageChargement from '../../Pages/PageCommunComponnent/PageChargement'; // import page de chargement
import ShowIntervention                                from '../PageShowIntervention/ShowIntervention.jsx'
import SectionManagement                               from '../SectionManagement/SectionManagement.jsx'
import AgenceManagement                                from '../AgenceManagement/AgenceManagement.jsx'
import StatistiquesServives                            from '../PageStatistiquesService/StatistiquesService.jsx'
import { useParams , useNavigate }                     from 'react-router-dom';
import UsersManagement from '../UsersManagement/UsersManagement.jsx';
import ComptesNonActive from '../ComptesNonActiveManagement/ComptesNonActive.jsx';



const menuItems = [
    { key: 'statistiques', label: 'Statistiques'     },
    { key: 'utilisateurs', label: 'Utilisateurs' },
    { key: 'sections', label: 'Sections' },
    { key: 'interventions', label: 'Interventions' },
    { key: 'agences', label: 'Agences' },
    { key: 'comptesNonActive', label: 'Comptes non actifs' },
];

export default function AdminDashboard() {
    const { Page } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
            document.body.style.overflow = ''; // S'assurer que le scroll est activé sur desktop
        }
    }, [isSidebarOpen]);

    const renderContent = () => {
        switch (Page) {
            case 'utilisateurs':
                return <GestionUtilisateurs />;
            case 'sections':
                return <GestionSections />;
            case 'interventions':
                return <GestionInterventions />;
            case 'agences':
                return <GestionAgences />;
            case 'comptesNonActive':
                return <GestionComptesNonActive />;
            default:
                return null;
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
      document.body.style.overflow = ''; // S'assurer que le scroll est activé sur desktop
    }
  }, [isSidebarOpen]);


  const renderContent = () => {
    switch (Page) {
      case 'utilisateurs':
        return <GestionUtilisateurs />;
      case 'sections':
        return <GestionSections />;
      case 'interventions':
        return <GestionInterventions />;
      case 'agences':
        return <GestionAgences />;
      case 'statistiques':
         return <StatistiquesServives />
      default:
        return null;
    }
  };

  return (
    <div className="Container-globales">
      <PageHeader />
    <div className="dashboard-layout">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h2>Admin</h2>
            </div>
        </div>
    );
}

function GestionComptesNonActive() {
    return <ComptesNonActive />;
}

function GestionUtilisateurs() {
    return <UsersManagement />;
}

function GestionSections() {
    return <SectionManagement />;
}

function GestionInterventions() {
    return <ShowIntervention />;
}

function GestionAgences() {
    return <AgenceManagement />;
}
