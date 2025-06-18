// src/components/EntrepriseFormModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './EntrepriseFormModal.module.css'; // Changement ici !
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EntrepriseFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [adresseEmail, setAdresseEmail] = useState('');
  const [pays, setPays] = useState('Maroc');
  const [typeEntreprise, setTypeEntreprise] = useState('exportation');
  const [locale, setLocale] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setAddress(initialData.address || '');
      setAdresseEmail(initialData.adresse_email || '');
      setPays(initialData.pays || 'Maroc');
      setTypeEntreprise(initialData.type_entreprise || 'exportation');
      setLocale(initialData.locale !== undefined ? initialData.locale : true);
    } else {
      setName('');
      setAddress('');
      setAdresseEmail('');
      setPays('Maroc');
      setTypeEntreprise('exportation');
      setLocale(true);
    }
    setErrors({});
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Le nom est obligatoire.';
    if (!pays.trim()) newErrors.pays = 'Le pays est obligatoire.';
    if (!typeEntreprise) newErrors.typeEntreprise = 'Le type d\'entreprise est obligatoire.';
    
    if (adresseEmail && !/\S+@\S+\.\S+/.test(adresseEmail)) {
        newErrors.adresseEmail = 'Adresse email non valide.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSave = {
        name,
        address: address.trim() || null,
        adresse_email: adresseEmail.trim() || null,
        pays,
        type_entreprise: typeEntreprise,
        locale
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
          {initialData ? 'Modifier l\'Entreprise' : 'Ajouter une Nouvelle Entreprise'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.entrepriseForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom de l'Entreprise:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Adresse:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="adresseEmail">Adresse Email:</label>
            <input
              type="email"
              id="adresseEmail"
              value={adresseEmail}
              onChange={(e) => setAdresseEmail(e.target.value)}
              className={errors.adresseEmail ? styles.inputError : ''}
            />
            {errors.adresseEmail && <span className={styles.errorText}>{errors.adresseEmail}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="pays">Pays:</label>
            <input
              type="text"
              id="pays"
              value={pays}
              onChange={(e) => setPays(e.target.value)}
              className={errors.pays ? styles.inputError : ''}
            />
            {errors.pays && <span className={styles.errorText}>{errors.pays}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="typeEntreprise">Type d'Entreprise:</label>
            <select
              id="typeEntreprise"
              value={typeEntreprise}
              onChange={(e) => setTypeEntreprise(e.target.value)}
              className={errors.typeEntreprise ? styles.inputError : ''}
            >
              <option value="exportation">Exportation</option>
              <option value="importation">Importation</option>
            </select>
            {errors.typeEntreprise && <span className={styles.errorText}>{errors.typeEntreprise}</span>}
          </div>

          <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
            <input
              type="checkbox"
              id="locale"
              checked={locale}
              onChange={(e) => setLocale(e.target.checked)}
            />
            <label htmlFor="locale">Locale</label>
          </div>

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

export default EntrepriseFormModal;