// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './StatistiquesService.module.css'; // Import the CSS module
import PageChargement from '../../Pages/PageCommunComponnent/PageChargement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faSitemap,
    faBuilding,
    faTools,
    faTruck,          // For import companies
    faPlaneDeparture, // For export companies
    faCogs,           // For components
    faFileExport      // For total exports
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState({});
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const recupererStatistiques = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8000/api/statistiques');
                const response2 = await fetch('http://localhost:8001/api/statistiques');
                if (!response.ok && !response2.data ) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                const data2 = await response2.json();
                setDashboardStats({...data , ...data2});


                // --- Calculate chartData here ---
                const totalInterventions = (data.interventionRealisees || 0) + (data.interventionNonRealisees || 0);
                let realizedPercentage = 0;
                let notRealizedPercentage = 0;

                if (totalInterventions > 0) {
                    realizedPercentage = parseFloat(((data.interventionRealisees / totalInterventions) * 100).toFixed(2));
                    notRealizedPercentage = parseFloat(((data.interventionNonRealisees / totalInterventions) * 100).toFixed(2));
                }

                setChartData([
                    { name: 'Réalisées', value: realizedPercentage },
                    { name: 'Non Réalisées', value: notRealizedPercentage }
                ]);
                // --- End chartData calculation ---

            } catch (err) {
                console.error("Erreur lors de la récupération des statistiques:", err);
                setError(err.message || 'Une erreur inattendue est survenue lors du chargement des statistiques.');
            } finally {
                setLoading(false);
            }
        };
        recupererStatistiques();
    }, []);
    return (
        <div className={styles.dashboardPage}>
  
            <h1 className={styles.title}>Tableau de bord</h1>

            {loading ? (
                <PageChargement />
            ) : error ? (
                <p className={styles.errorMessage}>{error}</p>
            ) : (
                <div>
                    <div className={styles.statsCardsGrid}>
                        {/* Stat Card: Utilisateurs */}
                        <div className={`${styles.statCard} ${styles.users}`}>
                            <div className={`${styles.statIconWrapper} ${styles.users}`}>
                                <FontAwesomeIcon icon={faUsers} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.users || 0}</span>
                                <span className={styles.statLabel}>Utilisateurs</span>
                            </div>
                        </div>

                        {/* Stat Card: Sections */}
                        <div className={`${styles.statCard} ${styles.sections}`}>
                            <div className={`${styles.statIconWrapper} ${styles.sections}`}>
                                <FontAwesomeIcon icon={faSitemap} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.sections || 0}</span>
                                <span className={styles.statLabel}>Sections</span>
                            </div>
                        </div>

                        {/* Stat Card: Agences */}
                        <div className={`${styles.statCard} ${styles.agencies}`}>
                            <div className={`${styles.statIconWrapper} ${styles.agencies}`}>
                                <FontAwesomeIcon icon={faBuilding} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.agencies || 0}</span>
                                <span className={styles.statLabel}>Agences</span>
                            </div>
                        </div>

                        {/* Stat Card: Interventions */}
                        <div className={`${styles.statCard} ${styles.interventions}`}>
                            <div className={`${styles.statIconWrapper} ${styles.interventions}`}>
                                <FontAwesomeIcon icon={faTools} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.interventions || 0}</span>
                                <span className={styles.statLabel}>Interventions</span>
                            </div>
                        </div>

                        {/* NEW Stat Card: Entreprises d'Importation */}
                        <div className={`${styles.statCard} ${styles.importCompanies}`}>
                            <div className={`${styles.statIconWrapper} ${styles.importCompanies}`}>
                                <FontAwesomeIcon icon={faTruck} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.entreprisesImport || 0}</span>
                                <span className={styles.statLabel}>Entreprises Import</span>
                            </div>
                        </div>

                        {/* NEW Stat Card: Entreprises d'Exportation */}
                        <div className={`${styles.statCard} ${styles.exportCompanies}`}>
                            <div className={`${styles.statIconWrapper} ${styles.exportCompanies}`}>
                                <FontAwesomeIcon icon={faPlaneDeparture} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.entreprisesExport || 0}</span>
                                <span className={styles.statLabel}>Entreprises Export</span>
                            </div>
                        </div>

                        {/* NEW Stat Card: Composants */}
                        <div className={`${styles.statCard} ${styles.components}`}>
                            <div className={`${styles.statIconWrapper} ${styles.components}`}>
                                <FontAwesomeIcon icon={faCogs} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.composants || 0}</span>
                                <span className={styles.statLabel}>Composants</span>
                            </div>
                        </div>

                        {/* NEW Stat Card: Exportations Totales */}
                        <div className={`${styles.statCard} ${styles.totalExports}`}>
                            <div className={`${styles.statIconWrapper} ${styles.totalExports}`}>
                                <FontAwesomeIcon icon={faFileExport} className={styles.statIcon} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statValue}>{dashboardStats.exportations || 0}</span>
                                <span className={styles.statLabel}>Exportations Totales</span>
                            </div>
                        </div>

                    </div>

                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Taux d'interventions réalisées vs non réalisées</h3>
                        {chartData.length > 0 && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 20, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={'rgba(0, 0, 0, 0.05)'} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis
                                        domain={[0, 100]}
                                        tickFormatter={(value) => `${value}%`}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value}%`, 'Taux']}
                                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    />
                                    <Bar dataKey="value" barSize={80} radius={[8, 8, 0, 0]}>
                                        {
                                            chartData.map((entry, index) => (
                                                <Bar
                                                    key={`bar-${index}`}
                                                    fill={index === 0 ? '#007bff' : '#fd7e14'}
                                                />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                        {chartData.length === 0 && (
                            <p className={styles.message}>Pas de données d'interventions pour le graphique.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;