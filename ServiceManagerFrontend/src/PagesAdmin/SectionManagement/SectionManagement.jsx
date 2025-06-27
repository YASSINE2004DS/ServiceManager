// src/components/SectionManagement/SectionManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheckCircle, faTimesCircle, faEdit, faTrash, faPlus, 
    faSyncAlt, faSearch, faLayerGroup // Nouvelle icône pour le titre
} from '@fortawesome/free-solid-svg-icons'; 
import { VerifierExpiredToken, UserIdAndRole, token } from '../../Pages/Authentification/Authentification';
import styles from './SectionManagement.module.css'; // Changement ici pour CSS Modules
import { ConfirmeOperation } from '../../Shared/Components/SweetAlert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageChargement from '../../Pages/PageCommunComponnent/PageChargement'; // Assurez-vous d'avoir ce composant

const SectionManagement = () => {
    const navigate = useNavigate();

    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // Renommé Edit en isEditing pour plus de clarté
    const [editSectionId, setEditSectionId] = useState(null); // Renommé idSectionEdit
    const [sectionNameInput, setSectionNameInput] = useState(''); // Renommé WillEditSection
    const [oldSectionName, setOldSectionName] = useState(''); // Renommé AcienneNameSection
    const [error, setError] = useState(null); // Renommé Error en error
    const [success, setSuccess] = useState(null); // Renommé success en success
    const [searchQuery, setSearchQuery] = useState(''); // Pour la barre de recherche

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

    // --- Récupération des sections ---
    const fetchSections = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/api/section');
            setSections(response.data);
            setLoading(false);
            console.log("Sections retrieved successfully");
        } catch (err) {
            console.error("Error fetching sections:", err);
            setError("Impossible de charger les sections. Veuillez réessayer.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    // --- Gestion des messages de feedback ---
    const showMessage = useCallback((message, type) => {
        if (type === 'success') {
            setSuccess(message);
            setError(null);
        } else {
            setError(message);
            setSuccess(null);
        }
        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 3000); // Durée d'affichage des messages
    }, []);

    // --- Fonctions d'édition/annulation ---
    const handleEditClick = useCallback((name, id) => {
        setIsEditing(true);
        setEditSectionId(id);
        setSectionNameInput(name);
        setOldSectionName(name);
    }, []);

    const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditSectionId(null);
        setSectionNameInput('');
        setOldSectionName('');
        setError(null); // Clear any previous errors
    }, []);

    // --- Opérations Backend (Ajouter, Modifier, Supprimer) ---
    const performBackendOperation = useCallback(async (type_opr, confirm = false, id_section = null) => {
   
            let response;
            const url = 'http://localhost:8000/api/section';

            if (sectionNameInput.trim() === '' && (type_opr === 'Ajouter' || type_opr === 'Modifier')) {
                showMessage("Le nom de section ne peut pas être vide.", 'error');
                return null;
            }

            switch (type_opr) {
                case 'Ajouter':
                    response = await axios.post(`${url}?etat=${confirm}`, { name: sectionNameInput });
                    break;
                case 'Modifier':
                    response = await axios.patch(`${url}/${editSectionId}?etat=${confirm}`, { name: sectionNameInput });
                    break;
                case 'Supprimer':
                    response = await axios.delete(`${url}/${id_section}?etat=${confirm}`);
                    break;
                default:
                    return null;
            }

            if (confirm) {
                if (type_opr === 'Ajouter') {
                    setSections(prev => [...prev, response.data.Section]);
                } else if (type_opr === 'Modifier') {
                    setSections(prev => prev.map(section =>
                        section.section_id === editSectionId ? response.data.SectionUpdated : section
                    ));
                } else if (type_opr === 'Supprimer') {
                    setSections(prev => prev.filter(section => section.section_id !== id_section));
                }
                handleCancelEdit(); // Réinitialiser le formulaire après succès
                showMessage(response.data.Success, 'success');
            }
            return response;

       
    }, [sectionNameInput, editSectionId, handleCancelEdit, showMessage]);

    // --- Handlers pour les actions (Supprimer, Modifier, Ajouter) ---
    const handleDeleteSection = useCallback((id, name) => {
        ConfirmeOperation(
            `Êtes-vous sûr de vouloir supprimer la section "${name}" ? Cette action est irréversible.`,
            ``, // Message de succès pour SweetAlert
            () => performBackendOperation("Supprimer", true, id)
        );
    }, [performBackendOperation]);

    const handleEditSection = useCallback(() => {
        if (sectionNameInput.trim() === '') {
            showMessage("Le nom de section ne peut pas être vide.", 'error');
            return;
        }
        performBackendOperation("Modifier", false).then(_=>{
        ConfirmeOperation(
            `Êtes-vous sûr de vouloir modifier la section "${oldSectionName}" en "${sectionNameInput}" ?`,
            ``, // Message de succès pour SweetAlert
            () => performBackendOperation("Modifier", true)
        );
        }).catch(err=>{
            console.error(`Error during ${"Modifier"} operation:`, err);
            if (err.response && err.response.data && err.response.data.message) {
                showMessage(err.response.data.message, 'error');
            } else {
                showMessage(`Une erreur est survenue lors de l'opération de modifier.`, 'error');
            }
            return null;
    })

    }, [sectionNameInput, oldSectionName, performBackendOperation, showMessage]);

    const handleAddSection = useCallback(() => {
        if (sectionNameInput.trim() === '') {
            showMessage("Le nom de section ne peut pas être vide.", 'error');
            return;
        }

        performBackendOperation("Ajouter" , false).then(()=>{

        ConfirmeOperation(
            `Êtes-vous sûr de vouloir ajouter la section "${sectionNameInput}" ?`,
            ``, // Message de succès pour SweetAlert
            () => performBackendOperation("Ajouter", true)
        );
    }).catch(err=>{
            console.error(`Error during ${"Ajouter"} operation:`, err);
            if (err.response && err.response.data && err.response.data.message) {
                showMessage(err.response.data.message, 'error');
            } else {
                showMessage(`Une erreur est survenue lors de l'opération de ajouter.`, 'error');
            }
            return null;
    })
    }, [sectionNameInput, performBackendOperation, showMessage]);

    // --- Filtrage des sections pour la recherche ---
    const filteredSections = sections.filter(section =>
        section.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <PageChargement />; // Affiche un écran de chargement
    }

    return (
        <div className={styles.container}>
            {/* Messages de succès/erreur */}
            {success && (
                <div className={`${styles.messageBox} ${styles.success}`}>
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.messageIcon} />
                    <span>{success}</span>
                </div>
            )}
            {error && (
                <div className={`${styles.messageBox} ${styles.error}`}>
                    <FontAwesomeIcon icon={faTimesCircle} className={styles.messageIcon} />
                    <span>{error}</span>
                </div>
            )}

            <header className={styles.headerSection}>
                <h1 className={styles.pageTitle}>
                    <FontAwesomeIcon icon={faLayerGroup} className={styles.titleIcon} /> Gestion des Sections
                </h1>
            </header>

            <section className={styles.addSectionForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="sectionNameInput">Nom de la section :</label>
                    <input
                        type="text"
                        value={sectionNameInput}
                        id="sectionNameInput"
                        placeholder={isEditing ? `Modifier "${oldSectionName}"` : "Ajouter une nouvelle section"}
                        onChange={(e) => setSectionNameInput(e.target.value)}
                        className={styles.textInput}
                    />
                </div>
                <div className={styles.actions}>
                    {!isEditing && (
                        <button className={`${styles.button} ${styles.primary}`} onClick={handleAddSection}>
                            <FontAwesomeIcon icon={faPlus} /> Ajouter
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button className={`${styles.button} ${styles.secondary}`} onClick={handleCancelEdit}>
                                Annuler
                            </button>
                            <button className={`${styles.button} ${styles.success}`} onClick={handleEditSection}>
                                <FontAwesomeIcon icon={faEdit} /> Modifier
                            </button>
                        </>
                    )}
                </div>
            </section>

            <section className={styles.searchSection}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Rechercher une section..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                </div>
                <button
                    className={styles.refreshBtn}
                    onClick={fetchSections}
                    title="Rafraîchir les sections"
                >
                    <FontAwesomeIcon icon={faSyncAlt} /> Rafraîchir
                </button>
            </section>

            <section className={styles.sectionListContainer}>
                {filteredSections.length === 0 && !loading && (
                    <div className={styles.noDataMessage}>
                        Aucune section trouvée. {searchQuery && `pour "${searchQuery}".`}
                    </div>
                )}
                <div className={styles.sectionGrid}>
                    {filteredSections.map((section) => (
                        <div key={section.section_id} className={styles.sectionCard}>
                            <span className={styles.sectionTitle}>{section.name}</span>
                            <div className={styles.sectionActions}>
                                <button
                                    className={`${styles.iconButton} ${styles.editButton}`}
                                    aria-label="Modifier la section"
                                    onClick={() => handleEditClick(section.name, section.section_id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    className={`${styles.iconButton} ${styles.deleteButton}`}
                                    aria-label="Supprimer la section"
                                    onClick={() => handleDeleteSection(section.section_id, section.name)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SectionManagement;