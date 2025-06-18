// src/components/ExportationFormModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './ExportationFormModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ExportationFormModal = ({ isOpen, onClose, onSave, initialData, entreprises }) => {
  const [idEntreprise, setIdEntreprise] = useState('');
  const [dateDemande, setDateDemande] = useState('');
  const [dateExportation, setDateExportation] = useState('');
  // Pour la simulation, nous laissons montant_total et nombre_composants gérés par le parent
  // Si vous voulez les éditer ici, il faudrait les ajouter comme champs
  // const [montantTotal, setMontantTotal] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setIdEntreprise(initialData.id_entreprise || '');
      setDateDemande(initialData.date_demande ? new Date(initialData.date_demande).toISOString().split('T')[0] : '');
      setDateExportation(initialData.date_exportation ? new Date(initialData.date_exportation).toISOString().split('T')[0] : '');
      // setMontantTotal(initialData.montant_total || '');
    } else {
      setIdEntreprise('');
      setDateDemande('');
      setDateExportation('');
      // setMontantTotal('');
    }
    setErrors({});
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!idEntreprise) newErrors.idEntreprise = 'Veuillez sélectionner une entreprise.';
    if (!dateDemande) newErrors.dateDemande = 'La date de demande est obligatoire.';
    if (!dateExportation) newErrors.dateExportation = 'La date d\'exportation est obligatoire.';
    if (dateDemande && dateExportation && new Date(dateExportation) < new Date(dateDemande)) {
        newErrors.dateExportation = 'La date d\'exportation ne peut pas être antérieure à la date de demande.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSave = {
        id_entreprise: parseInt(idEntreprise),
        date_demande: dateDemande, // Format YYYY-MM-DD
        date_exportation: dateExportation, // Format YYYY-MM-DD
        // Pour les données factices, vous pourriez simuler ces champs
        montant_total: initialData?.montant_total || 0,
        VentesLocales: initialData?.VentesLocales || []
      };
      onSave(dataToSave);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className={styles.modalTitle}>
          {initialData ? 'Modifier l\'Exportation' : 'Ajouter une Nouvelle Exportation'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.exportationForm}>
          <div className={styles.formGroup}>
            <label htmlFor="idEntreprise">Entreprise:</label>
            <select
              id="idEntreprise"
              value={idEntreprise}
              onChange={(e) => setIdEntreprise(e.target.value)}
              className={errors.idEntreprise ? styles.inputError : ''}
            >
              <option value="">Sélectionnez une entreprise</option>
              {entreprises.map(ent => (
                <option key={ent.entreprise_id} value={ent.entreprise_id}>
                  {ent.name}
                </option>
              ))}
            </select>
            {errors.idEntreprise && <span className={styles.errorText}>{errors.idEntreprise}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateDemande">Date de Demande:</label>
            <input
              type="date"
              id="dateDemande"
              value={dateDemande}
              onChange={(e) => setDateDemande(e.target.value)}
              className={errors.dateDemande ? styles.inputError : ''}
            />
            {errors.dateDemande && <span className={styles.errorText}>{errors.dateDemande}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateExportation">Date d'Exportation:</label>
            <input
              type="date"
              id="dateExportation"
              value={dateExportation}
              onChange={(e) => setDateExportation(e.target.value)}
              className={errors.dateExportation ? styles.inputError : ''}
            />
            {errors.dateExportation && <span className={styles.errorText}>{errors.dateExportation}</span>}
          </div>

          {/* Supprimez ou commentez ces champs si vous ne les gérez pas directement dans ce formulaire */}
          {/* <div className={styles.formGroup}>
            <label htmlFor="montantTotal">Montant Total:</label>
            <input
              type="number"
              id="montantTotal"
              step="0.01"
              value={montantTotal}
              onChange={(e) => setMontantTotal(e.target.value)}
            />
          </div> */}

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn}>
              {initialData ? 'Mettre à Jour' : 'Ajouter'}
            </button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportationFormModal;