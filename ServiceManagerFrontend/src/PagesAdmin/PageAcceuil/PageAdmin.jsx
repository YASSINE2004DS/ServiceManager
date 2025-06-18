import React from 'react';
import './PageAdmin.css';

import PageHeader from '../../Pages/PageCommunComponnent/PageHeader'; // import page qui contient le header
// import PageChargement from '../../Pages/PageCommunComponnent/PageChargement'; // import page de chargement
import ShowIntervention                                from '../PageShowIntervention/ShowIntervention.jsx'
import SectionManagement                               from '../SectionManagement/SectionManagement.jsx'
import AgenceManagement                                from '../AgenceManagement/AgenceManagement.jsx'
import StatistiquesServives                            from '../PageStatistiquesService/StatistiquesService.jsx'
import { useParams , useNavigate }                     from 'react-router-dom';
import UsersManagement                                 from '../UsersManagement/UsersManagement.jsx';
import ComptesNonActive                                from '../ComptesNonActiveManagement/ComptesNonActive.jsx';
import Composants                                      from '../EntrepriseManagement/ComposantsManagement/ComposantPage.jsx'
import Entreprises                                     from '../EntrepriseManagement/EntreprisesManagement/EntreprisesPage.jsx'
import Exportation                                     from '../EntrepriseManagement/ExportationManagement/ExportationsPage.jsx'



const menuItems = [
    { key: 'statistiques'       ,      label: 'Statistiques'       },
    { key: 'utilisateurs'       ,      label: 'Utilisateurs'       },
    { key: 'sections'           ,      label: 'Sections'           },
    { key: 'interventions'      ,      label: 'Interventions'      },
    { key: 'agences'            ,      label: 'Agences'            },
    { key: 'comptesNonActive'   ,      label: 'Comptes non actifs' },
    { key: 'Composants'         ,      label: 'Composants'         },
    { key: 'entreprises'        ,      label: 'Entreprises'        },
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
                return <GestionComptesNonActive />;
            case 'statistiques':
                  return <StatistiquesServives />
            case 'Composants':
                  return <Composants />
            case 'entreprises':
                 return <Entreprises />
            case 'Exportation':
                 return <Exportation />
            default:
                return <div>Sélectionnez un élément du menu</div>;
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
            <nav className="sidebar-nav">
                <ul>
                {menuItems.map((item) => (
                    <li  key={item.key}>
                          <a 
                          href={`/admin/${item.key}`}
                          className={`nav-item  ${Page === item.key ? 'active' : ''}`}>{item.label}
                          </a>
                    </li>

                      ))}
                </ul>
            </nav>
        </aside>



        {/* // style={{marginLeft:0}} */}
        <main className="main-content">  
            <button   className={`menuToggle ${isSidebarOpen ? 'active' : ''}`}
                      onClick={toggleSidebar}
                      aria-label="Toggle Menu"
            >

                <svg style={{height:30}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" classNameName="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
          {/* <h1 classNameName="main-title"></h1>
          <div classNameName="content-card">{renderContent()}</div> */}
          {renderContent()}
        </main>
      </div>
  </div>

    );
}
