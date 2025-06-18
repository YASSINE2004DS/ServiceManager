// src/pages/ComposantsPage.jsx
import React, { useState, useEffect, useMemo }        from 'react'; // Ajout de useMemo
import axios                                          from 'axios';
import ComposantFormModal                             from './ComposantFormModal';
import styles                                         from './ComposantsPage.module.css'; // Styles pour cette page
import { FontAwesomeIcon }                            from '@fortawesome/react-fontawesome';
import {ConfirmeOperation}                            from '../../../Shared/Components/SweetAlert'
import {ErrorManagement}                                             from '../../../Shared/Components/MessageManagement'
import PageChargement                                 from '../../../Pages/PageCommunComponnent/PageChargement'
import {VerifierExpiredToken , UserIdAndRole , token} from '../../../Pages/Authentification/Authentification' 
import { faPlus, faEdit, faTrash, faBoxOpen, faInfoCircle, faBoxes, faWarehouse, faDollarSign, faTruck, faClipboardCheck, faFilter, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'; // Nouvelles icônes
import countries                                      from "i18n-iso-countries";
import fr                                             from "i18n-iso-countries/langs/fr.json";
countries.registerLocale(fr);


const ComposantsPage = () => {
  const [composants, setComposants]             = useState([]);
  const [isModalOpen, setIsModalOpen]           = useState(false);
  const [editingComposant, setEditingComposant] = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [erreur, setErreur]                     = useState(null);
  const [success, setSuccess]                   = useState(null);
  const [filterCategory, setFilterCategory]     = useState('All'); // Nouvel état pour le filtre de catégorie
  const [filterStatus, setFilterStatus]         = useState('All'); // Nouvel état pour le filtre de catégorie


  // Fonction pour récupérer les composants
  const fetchComposants = async () => {
    try {
      setLoading(true);
      setError(null);

       const response = await axios.get('http://localhost:8001/api/composants');
       setComposants(response.data); // Utilisation des données factices
    } catch (err) {


      console.error("Erreur lors de la récupération des composants:", err);
      setError("Impossible de charger les composants. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComposants();
  }, []);

  // generate code yo country
  function getCountryCode(name) {

       let contry = name ;
       if(name===null || name===undefined)
         contry = 'Maroc' ;

  const code = countries.getAlpha2Code(contry, 'fr'); // ou 'en'
  return code ? code.toLowerCase() : null;
}

       // handler : etat false => for check erreur only , etat true => update composant in DB
    const RequestToUpdateComposnat = async (id_composant , data , etat=false)=> {
         const response = await axios.patch(`http://localhost:8001/api/composants/${id_composant}?etat=${etat}`, data);

      if(etat) {
        setComposants(prev => prev.map(c => c.id_composant === id_composant ? { ...c, ...data } : c));
        setSuccess("Composant modifié avec succès !");
      }
      return response ;
    }

      // handler : etat false => for check erreur only , etat true => add composant in DB
    const RequestToAddComposant = async ( data , etat=false) => {
       const NewComposant =  await axios.post(`http://localhost:8001/api/composants?etat=${etat}`, data);

      if(etat) {
        setComposants(prev => [...prev, NewComposant.data]);
        setSuccess("Composant ajouté avec succès !");
      }

      return NewComposant ;

    }

  
  // Gérer l'ajout ou la mise à jour d'un composant
  const handleSaveComposant = async (composantData) => {
   
      if (editingComposant) {
        // Mise à jour
             RequestToUpdateComposnat(editingComposant.id_composant , composantData).then(()=>
             {
                 ConfirmeOperation(  `Es-tu sûr de modifier le composant ${composantData.name} de la categorie ${composantData.categorie}?`,
                                     '',
                                     ()=>RequestToUpdateComposnat(editingComposant.id_composant  , composantData , true)
              
                                  ); 
               setIsModalOpen(false)
               setEditingComposant(null)// Réinitialiser le composant en édition  
            
             }).catch(error=>
               setErreur(error.response.data.message)
             )         

      } else {
        // Ajout
             RequestToAddComposant(composantData).then(()=>
             {
              ConfirmeOperation(  `Es-tu sûr d'ajouter le composant ${composantData.name} de la categorie ${composantData.categorie}?`,
                                '',
                                ()=>RequestToAddComposant(composantData , true)
              
                            ) 
               setIsModalOpen(false)
              setEditingComposant(null)// Réinitialiser le composant en édition  
            
             }).catch(error=>
               setErreur(error.response.data.message)
             )     
    
      }
      // fetchComposants(); // Rafraîchir la liste après ajout/modification (si pas de mise à jour locale)
  };

  // Gérer la suppression d'un composant
  const handleDeleteComposant = async (composantData) => {
      try {
              ConfirmeOperation(  `Es-tu sûr de suprimer le composant ${composantData.name} de la categorie ${composantData.categorie}?`,
                                '',
                                async ()=>{
                                     await axios.delete(`http://localhost:8001/api/composants/${composantData.id_composant}`);
                                     setComposants(prev => prev.filter(c => c.id_composant !== composantData.id_composant));
                                      setSuccess('Composant supprimé avec succès !');
                                }
              
                              );
          
      } catch (err) {

         if(err?.response?.data?.message) {
            setErreur(err?.response?.data?.message);
         }
        console.error("Erreur lors de la suppression du composant:", err);
        setError('Erreur lors de la suppression du composant.');
      }
  
  };

  // Gérer l'ouverture du modal pour l'ajout
  const openAddModal = () => {
    setEditingComposant(null); // S'assurer qu'il n'y a pas de composant en édition
    setIsModalOpen(true);
  };

  // Gérer l'ouverture du modal pour l'édition
  const openEditModal = (composant) => {
    setEditingComposant(composant);
    setIsModalOpen(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Obsolete': return 'status-obsolete';
      case 'End of Life': return 'status-eol';
      case 'Discontinued': return 'status-discontinued';
      case 'Draft': return 'status-draft';
      default: return '';
    }
  };

  // Obtenir toutes les catégories uniques pour le filtre
  const uniqueCategories = useMemo(() => {
    const categories = new Set(composants.map(c => c.categorie));
    return ['All', ...Array.from(categories).sort()];
  }, [composants]);

  // Filtrer les composants basés sur la catégorie sélectionnée
  const filteredComposants = useMemo(() => {
    if (filterCategory === 'All' && filterStatus === 'All' ) {
      return composants;
    }

    if(filterStatus === 'LowStock')
     return composants.filter(composant => ((composant.stock_quantity <= composant.min_stock_level && composant.min_stock_level !== null)));  

  // composant.stock_quantity <= composant.min_stock_level && composant.min_stock_level !== null
    if(filterCategory !== 'All' && filterStatus !== 'All')
     return composants.filter(c => ((c.categorie === filterCategory && c.status === filterStatus )));     
     
    if(filterCategory !== 'All')
    return composants.filter(c => (c.categorie === filterCategory ));

    if(filterStatus !== 'All')
      return composants.filter(c => (c.status === filterStatus));
  }, [composants, filterCategory , filterStatus]);

  return (
<div className={styles['composants-page-container-Ent']}>
  <div className={styles['composants-header-Ent']}>
     <h1 className={styles['composants-title-Ent']}>
        <FontAwesomeIcon icon={faBoxOpen} className={styles['header-icon-Ent']} /> Gestion des Composants
    </h1>
    <button className={styles['add-composant-btn-Ent']} onClick={openAddModal}>
      <FontAwesomeIcon icon={faPlus} className={styles['btn-icon-Ent']} /> Ajouter un Composant
    </button>
  </div>

<div className={styles['composants-filters-Ent']}>
  <div className={styles['filter-group-Ent']}>
    <label htmlFor="category-filter-Ent">
      <FontAwesomeIcon icon={faFilter} className={styles['filter-icon-Ent']} /> Filtrer par Catégorie:
    </label>
    <select
      id="category-filter-Ent"
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      className={styles['category-select-Ent']}
    >
      {uniqueCategories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  </div>

<div className={styles['filter-group-Ent']}>
  <label htmlFor="category-status-Ent">
    <FontAwesomeIcon icon={faFilter} className={styles['filter-icon-Ent']} /> Filtrer par status:
  </label>
  <select
    id="category-status-Ent"
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className={styles['category-select-Ent']}
  >
    <option value="All">All</option>            
    <option value="Active">Active</option>
    <option value="End of Life">End of Life</option>
    <option value="Obsolete">Obsolete</option>
    <option value="Discontinued">Discontinued</option>
    <option value="Draft">Draft</option>
  </select>
</div>

<div className={styles['filter-group-Ent']}>
  <label htmlFor="category-stock">
    <FontAwesomeIcon icon={faFilter} className={styles['filter-icon-Ent']} /> Filtrer par Etat de stock:
  </label>
  <select
    id="category-stock"
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className={styles['category-select-Ent']}
  >
    <option value="All">All</option>            
    <option value="LowStock">LowStock</option>
  </select>
</div>
      </div>

{loading && <PageChargement />}
{error && (
  <div className={styles['error-message-Ent']}>
    <FontAwesomeIcon icon={faInfoCircle} /> {error}
  </div>
)}
{(erreur && ErrorManagement(null, erreur, "error", setErreur)) || 
 (success && ErrorManagement(null, success, "success", setSuccess))}

{!loading && !error && filteredComposants.length === 0 && (
  <div className={styles['no-data-message-Ent']}>
    Aucun composant trouvé pour la catégorie "{filterCategory}".
  </div>
)}

{!loading && !error && filteredComposants.length > 0 && (
  <div className={styles['composants-list-grid-Ent']}>
    {filteredComposants.map((composant) => {
      const isLowStock = composant.stock_quantity <= composant.min_stock_level && composant.min_stock_level !== null;
      const pays = composant.entreprise != null ? composant.entreprise.pays : 'Maroc';
      const source = composant.entreprise != null ? composant.entreprise.name : 'Local';
      return (
        <div
          key={composant.id_composant}
          className={`${styles['composant-card-Ent']} ${isLowStock ? styles['low-stock-Ent'] : ''}`}
        >
          <h3 className={styles['composant-name-Ent']}>{composant.name}</h3>
          <p className={styles['composant-category-Ent']}>
            Catégorie: <strong>{composant.categorie}</strong>
          </p>

          {isLowStock && (
            <div className={styles['low-stock-warning-Ent']}>
              <FontAwesomeIcon icon={faExclamationTriangle} className={styles['warning-icon-Ent']} />
              <span>Stock faible! ({composant.stock_quantity}/{composant.min_stock_level})</span>
            </div>
          )}

<div className={styles['composant-details-row-Ent']}>
  <FontAwesomeIcon icon={faBoxes} className={styles['detail-icon-Ent']} />
  <span>Stock: <strong>{composant.stock_quantity}</strong></span>
</div>
<div className={styles['composant-details-row-Ent']}>
  <FontAwesomeIcon icon={faWarehouse} className={styles['detail-icon-Ent']} />
  <span>Min Stock: {composant.min_stock_level !== null ? composant.min_stock_level : 'N/A'}</span>
</div>
<div className={styles['composant-details-row-Ent']}>
  <FontAwesomeIcon icon={faWarehouse} className={styles['detail-icon-Ent']} />
  <span>Emplacement: {composant.location || 'N/A'}</span>
</div>
<div className={styles['composant-details-row-Ent']}>
  <FontAwesomeIcon icon={faDollarSign} className={styles['detail-icon-Ent']} />
  <span>Coût Unitaire: {composant.unit_cost ? `${parseFloat(composant.unit_cost).toFixed(4)} DH` : 'N/A'}</span>
</div>
<div className={styles['composant-details-row-Ent']}>
  <FontAwesomeIcon icon={faTruck} className={styles['detail-icon-Ent']} />
  <span>Délai: {composant.lead_time_days ? `${composant.lead_time_days} jours` : 'N/A'}</span>
</div>
<div className={styles['composant-details-row-Ent']}>
  <FontAwesomeIcon icon={faClipboardCheck} className={styles['detail-icon-Ent']} />
  <span>
    Statut: <span className={`${styles['composant-status-Ent']} ${styles[getStatusClass(composant.status)]}`}>{composant.status}</span>
  </span>
</div>

<div className={styles['composant-source-Ent']} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <p>Source Entreprise :</p>
  {composant.entreprise !== null && (
    <img
      src={`https://flagcdn.com/w80/${getCountryCode(pays)}.png`}
      alt={`Drapeau de ${pays}`}
      style={{ width: 24, height: 18 }}
    />
  )}

  {composant.entreprise === null ? (
    <p style={{ color: 'darkgreen', fontWeight: 'bold' }}>{source}</p>
  ) : (
    <p>{source}</p>
  )}
</div>

<div className={styles['composant-actions-Ent']}>
  <button
    className={`${styles['action-btn-Ent']} ${styles['edit-btn-Ent']}`}
    onClick={() => openEditModal(composant)}
    title="Modifier ce composant"
  >
    <FontAwesomeIcon icon={faEdit} /> Modifier
  </button>
  <button
    className={`${styles['action-btn-Ent']} ${styles['delete-btn-Ent']}`}
    onClick={() => handleDeleteComposant(composant)}
    title="Supprimer ce composant"
  >
    <FontAwesomeIcon icon={faTrash} /> Supprimer
  </button>
</div>
              </div>
            );
          })}
        </div>
      )}

      <ComposantFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveComposant}
        initialData={editingComposant}
      />

     {isModalOpen && <style>
        {
          `  body {
          overflow : hidden ;
        }
         
          `
        }
      
      </style>
   }
    </div>
  );
};

export default ComposantsPage;