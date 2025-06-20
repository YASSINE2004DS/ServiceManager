// src/pages/ExportationsPage.jsx
import React, { useState, useEffect }       from 'react';
import axios                                from 'axios'; // Pour de futures requêtes API
import styles                               from './ExportationsPage.module.css'; // Utilisation des CSS Modules
import { FontAwesomeIcon }                  from '@fortawesome/react-fontawesome';
import {
  faFileExport, faPlus, faEdit, faTrash, faPrint,
   faSpinner, faInfoCircle, faSort, faSortUp, faSortDown, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { ErrorManagement }                   from '../../../Shared/Components/MessageManagement';
import {ConfirmeOperation}                   from '../../../Shared/Components/SweetAlert'
import PageChargement                        from '../../../Pages/PageCommunComponnent/PageChargement'
import { useNavigate, useSearchParams }      from 'react-router-dom'; // Importez ceci

// Accepte entrepriseId comme prop
const ExportationsPage = () => {
  const [exportations, setExportations]                 = useState([]);
  const [isFormModalOpen, setIsFormModalOpen]           = useState(false);
  const [editingExportation, setEditingExportation]     = useState(null);
  const [loading, setLoading]                           = useState(true);
  const [loadingGenerateFacture , setloadingGenerateF]  = useState(false);
  const [loadingFacture, setLoadingfacture]             = useState([]);
  const [error, setError]                               = useState(null);
  const [searchDate, setSearchDate]                     = useState(''); // Nouveau state pour la recherche par date
  const [sortConfig, setSortConfig]                     = useState({ key: null, direction: 'ascending' });
  const [searchParams, setSearchParams]                 = useSearchParams(); 
  const [detailsParExportation, setDetailsParExportation] = useState([]);
  const  entrepriseId                                   = (parseInt(searchParams.get('ExportationId')) || null) ;  
  const entrepriseName                                  = (searchParams.get('Entreprise') || null);
  const [success, setSuccess]                           = useState(null);
  const navigate                                        = useNavigate();


  // Simulation de données (remplacez par de vrais appels API)
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:8001/api/exportation/Exportation/${entrepriseId}`);
      setExportations(response.data);

    } catch (err) {

      console.error("Erreur lors du chargement des données initiales:", err);
      setError("Impossible de charger les données. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

const FetcdetailExportation = async (id_expo) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/composantExporte/${id_expo}`);
    const composants = response.data;
    // console.log("fetching" ,JSON.stringify(response.data)); return;

    const total = composants.reduce((Acc, composant) => {
      return Acc + composant.quantite * composant.composant.unit_cost;
    }, 0);

    const nbr_composant = composants.length;
    let detail = {} ;
      detail.total = total;
      detail.nbr_composant = nbr_composant ;
    return detail ;

  } catch (error) {
    console.log("Erreur lors de la récupération des détails :", error);
    return null; // ou throw error;
  }
};

  useEffect(() => {
        setLoading(true);
  const fetchAllDetails = async () => {
    const allDetails = {};
    const LoadingfactureTab = [];

    for (const exportation of exportations) {
      const details = await FetcdetailExportation(exportation.id_exportation);
      if (details) {

        allDetails[exportation.id_exportation] = details;
        LoadingfactureTab[exportation.id_exportation]=false ;
      }
    }
    setLoadingfacture(LoadingfactureTab);
    setDetailsParExportation(allDetails);
   
  };

  fetchAllDetails();
   setLoading(false);
}, [exportations]);


  useEffect(() => {
    // Si entrepriseId change, rechargez les données
    if (entrepriseId) {
        fetchInitialData();
    } else {
        setLoading(false);
        setError("Aucune entreprise sélectionnée pour afficher les exportations.");
    }
  }, [entrepriseId]); // Dépendance à entrepriseId


  const handleDeleteExportation = async (exportation) => {
      try {
                      ConfirmeOperation(  `Es-tu sûr de suprimer lexportation N° ${exportation.id_exportation}?`,
                                '',
                                async ()=>{
                                     await axios.delete(`http://localhost:8001/api/exportation/${exportation.id_exportation}`);
                                     setExportations(prev => prev.filter(e => e.id_exportation !== exportation.id_exportation));
                                      setSuccess('Exportation supprimée avec succès !');
                                }
              
                              );
      } catch (err) {
        console.error("Erreur lors de la suppression de l'exportation:", err);
        alert("Erreur lors de la suppression de l'exportation.");
      }
    
  };


  const openEditFormModal = (exportation) => {
    setEditingExportation(exportation);
    setIsFormModalOpen(true);
  };

  const handlePrintFacture = async  (id_exportation) => {
      try {

        setloadingGenerateF(true);
        setLoadingfacture(loadingFacture.map((_ , ind)=>(ind === id_exportation ? true : false)));
    const response = await axios.get(`http://localhost:8001/api/facture/${id_exportation}`, {
      responseType: 'blob', // important pour récupérer un fichier binaire (PDF)
    });
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Ouvrir dans un nouvel onglet
    window.open(pdfUrl, '_blank');

  } catch (error) {
    console.error("Erreur lors de la prévisualisation du PDF :", error);
  }finally {
       setloadingGenerateF(false);
       setLoadingfacture(loadingFacture.map((_ , ind)=>(ind === id_exportation ? false : false)));
  }
  
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


const sortedExportations = [...exportations].sort((a, b) => {
  if (!sortConfig.key) return 0;

  let aValue = a[sortConfig.key];
  let bValue = b[sortConfig.key];

  if (sortConfig.key === 'nombre_composants') {
    aValue = detailsParExportation[a.id_exportation]?.nbr_composant || 0;
    bValue = detailsParExportation[b.id_exportation]?.nbr_composant || 0;

  // Si on trie par une date
  } else if (sortConfig.key.startsWith('date_')) {
    aValue = new Date(aValue).getTime();
    bValue = new Date(bValue).getTime();

  } else if (sortConfig.key === 'montant_total') {
    aValue = detailsParExportation[a.id_exportation]?.total || 0;
    bValue = detailsParExportation[b.id_exportation]?.total || 0;
  }

  // Comparaison
  if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
  if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
  return 0;
});


  // Filtrer par date d'exportation
  const filteredExportationsByDate = searchDate
    ? sortedExportations.filter(exp => {
        const expDate = new Date(exp.date_exportation).toISOString().split('T')[0];
        return expDate === searchDate;
      })
    : sortedExportations;


  if (!entrepriseId) {
    return (
      <div className={styles.exportationsPageContainer}>
        <div className={styles.errorMessage}>
          <FontAwesomeIcon icon={faInfoCircle} /> Veuillez spécifier un ID d'entreprise pour afficher les exportations.
        </div>
      </div>
    );
  }


  return (
    <div className={styles.exportationsPageContainer}>

                   {/* error management */}
         {(success && ErrorManagement(null, success, "success", setSuccess))}

      <div className={styles.exportationsHeader}>
        <h1 className={styles.exportationsTitle}>
          <FontAwesomeIcon icon={faFileExport} className={styles.headerIcon} />
          Exportations de {entrepriseName ? entrepriseName : 'Chargement...'}
        </h1>
      
        <button className={`${styles.addExportationBtn} ${loadingGenerateFacture ? styles.disabledColor : ''}`} 
                onClick={()=>navigate(`/admin/AddExportation/${entrepriseId}?entrepriseName=${entrepriseName}`)}
                disabled={loadingGenerateFacture}
                
        >
          <FontAwesomeIcon icon={faPlus} className={styles.btnIcon} /> Ajouter une Exportation
        </button>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="searchDate" className={styles.filterLabel}>
          <FontAwesomeIcon icon={faSearch} /> Rechercher par Date d'Exportation:
        </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className={styles.filterInputDate}
        />
      </div>

      {loading && <PageChargement />}
      {error && <div className={styles.errorMessage}><FontAwesomeIcon icon={faInfoCircle} /> {error}</div>}

      {!loading && !error && filteredExportationsByDate.length === 0 && (
        <div className={styles.noDataMessage}>
          Aucune exportation trouvée {searchDate ? `pour la date ${new Date(searchDate).toLocaleDateString()}` : ''}.
        </div>
      )}

      {!loading && !error && filteredExportationsByDate.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.exportationsTable}>
            <thead>
              <tr>
                <th onClick={() => requestSort('id_exportation')}>
                  N° Exportation <FontAwesomeIcon icon={getSortIcon('id_exportation')} />
                </th>
                <th onClick={() => requestSort('date_demande')}>
                  Date Demande <FontAwesomeIcon icon={getSortIcon('date_demande')} />
                </th>
                <th onClick={() => requestSort('date_exportation')}>
                  Date Exportation <FontAwesomeIcon icon={getSortIcon('date_exportation')} />
                </th>
                <th onClick={() => requestSort('nombre_composants')}>
                  Nbr Composants <FontAwesomeIcon icon={getSortIcon('nombre_composants')} />
                </th>
                <th onClick={() => requestSort('montant_total')}>
                  Montant Total (DH) <FontAwesomeIcon icon={getSortIcon('montant_total')} />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
{filteredExportationsByDate.map((exportation , index) => {
  const details = detailsParExportation[exportation.id_exportation];
  return (
    <tr key={exportation.id_exportation}>
      <td>{exportation.id_exportation}</td>
      <td>{new Date(exportation.date_demande).toLocaleDateString()}</td>
      <td>{new Date(exportation.date_exportation).toLocaleDateString()}</td>
      <td>{details?.nbr_composant !== undefined  ? details.nbr_composant   : 0}</td>
      <td>{details?.total !== undefined ? details.total.toFixed(2)  : 'N/A'}</td>

      <td className={`${styles.actionsCell}`}>
        <button className={`${styles.actionBtn} ${styles.editBtn}  ${loadingGenerateFacture ? styles.disabledColor : ''}`} 
                onClick={() => openEditFormModal(exportation)} 
                title="Modifier" 
                disabled={loadingGenerateFacture}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>

        <button className={`${styles.actionBtn} ${styles.deleteBtn} ${loadingGenerateFacture ? styles.disabledColor : ''}`} 
                onClick={() => handleDeleteExportation(exportation)} 
                title="Supprimer"
                disabled={loadingGenerateFacture}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <button className={`${styles.actionBtn} ${styles.printBtn}`} 
                onClick={() => handlePrintFacture(exportation.id_exportation)} 
                title="Imprimer Facture">
             {loadingFacture[exportation.id_exportation] &&             
                   <FontAwesomeIcon 
                    icon={faSpinner}
                    style={{padding:'0px 8px',}} 
                    spin size="1x" />
             }
             {loadingFacture[exportation.id_exportation] ? 'generate' : <FontAwesomeIcon icon={faPrint} />}

        </button>
      </td>
    </tr>
  );
})}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ExportationsPage;