// src/pages/Dashboard.js
import React, { useState, useEffect }                                               from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './StatistiquesService.css'
import PageChargement                                                               from '../../Pages/PageCommunComponnent/PageChargement'
import { FontAwesomeIcon }                                                          from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faSitemap,
  faBuilding,
  faTools
}                                                                                    from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  
  const [dashboardStats , setDashboardStats]  = useState({});
  const [chartData , setCharData]             = useState([]);
  const [loading , setLoading]                = useState(true);

  useEffect(()=> {
    const recupererStatistiques = async () => {
    try {
        const response =  await fetch('http://localhost:8000/api/statistiques',
                           {
                            method : 'GET'
                           }
                           
        );

        if(!response.ok)
        {
         const errorData = await response.json().catch(() => ({ message: 'Erreur Serveur' })); // Tente de lire le corps JSON de l'erreur
         throw new Error(`Erreur HTTP: ${response.status} - ${errorData.message || response.statusText}`);
        }
        
        const data = await response.json();
        setDashboardStats(data);

        //total des interventions
        const totalSections = (data.sectionRealisees + data.sectionNonRealisees);

        if (totalSections === 0) {
           // Si le total est zéro, toutes les sections sont à zéro pourcent
          setCharData([
              { name: 'Réalisées', value: 0 },
              { name: 'Non Réalisées', value: 0 },
          ]);

       } else {
          setCharData([
                  { name: 'Réalisées', value: (data.sectionRealisees / totalSections) * 100 },
                  { name: 'Non Réalisées', value: (data.sectionNonRealisees / totalSections) * 100 },
          ]);
         }
        
         setLoading(false);
        console.log("statistiques bien recuperer");

    } catch (error) {

      console.log("Erreur : " + error.message);
    }
  }
    recupererStatistiques();
  } , []);
 
  console.log(JSON.stringify(chartData));

  return (
    
    <div className="dashboard-page">

       <h1 className="dashboard-title-stats">Tableau de bord</h1>
       { loading ?
         (
            // page chargement 
            <PageChargement />

         ):(
        <div>
         <div className="stats-cards-grid">

            {/* Les cartes de statistiques restent inchangées */}

        <div className="stat-card">
          <div className="stat-icon-wrapper users">
            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.users}</span>
            <span className="stat-label">Utilisateurs</span>
          </div>
        </div>
     
        <div className="stat-card">
          <div className="stat-icon-wrapper sections">
            <FontAwesomeIcon icon={faSitemap} className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.sections}</span>
            <span className="stat-label">Sections</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper agencies">
            <FontAwesomeIcon icon={faBuilding} className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.agencies}</span>
            <span className="stat-label">Agences</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper interventions">
            <FontAwesomeIcon icon={faTools} className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboardStats.interventions}</span>
            <span className="stat-label">Interventions</span>
          </div>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Taux d'interventions réalisées vs non réalisées</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={ 'rgba(0, 0, 0, 0.05)'} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              domain={[0, 100]} // Définit la plage de l'axe Y de 0 à 100
              tickFormatter={(value) => `${value}%`} // Ajoute le symbole %
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Taux']} // Formatage du tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }} // Style du curseur
            />
            <Bar dataKey="value" barSize={80} radius={[8, 8, 0, 0]}>
              {/* Applique les couleurs aux barres */}
              {
                chartData.map((entry, index) => (
                  <Bar
                    key={`bar-${index}`}
                    fill={index === 0 ? '#6a5acd' : '#4682b4'} // Couleurs des barres
                  />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
          </div> )}
    </div>
            
  );
};

export default Dashboard;