import React from 'react';
import './PageAdmin.css';
import PageHeader from '../../Pages/PageCommunComponnent/PageHeader';
import ShowIntervention from '../PageShowIntervention/ShowIntervention.jsx';
import SectionManagement from '../SectionManagement/SectionManagement.jsx';
import AgenceManagement from '../AgenceManagement/AgenceManagement.jsx';
import StatistiquesServives from '../PageStatistiquesService/StatistiquesService.jsx';
import UsersManagement from '../UsersManagement/UsersManagement.jsx';
import ComptesNonActive from '../ComptesNonActiveManagement/ComptesNonActive.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const menuItems = [
    { key: 'statistiques', label: '📊 Statistiques' },
    { key: 'utilisateurs', label: '👥 Utilisateurs' },
    { key: 'sections', label: '📁 Sections' },
    { key: 'interventions', label: '🛠️ Interventions' },
    { key: 'agences', label: '🏢 Agences' },
    { key: 'comptesNonActive', label: '🚫 Comptes non actifs' },
];

export default function AdminDashboard() {
    const { Page } = useParams();
    const navigate = useNavigate();

    const renderContent = () => {
        if (!menuItems.some((item) => item.key === Page)) {
            return <div>Page non trouvée. Veuillez sélectionner un élément valide.</div>;
        }
        switch (Page) {
            case 'utilisateurs':
                return <UsersManagement />;
            case 'sections':
                return <SectionManagement />;
            case 'interventions':
                return <ShowIntervention />;
            case 'agences':
                return <AgenceManagement />;
            case 'comptesNonActive':
                return <ComptesNonActive />;
            case 'statistiques':
                return <StatistiquesServives />;
            default:
                return <div>Sélectionnez un élément du menu</div>;
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="dashboard-layout">
                <aside className="sidebar">
                    <div className="sidebar-header">🎛️ Admin Panel</div>
                    <nav className="sidebar-nav">
                        {menuItems.map((item) => (
                            <div
                                key={item.key}
                                className={`nav-item ${Page === item.key ? 'active' : ''}`}
                                onClick={() => navigate(`/admin/${item.key}`)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </nav>
                </aside>
                <PageHeader />
                <main className="main-content">{renderContent()}</main>
            </div>
        </div>
    );
}
