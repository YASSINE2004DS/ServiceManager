import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faStar, faPlus, faTimes , faBuilding } from '@fortawesome/free-solid-svg-icons';
import { VerifierExpiredToken, UserIdAndRole, token } from '../../Pages/Authentification/Authentification';
import { useNavigate } from 'react-router-dom';
import { ConfirmeOperation } from '../../Shared/Components/SweetAlert';
import { ErrorManagement } from '../../Shared/Components/MessageManagement';
import axios from 'axios';
import styles from './AgenceManagement.module.css'; // Ensure this path is correct

const AgencyManagement = () => {
    // hooks pour verifié l'authentification et l'expiration du token
    const navigate = useNavigate();

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

    const [agencies, setAgencies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAgency, setNewAgency] = useState({
        name: '',
        start_time: '',
        end_time: '',
        adress: '',
    });
    const [editingAgency, setEditingAgency] = useState(null);
    const [Erreur, SetErreur] = useState('');
    const [Success, SetSuccess] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Simuler le chargement des agences au montage du composant
    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/agency', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAgencies(response.data);
                console.log("Agences chargées avec succès !", "success");
            } catch (error) {
                console.error("Erreur lors du chargement des agences :", error);
                // Optionally set an error message for the user
                SetErreur("Erreur lors du chargement des agences.");
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
        SetErreur(''); // Clear any previous error messages
        SetSuccess(''); // Clear any previous success messages
    };

    // Gestion des champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAgency({ ...newAgency, [name]: value });
    };

    const handleEditInDB = async (id_agency, data, etat = false) => {
        console.log(data );
        const response = await axios.patch(`http://localhost:8000/api/agency/${id_agency}?etat=${etat}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (etat) {
            setAgencies(agencies.map(agency =>
                agency.agency_id === editingAgency.agency_id ? { ...agency, ...newAgency } : agency
            ));
            SetSuccess("Agence modifiée avec succès !");
        }
        return response;
    }

    const handleAddInDB = async (data, etat = false) => {
        const response = await axios.post(`http://localhost:8000/api/agency?etat=${etat}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (etat) {
            // Update the state to reflect the new agency and mark it as current
            setAgencies(prevAgencies => [
                ...prevAgencies.map(agency => ({ ...agency, current: false })), // All old agencies are no longer current
                { ...newAgency, agency_id: response.data.agency_id, current: true } // New agency is added and marked current
            ]);
            SetSuccess("Agence ajoutée avec succès !");
        }
        return response;
    }

    // Ajouter/Modifier une agence
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAgency) {
                await ConfirmeOperation(
                    `Es-tu sûr de modifier l'agence ${editingAgency.name} ?`,
                    '',
                    async () => {
                        await handleEditInDB(editingAgency.agency_id, newAgency, true);
                        closeModal();
                    }
                );
            } else {
                await ConfirmeOperation(
                    `Es-tu sûr d'ajouter l'agence ${newAgency.name} ?`,
                    '',
                    async () => {
                        await handleAddInDB(newAgency, true);
                        closeModal();
                    }
                );
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                SetErreur(error.response.data.message);
            } else {
                SetErreur("Erreur de connexion au serveur !");
            }
            console.error("Erreur lors de l'opération sur l'agence :", error);
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
    const handleDelete = async (id, agencyName) => {
        try {
            await ConfirmeOperation(
                `Êtes-vous sûr de vouloir supprimer l'agence ${agencyName} ?`,
                '',
                async () => {
                    await axios.delete(`http://localhost:8000/api/agency/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setAgencies(agencies.filter(agency => agency.agency_id !== id));
                    SetSuccess("Agence supprimée avec succès !");
                }
            );
        } catch (error) {
            console.error("Erreur lors de la suppression de l'agence :", error);
            SetErreur("Erreur lors de la suppression de l'agence.");
        }
    };

    // Définir une agence comme "courante"
    const handleSetCurrent = async (agency_crt) => {
        try {
            await axios.patch(`http://localhost:8000/api/agency/${agency_crt.agency_id}/set-current`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
            SetErreur("Erreur : " + (error.response?.data?.message || error.message));
            console.error("Erreur lors de la définition de l'agence courante :", error);
        }
    };

    // Filtrer les agences par terme de recherche
    const filteredAgencies = agencies.filter(agency =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (agency.adress && agency.adress.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className={styles.container}>
            <header className={styles.headerSection}>
                   <h1 className={styles.pageTitle}>
                       <FontAwesomeIcon icon={faBuilding} className={styles.titleIcon} /> Gestion des Sections
                   </h1>
                <button className={`${styles.button} ${styles.primary}`} onClick={openModal}>
                    <FontAwesomeIcon icon={faPlus} />
                    Ajouter une nouvelle agence
                </button>
            </header>

            {(Erreur && ErrorManagement(null, Erreur, "error", SetErreur)) ||
                (Success && ErrorManagement(null, Success, "success", SetSuccess))}

            <section className={styles.searchSection} >
                <div className={styles.searchBar} >
                    <input
                        type="text"
                        placeholder="Chercher par nom ou adresse..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                </div>
            </section>

            <section className={styles.tableContainer} >
                <table className={styles.dataTable}>
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
                                            <span className={styles.currentIndicatorTable} title="Agence Courante">
                                                <FontAwesomeIcon icon={faStar} /> Courante
                                            </span>
                                        ) : (
                                            'Non courante'
                                        )}
                                    </td>
                                    <td className={styles.tableActions}>
                                        <button className={`${styles.iconButton} ${styles.editButton}`} aria-label="Modifier l'agence" onClick={() => handleEdit(agency)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className={`${styles.iconButton} ${styles.deleteButton}`} aria-label="Supprimer l'agence"
                                            onClick={() => handleDelete(agency.agency_id, agency.name)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                        {!agency.current && (
                                            <button className={`${styles.iconButton} ${styles.setCurrentButton}`} title="Définir comme courante" onClick={() => handleSetCurrent(agency)}>
                                                Activer
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            {/* Modal for adding/editing agency */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2 style={{ color: '#005580' }}>{editingAgency ? 'Modifier l\'Agence' : 'Ajouter une nouvelle Agence'}</h2>
                            <button className={styles.modalCloseButton} onClick={closeModal} aria-label="Fermer">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.addEditForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="modalNameInput">Nom de l'agence :</label>
                                <input
                                    type="text"
                                    id="modalNameInput"
                                    name="name"
                                    placeholder="Nom de l'agence"
                                    value={newAgency.name}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="modalStartTimeInput">Heure de début :</label>
                                <input
                                    type="time"
                                    id="modalStartTimeInput"
                                    name="start_time"
                                    value={newAgency.start_time}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="modalEndTimeInput">Heure de fin :</label>
                                <input
                                    type="time"
                                    id="modalEndTimeInput"
                                    name="end_time"
                                    value={newAgency.end_time}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="modalAddressInput">Adresse :</label>
                                <input
                                    type="text"
                                    id="modalAddressInput"
                                    name="adress"
                                    placeholder="Adresse de l'agence"
                                    value={newAgency.adress}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    required
                                />
                            </div>
                            <div className={styles.actions}>
                                <button type="submit" className={`${styles.button} ${styles.primary}`}>
                                    {editingAgency ? 'Modifier' : 'Ajouter'}
                                </button>
                                <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={closeModal}>
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