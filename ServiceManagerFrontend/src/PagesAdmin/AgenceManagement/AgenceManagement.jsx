// src/components/AgencyManagement.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faStar , faPlus , faTimes } from '@fortawesome/free-solid-svg-icons';
import {VerifierExpiredToken , UserIdAndRole , token}   from '../../Pages/Authentification/Authentification' // import deux fonctions un pour la verifications
import {  useNavigate  }                                from 'react-router-dom';
import {ConfirmeOperation}                              from '../../Shared/Components/SweetAlert'
import {ErrorManagement}                              from '../../Shared/Components/MessageManagement'
import axios from 'axios'
import './AgenceManagement.css';
// import '../SectionManagement/SectionManagement.css';

const AgencyManagement = ({  }) => {

            // hooks pour verifié l'authentification et l'expiration du token
            useEffect(( )=> {
              if(!token || VerifierExpiredToken(token))
                {
                    navigate('/RequiredAuthentification');
                    return ;
                }
              const { role} = UserIdAndRole(token);
        
                if(role !== 'admin')
                   navigate('/AuthorizationFailed');
             } , []);

  const [agencies, setAgencies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la visibilité de la modale
  const [newAgency, setNewAgency] = useState({
    name: '',
    start_time: '', // Correspond aux noms du modèle Sequelize
    end_time: '',   // Correspond aux noms du modèle Sequelize
    adress: '',     // Correspond aux noms du modèle Sequelize
  });
  const [editingAgency, setEditingAgency]   = useState(null); // Pour stocker l'agence en cours de modification
  const [Erreur , SetErreur]                =  useState('');//variable pour les erreur
  const [Success , SetSuccess]              =  useState('');//variable pour la validatin de creation
  const [searchTerm, setSearchTerm]         = useState('');
  const navigate                            = useNavigate();

  // Simuler le chargement des agences au montage du composant
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
 
          const response = await axios.get('http://localhost:8000/api/agency' ,
                                            {
                                              headers: {
                                                Authorization : `Bearer ${token}`
                                              }
                                            }
                       
          ) ;
          setAgencies(response.data);
        console.log("Agences chargées avec succès !", "success");
      } catch (error) {
        console.error("Erreur lors du chargement des agences :", error);
      }
    };
    fetchAgencies();
  }, []);

  // Fonctions pour ouvrir et fermer la modale
  const openModal = () => {
    setIsModalOpen(true);
    setEditingAgency(null); // S'assurer que le formulaire est en mode ajout
    setNewAgency({ name: '', start_time: '', end_time: '', adress: '' }); // Réinitialiser le formulaire
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAgency(null);
    setNewAgency({ name: '', start_time: '', end_time: '', adress: '' });
  };

  // Gestion des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAgency({ ...newAgency, [name]: value });
  };

  const handleEditInDB = async (id_agency , data , etat=false) => {

             const response =  await axios.patch(`http://localhost:8000/api/agency/${id_agency}?etat=${etat}` ,
                                            data ,
                                            {
                                              headers: {
                                                Authorization : `Bearer ${token}`
                                              }
                                            }
                         );
                      
                 if(etat) {
                        setAgencies(agencies.map(agency =>
                           agency.agency_id === editingAgency.agency_id ? { ...agency, ...newAgency } : agency
                          ));
                        SetSuccess("Agence modifiée avec succès !");
                 }
             return response ;
       
  }

    const handleAddInDB = async ( data , etat=false) => {

             const response =  await axios.post(`http://localhost:8000/api/agency?etat=${etat}` ,
                                            data ,
                                            {
                                              headers: {
                                                Authorization : `Bearer ${token}`
                                              }
                                            }
                               );

            if(etat) {
                const addedAgency = { ...newAgency,  current: true }; // ID factice

               setAgencies(prevAgencies => [
                           ...prevAgencies.map(agency => ({ ...agency, current: false })), // Toutes les anciennes agences passent à current: false
                            addedAgency // La nouvelle agence est ajoutée et marquée comme current: true
                          ]);

                SetSuccess("Agence ajoutée avec succès !");
            }

            return response ;
  }

  // Ajouter/Modifier une agence
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if ( !newAgency.name || !newAgency.adress ) {
    //   console.log("Le nom et l'adresse de l'agence sont requis.", "error");
    //   return;
    // }

    try {
      if (editingAgency) {
      
           await  handleEditInDB( editingAgency.agency_id , newAgency);
           ConfirmeOperation(`Es-tu sûr de modifier l'agence ${editingAgency.name} ?`,
                              '',
                              async ()=>await handleEditInDB( editingAgency.agency_id , newAgency , true)

           );

      } else {
            await  handleAddInDB( newAgency);
          
           ConfirmeOperation(`Es-tu sûr d'ajouter l'agence ${newAgency.name} ?`,
                              '',
                              async ()=>await handleAddInDB(  newAgency , true)

           );

      }

      closeModal(); // Fermer la modale après soumission
    } catch (Error) {

      if(Error.response.data.message)
        {
            SetErreur( Error.response.data.message);
        }
      else{

        SetErreur("Erreur connexion de serveur !!")
      // console.error("Erreur lors de l'opération sur l'agence :", Error);
      console.log(`Erreur lors de l'opération : ${Error.message}`, Error);
      }

    }
  };

  // Activer le mode édition et ouvrir la modale
  const handleEdit = (agency) => {
    setEditingAgency(agency);
    setNewAgency({
      name: agency.name,
      start_time: agency.start_time,
      end_time: agency.end_time,
      adress: agency.adress,
    });
    setIsModalOpen(true); // Ouvrir la modale
  };

  // Supprimer une agence
  const handleDelete = async (id) => {
      try {
             await axios.delete(`http://localhost:8000/api/agency/${id}` ,
                                            {
                                              headers: {
                                                Authorization : `Bearer ${token}`
                                              }
                                            }
                                          );
        setAgencies(agencies.filter(agency => agency.agency_id !== id));
        SetSuccess("Agence supprimée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'agence :", error);
        console.log("Erreur lors de la suppression de l'agence.", "error");
      }

  };

  // Définir une agence comme "courante"
  const handleSetCurrent = async (agency_crt) => {
    try {

              await axios.patch(`http://localhost:8000/api/agency/${agency_crt.agency_id}/set-current` ,
                                    null ,
                                    {
                                        headers: {
                                           Authorization : `Bearer ${token}`
                                        }
                                    }
                                );
      setAgencies(agencies.map(agency =>
        agency.agency_id === agency_crt.agency_id
          ? { ...agency, current: true }
          : { ...agency, current: false } // Les autres passent à false
      ));

     SetSuccess(`Agence ${agency_crt.name} marquée comme courante !`);
    } catch (error) {
      SetErreur("erreur :"+ error.message);
      console.error("Erreur lors de la définition de l'agence courante :", error);
      console.log("Erreur lors de la définition de l'agence courante.", "error");
    }
  };

  // Filtrer les agences par terme de recherche
  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (agency.adress && agency.adress.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <header className="header-section">
        <h1>Gestion des Agences</h1>
        <button className="button primary" onClick={openModal}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
          Ajouter une nouvelle agence
        </button>
      </header>

      {(Erreur && ErrorManagement(null , Erreur , "error" ,     SetErreur )) || 
       (Success && ErrorManagement(null , Success , "success" , SetSuccess)) }
      <section className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Chercher par nom ou adresse..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </section>

      <section className="table-container"> {/* Nouveau conteneur pour le tableau */}
        <table className="data-table"> {/* Nouvelle classe pour le tableau */}
          <thead>
            <tr>
              <th>Nom</th>
              <th>Heure de début</th>
              <th>Heure de fin</th>
              <th>Adresse</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgencies.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Aucune agence trouvée.</td>
              </tr>
            ) : (
              filteredAgencies.map(agency => (
                <tr key={agency.agency_id}>
                  <td>{agency.name}</td>
                  <td>{agency.start_time}</td>
                  <td>{agency.end_time}</td>
                  <td>{agency.adress}</td>
                  <td>
                    {agency.current ? (
                      <span className="current-indicator-table" title="Agence Courante">
                        <FontAwesomeIcon icon={faStar} /> Courante
                      </span>
                    ) : (
                      'Non courante'
                    )}
                  </td>
                  <td className="table-actions"> {/* Classe pour les actions dans le tableau */}
                    <button className="icon-button edit-button" aria-label="Modifier l'agence" onClick={() => handleEdit(agency)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="icon-button delete-button" aria-label="Supprimer l'agence" 
                         onClick={() => ConfirmeOperation(`Êtes-vous sûr de vouloir supprimer l'agence ${agency.name} ?` ,
                                                           '' ,
                                                           ()=>handleDelete(agency.agency_id)
                                                          )    
                           }>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    {!agency.current && (
                      <button className="icon-button set-current-button" title="Définir comme courante" onClick={() => handleSetCurrent(agency)}>
                        Activé
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Modale d'ajout/modification d'agence */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{color:'#005580'}}>{editingAgency ? 'Modifier l\'Agence' : 'Ajouter une nouvelle Agence'}</h2>
              <button className="modal-close-button" onClick={closeModal} aria-label="Fermer">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="add-edit-form"> {/* Nouvelle classe pour le formulaire de la modale */}
              <div className="form-group">
                <label htmlFor="modalNameInput">Nom de l'agence :</label>
                <input
                  type="text"
                  id="modalNameInput"
                  name="name"
                  placeholder="Nom de l'agence"
                  value={newAgency.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modalStartTimeInput">Heure de début :</label>
                <input
                  type="time"
                  id="modalStartTimeInput"
                  name="start_time"
                  value={newAgency.start_time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modalEndTimeInput">Heure de fin :</label>
                <input
                  type="time"
                  id="modalEndTimeInput"
                  name="end_time"
                  value={newAgency.end_time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modalAddressInput">Adresse :</label>
                <input
                  type="text"
                  id="modalAddressInput"
                  name="adress"
                  placeholder="Adresse de l'agence"
                  value={newAgency.adress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="actions">
                <button type="submit" className="button primary">
                  {editingAgency ? 'Modifier' : 'Ajouter'}
                </button>
                <button type="button" className="button secondary" onClick={closeModal}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyManagement;