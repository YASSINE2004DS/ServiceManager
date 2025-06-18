// src/pages/EntreprisesPage.jsx
import React, { useState, useEffect }           from 'react';
import axios                                    from 'axios';
import EntrepriseFormModal                      from './EntrepriseFormModal';
import ExportationsListModal                    from './ExportationsListModal';
import styles                                   from './EntreprisesPage.module.css'; // Changement ici !
import { FontAwesomeIcon }                      from '@fortawesome/react-fontawesome';
import {ConfirmeOperation}                      from '../../../Shared/Components/SweetAlert'
import {ErrorManagement}                        from '../../../Shared/Components/MessageManagement'
import PageChargement                           from '../../../Pages/PageCommunComponnent/PageChargement'
import { faBuilding, faPlus, faEdit, faTrash, faInfoCircle, faArrowRight, faMapMarkerAlt, faEnvelope, faGlobe, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { useNavigate }                          from 'react-router-dom';

const EntreprisesPage = () => {
  const [entreprises, setEntreprises]                           = useState([]);
  const [isFormModalOpen, setIsFormModalOpen]                   = useState(false);
  const [isExportationsModalOpen, setIsExportationsModalOpen]   = useState(false);
  const [editingEntreprise, setEditingEntreprise]               = useState(null);
  const [selectedEntrepriseForExportations, setSelectedEntrepriseForExportations] = useState(null);
  const [loading, setLoading]                                   = useState(true);
  const [error, setError]                                       = useState(null);
  const [erreur, setErreur]                                     = useState(null);
  const [success, setSuccess]                                   = useState(null);

  const navigate                                                = useNavigate();

  const fetchEntreprises = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:8001/api/entreprise/exportation');
      setEntreprises(response.data);

    } catch (err) {

      console.error("Erreur lors de la récupération des entreprises:", err);
      setError("Impossible de charger les entreprises. Veuillez réessayer plus tard.");
    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntreprises();
  }, []);


    const RequestToUpdateEntreprise = async (id_Entreprise , data , etat=false)=> {
         const response = await axios.patch(`http://localhost:8001/api/entreprise/${id_Entreprise}?etat=${etat}`, data);

      if(etat) {
        setEntreprises(prev => prev.map(e => e.entreprise_id === id_Entreprise ? { ...e, ...data } : e));
        setSuccess("Entreprise modifié avec succès !");
      }
      return response ;
    }

      // handler : etat false => for check erreur only , etat true => add composant in DB
    const RequestToAddEntreprisen = async ( data , etat=false) => {
       const NewComposant =  await axios.post(`http://localhost:8001/api/entreprise?etat=${etat}`, data);

      if(etat) {
         setEntreprises(prev => [...prev, data]);
        setSuccess('Entreprise ajoutée avec succès !');
      }

      return NewComposant ;
    }

  const handleSaveEntreprise = async (entrepriseData) => {
    try {
      if (editingEntreprise) {
        // Mise à jour
             RequestToUpdateEntreprise(editingEntreprise.entreprise_id , entrepriseData).then(()=>
             {
                 ConfirmeOperation(  `Es-tu sûr de modifier l'entreprise ${editingEntreprise.name}?`,
                                     '',
                                     ()=>RequestToUpdateEntreprise(editingEntreprise.entreprise_id , entrepriseData , true)
              
                                  ); 
                setIsFormModalOpen(false);
               setEditingEntreprise(null);
            
             }).catch(error=>
               setErreur(error.response.data.message)
             )  

      } else {
        // Add Entreprise
             RequestToAddEntreprisen(entrepriseData).then(()=>
             {
                 ConfirmeOperation(  `Es-tu sûr d'ajouter l'entreprise ${entrepriseData.name} ?`,
                                     '',
                                     ()=>RequestToAddEntreprisen(entrepriseData , true)
              
                                  ); 
                setIsFormModalOpen(false);
               setEditingEntreprise(null);
            
             }).catch(error=>
               setErreur(error?.response?.data?.message)
             )
      }

    } catch (err) {
      console.error("Erreur lors de la sauvegarde de l'entreprise:", err);

    }
  };

  const handleDeleteEntreprise = async (entreprise) => {

      try {
              ConfirmeOperation(  `Es-tu sûr de suprimer le composant ${entreprise.name}?`,
                                '',
                                async ()=>{
                                     await axios.delete(`http://localhost:8001/api/entreprise/${entreprise.entreprise_id}`);
                                     setEntreprises(prev => prev.filter(c => c.entreprise_id !== entreprise.entreprise_id));
                                      setSuccess('Entreprise supprimée avec succès !');
                                }
              
                              );
      } catch (err) {
        console.error("Erreur lors de la suppression de l'entreprise:", err);
        setErreur("Erreur lors de la suppression de l'entreprise.");
      }
    
  };

  const openAddFormModal = () => {
    setEditingEntreprise(null);
    setIsFormModalOpen(true);
  };

  const openEditFormModal = (entreprise) => {
    setEditingEntreprise(entreprise);
    setIsFormModalOpen(true);
  };

  const openExportationsModal = (entreprise) => {
    setSelectedEntrepriseForExportations(entreprise);
    setIsExportationsModalOpen(true);
  };

  const closeExportationsModal = () => {
    setIsExportationsModalOpen(false);
    setSelectedEntrepriseForExportations(null);
  };

  const getEntrepriseTypeClass = (type) => {
    return type === 'exportation' ? styles.typeExportation : styles.typeImportation; // Utilise les classes modulaires
  };

  return (
    <div className={styles.entreprisesPageContainer}>
      <div className={styles.entreprisesHeader}>
        <h1 className={styles.entreprisesTitle}>
          <FontAwesomeIcon icon={faBuilding} className={styles.headerIcon} /> Gestion des Entreprises
        </h1>
        <button className={styles.addEntrepriseBtn} onClick={openAddFormModal}>
          <FontAwesomeIcon icon={faPlus} className={styles.btnIcon} /> Ajouter une Entreprise
        </button>
      </div>

      {loading && <PageChargement />}
      {error && <div className={styles.errorMessage}><FontAwesomeIcon icon={faInfoCircle} /> {error}</div>}

      {!loading && !error && entreprises.length === 0 && (
        <div className={styles.noDataMessage}>
          Aucune entreprise enregistrée. Cliquez sur "Ajouter une Entreprise" pour commencer !
        </div>
      )}

      {!loading && !error && entreprises.length > 0 && (
        
        <div className={styles.entreprisesListGrid}>

            {/*  erreur management  */}
            {(erreur && ErrorManagement(null, erreur, "error", setErreur)) || 
             (success && ErrorManagement(null, success, "success", setSuccess))}

          {entreprises.map((entreprise) => (

            <div key={entreprise.entreprise_id} className={styles.entrepriseCard}>
                  <a
                  style={{cursor:'pointer'}}
                  onClick={() => navigate(`/admin/Exportation?ExportationId=${entreprise.entreprise_id}&Entreprise=${entreprise.name}`)}
                  title={`Voir les exportations de exportation`}
                 >
              <h3 className={styles.entrepriseName}>{entreprise.name}</h3>
              <div className={styles.entrepriseDetails}>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.detailIcon} /> {entreprise.address || 'Non spécifiée'}</p>
                <p><FontAwesomeIcon icon={faEnvelope} className={styles.detailIcon} /> {entreprise.adresse_email || 'Non spécifié'}</p>
                <p><FontAwesomeIcon icon={faGlobe} className={styles.detailIcon} /> Pays: <strong>{entreprise.pays}</strong></p>
                <p>
                    <FontAwesomeIcon icon={faIndustry} className={styles.detailIcon} /> Type:
                    <span className={getEntrepriseTypeClass(entreprise.type_entreprise)}>
                        {entreprise.type_entreprise}
                    </span>
                </p>
                <p>Locale: {entreprise.locale ? 'Oui' : 'Non'}</p>
              </div>
              </a>
              <div className={styles.entrepriseActions}>

                <button
                  className={`${styles.actionBtn} ${styles.editBtn}`}
                  onClick={() => openEditFormModal(entreprise)}
                  title="Modifier cette entreprise"
                >
                  <FontAwesomeIcon icon={faEdit} /> Modifier
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  onClick={() => handleDeleteEntreprise(entreprise)}
                  title="Supprimer cette entreprise"
                >
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </button>
              </div>
            </div>
          
          ))}
        </div>
     
      )}

      <EntrepriseFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveEntreprise}
        initialData={editingEntreprise}
      />

      <ExportationsListModal
        isOpen={isExportationsModalOpen}
        onClose={closeExportationsModal}
        entreprise={selectedEntrepriseForExportations}
      />
    </div>
  );
};

export default EntreprisesPage;