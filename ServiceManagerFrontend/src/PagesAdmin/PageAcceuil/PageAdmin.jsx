import React, { useState } from 'react';
import './PageAdmin.css';
import PageHeader from '../../Pages/PageCommunComponnent/PageHeader'; // import page qui contient le header
// import PageChargement from '../../Pages/PageCommunComponnent/PageChargement'; // import page de chargement
import ShowIntervention                               from '../PageShowIntervention/ShowIntervention.jsx'
import { useParams , useNavigate } from 'react-router-dom';

const menuItems = [
  { key: 'utilisateurs', label: 'Utilisateurs' },
  { key: 'sections', label: 'Sections' },
  { key: 'interventions', label: 'Interventions' },
  { key: 'agences', label: 'Agences' },
];


export default function AdminDashboard() {
  const {Page}               = useParams() ;
  const navigate             = useNavigate() ;

  console.log(Page);

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
      default:
        return null;
    }
  };

  return (
    <div className="Container-globales">
      <PageHeader />
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="sidebar-header">Admin</div>
          <nav className="menu">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(`/admin/${item.key}` , {replace:true})}
                className={`menu-item ${Page === item.key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="main-content">
          {/* <h1 className="main-title"></h1>
          <div className="content-card">{renderContent()}</div> */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function GestionUtilisateurs() {
  return (
    <div>
      <p>Liste des utilisateurs et gestion CRUD ici.</p>
      <button className="btn">Ajouter un utilisateur</button>
    </div>
  );
}

function GestionSections() {
  return (
    <div>
      <p>Liste des sections et gestion CRUD ici.</p>
      <button className="btn">Ajouter une section</button>
    </div>
  );
}

function GestionInterventions() {
  return (
      <ShowIntervention />
  );
}

function GestionAgences() {
  return (
    <div>
      <p>Liste des agences et gestion CRUD ici.</p>
      <button className="btn">Ajouter une agence</button>
    </div>
  );
}
