// src/components/ShowIntervention/ShowIntervention.jsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faTrash, faInfoCircle, faEdit, faEye, faSort, faSortUp, faSortDown, 
  faCalendarDay, faListOl, faSyncAlt, faClipboardList // Nouvelle icône pour le titre
} from '@fortawesome/free-solid-svg-icons'; 
import styles from './ShowIntervention.module.css';
import axios from 'axios';
import { ConfirmeOperation } from '../../Shared/Components/SweetAlert';
import { useNavigate } from 'react-router-dom';
import PageChargement from '../../Pages/PageCommunComponnent/PageChargement';
import { VerifierExpiredToken, UserIdAndRole, token } from '../../Pages/Authentification/Authentification';

// --- Fonctions utilitaires ---
const convertirDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  } catch (e) {
    console.error("Erreur de conversion de date:", dateString, e);
    return 'Date invalide';
  }
};

const PAGE_SIZE = 10; 

const PageInterventions = () => {
  const navigate = useNavigate();

  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [interventionTodayFilter, setInterventionTodayFilter] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // --- Authentification et Autorisation ---
  useEffect(() => {
    if (!token || VerifierExpiredToken(token)) {
      navigate('/RequiredAuthentification');
      return;
    }
    const { role } = UserIdAndRole(token);
    if (role !== 'admin') {
      navigate('/AuthorizationFailed');
    }
  }, [navigate]);

  // --- Gestion des messages de succès ---
  const showMessage = useCallback((message, type = 'success') => {
    setSuccessMessage({ message, type });
    setTimeout(() => setSuccessMessage(null), 3000);
  }, []);

  // --- Récupération des interventions ---
  const fetchInterventions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `http://localhost:8000/api/intervention?Intervention_today=${interventionTodayFilter ? 'true' : 'false'}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInterventions(response.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Erreur lors du chargement des interventions:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de charger les interventions. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }, [interventionTodayFilter, refreshTrigger]);

  useEffect(() => {
    fetchInterventions();
  }, [fetchInterventions]);

  // --- Logique d'envoi d'intervention (changement de statut 'validate') ---
  const EnvoyerIntervention = useCallback(async (id_intervention) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/intervention/${UserIdAndRole(token).user_Id}/${id_intervention}?etat=true`,
        { validate: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage("Intervention envoyée avec succès.", 'success');
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'intervention:", error);
      showMessage("Une erreur est survenue lors de l'envoi de l'intervention.", 'error');
    }
  }, [showMessage]);

  // --- Logique de suppression de toutes les interventions ---
  const deleteAll = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:8000/api/intervention/${UserIdAndRole(token).user_Id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage('Toutes les interventions ont été supprimées.', 'success');
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Erreur lors de la suppression de toutes les interventions:", error);
      showMessage("Une erreur est survenue lors de la suppression globale.", 'error');
    }
  }, [showMessage]);

  // --- Logique de suppression d'une intervention par ID ---
  const deleteInterventionById = useCallback(async (id_intervention) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/intervention/${UserIdAndRole(token).user_Id}/${id_intervention}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage(`L'intervention DI-N° ${id_intervention} a été supprimée.`, 'success');
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'intervention:", error);
      showMessage("Une erreur est survenue lors de la suppression.", 'error');
    }
  }, [showMessage]);

  // --- Fonctions de navigation ---
  const ConsulterInterventionNavigate = useCallback((interventionId) => {
    navigate(`/intervention/${interventionId}`);
  }, [navigate]);

  const UpdateInterventionNavigate = useCallback((interventionId) => {
    navigate(`/UpdateIntervention/${interventionId}`);
  }, [navigate]);

  // --- Logique de filtrage et de tri des interventions affichées ---
  const filteredAndSortedInterventions = useMemo(() => {
    let currentInterventions = [...interventions];

    if (search.trim()) {
      const lowerCaseSearch = search.trim().toLowerCase();
      currentInterventions = currentInterventions.filter(interv =>
        String(interv.intervention_id).includes(lowerCaseSearch) ||
        convertirDate(interv.date).toLowerCase().includes(lowerCaseSearch) ||
        (interv.section && interv.section.name && interv.section.name.toLowerCase().includes(lowerCaseSearch)) ||
        (interv.maintenance_type && interv.maintenance_type.toLowerCase().includes(lowerCaseSearch))
      );
    }

    if (sortConfig.key) {
      currentInterventions.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'section') {
            aValue = a.section?.name || '';
            bValue = b.section?.name || '';
        } else if (sortConfig.key === 'date') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        } else if (sortConfig.key === 'status' || sortConfig.key === 'reception') {
            return sortConfig.direction === 'ascending' ? (aValue === bValue ? 0 : aValue ? 1 : -1) : (aValue === bValue ? 0 : aValue ? -1 : 1);
        }

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
        }
        if (typeof bValue === 'string') {
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return currentInterventions;
  }, [interventions, search, sortConfig]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredAndSortedInterventions.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentInterventionsPage = filteredAndSortedInterventions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return faSort;
    }
    return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
  };

  if (loading && interventions.length === 0) {
    return <PageChargement />;
  }

  return (
    <div className={styles.interventionsPageContainer}>
      <h1 className={styles.pageTitle}>
        <FontAwesomeIcon icon={faClipboardList} className={styles.titleIcon} /> Liste des Interventions
      </h1>

      <div className={styles.controlsSection}>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${interventionTodayFilter ? styles.activeFilter : ''}`}
            onClick={() => setInterventionTodayFilter(true)}
            title="Afficher les interventions d'aujourd'hui"
          >
            <FontAwesomeIcon icon={faCalendarDay} /> Aujourd'hui
          </button>
          <button
            className={`${styles.filterBtn} ${!interventionTodayFilter ? styles.activeFilter : ''}`}
            onClick={() => setInterventionTodayFilter(false)}
            title="Afficher toutes les interventions"
          >
            <FontAwesomeIcon icon={faListOl} /> Toutes
          </button>
          <button
              className={styles.refreshBtn}
              onClick={() => setRefreshTrigger(prev => prev + 1)}
              title="Rafraîchir les données"
          >
              <FontAwesomeIcon icon={faSyncAlt} /> Rafraîchir
          </button>
        </div>

        <div className={styles.searchContainer}>
          <input
            type='search'
            name='search'
            placeholder='Rechercher par N°, Date, Section ou Type'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className={styles.searchInput}
          />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>

        {interventions.length > 0 && (
          <button
            className={styles.deleteAllBtn}
            onClick={() =>
              ConfirmeOperation(
                `Êtes-vous sûr de vouloir supprimer toutes les interventions ? Cette action est irréversible.`,
                'Les interventions ont été supprimées avec succès.',
                deleteAll
              )
            }
            title="Supprimer toutes les interventions"
          >
            <FontAwesomeIcon icon={faTrash} /> Supprimer Tout
          </button>
        )}
      </div>

      {successMessage && <div className={`${styles.messageBox} ${styles[successMessage.type]}`}><FontAwesomeIcon icon={faInfoCircle} /> {successMessage.message}</div>}
      {error && <div className={`${styles.messageBox} ${styles.error}`}><FontAwesomeIcon icon={faInfoCircle} /> {error}</div>}


      {!loading && !error && filteredAndSortedInterventions.length === 0 && (
        <div className={styles.noDataMessage}>
          Aucune intervention trouvée {interventionTodayFilter ? "pour aujourd'hui" : ''}
          {search ? ` pour la recherche "${search}"` : ''}.
        </div>
      )}

      {!loading && !error && filteredAndSortedInterventions.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.interventionsTable}>
            <thead>
              <tr>
                <th onClick={() => requestSort('intervention_id')}>
                   N° DI <FontAwesomeIcon icon={getSortIcon('intervention_id')} />
                </th>
                <th onClick={() => requestSort('date')}>
                   Date <FontAwesomeIcon icon={getSortIcon('date')} />
                </th>
                <th onClick={() => requestSort('status')}>
                   Statut <FontAwesomeIcon icon={getSortIcon('status')} />
                </th>
                <th onClick={() => requestSort('reception')}>
                   Réception <FontAwesomeIcon icon={getSortIcon('reception')} />
                </th>
                <th onClick={() => requestSort('section')}>
                   Section <FontAwesomeIcon icon={getSortIcon('section')} />
                </th>
                <th onClick={() => requestSort('maintenance_type')}>
                   Type Maintenance <FontAwesomeIcon icon={getSortIcon('maintenance_type')} />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInterventionsPage.map((interv) => (
                <tr key={interv.intervention_id}>
                  <td>DI-N° {interv.intervention_id}</td>
                  <td>{convertirDate(interv.date)}</td>
                  <td>
                    <span className={interv.status ? styles.statusTextOui : styles.statusTextNon}>
                      {interv.status ? "Validée" : "En attente"}
                    </span>
                  </td>
                  <td>
                    <span className={interv.reception ? styles.statusTextOui : styles.statusTextNon}>
                      {interv.reception ? "Reçue" : "Non reçue"}
                    </span>
                  </td>
                  <td>{interv.section?.name || 'N/A'}</td>
                  <td>{interv.maintenance_type}</td>
                  <td className={styles.actionsCell}>
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => ConsulterInterventionNavigate(interv.intervention_id)}
                      title="Voir les détails"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      onClick={() => UpdateInterventionNavigate(interv.intervention_id)}
                      title="Modifier l'intervention"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() =>
                        ConfirmeOperation(
                          `Êtes-vous sûr de supprimer l'intervention DI-N° ${interv.intervention_id} ?`,
                          'Intervention supprimée avec succès.',
                          deleteInterventionById,
                          interv.intervention_id
                        )
                      }
                      title="Supprimer l'intervention"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !error && filteredAndSortedInterventions.length > PAGE_SIZE && (
        <div className={styles.paginationControls}>
          <button onClick={goToPrevPage} disabled={currentPage === 1} className={styles.paginationBtn}>Précédent</button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`${styles.paginationPageBtn} ${currentPage === page ? styles.activePage : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className={styles.paginationBtn}>Suivant</button>
        </div>
      )}
    </div>
  );
};

export default PageInterventions;