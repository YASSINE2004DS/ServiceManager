// src/components/ComposantFormModal.jsx
import React, { useState, useEffect } from 'react';
import styles                         from './ComposantFormModal.module.css';
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome';
import { faTimes }                    from '@fortawesome/free-solid-svg-icons';
import axios                          from 'axios';

const ComposantFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName]                   = useState('');
  const [categorie, setCategorie]         = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [minStockLevel, setMinStockLevel] = useState('');
  const [location, setLocation]           = useState('');
  const [unitCost, setUnitCost]           = useState('');
  const [leadTimeDays, setLeadTimeDays]   = useState('');
  const [status, setStatus]               = useState('Active');
  const [sourceIdEntreprise, setSourceIdEntreprise] = useState('');
  const [errors, setErrors]               = useState({});
  const [entreprises, setEntreprises]     = useState([]);

  const categories = [
    'Résistance', 'Condensateur', 'Diode', 'Microcontrôleur',
    'Connecteur', 'LED', 'Transistor', 'Capteur', 'Communication',
    'Affichage', 'Driver', 'Régulateur', 'Commutation',
    'Temps Réel', 'Alimentation'
  ];

  useEffect(() => {
    const EntreprisesImport = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/entreprise/importation');
        setEntreprises(response.data);
      } catch (error) {
        console.log("Erreur : fetching importation entreprises " + error);
      }
    };

    if (initialData) {
      setName(initialData.name || '');
      setCategorie(initialData.categorie || '');
      setStockQuantity(initialData.stock_quantity !== undefined ? initialData.stock_quantity.toString() : '');
      setMinStockLevel(initialData.min_stock_level !== undefined ? initialData.min_stock_level.toString() : '');
      setLocation(initialData.location || '');
      setUnitCost(initialData.unit_cost !== undefined ? parseFloat(initialData.unit_cost).toFixed(4).toString() : '');
      setLeadTimeDays(initialData.lead_time_days !== undefined ? initialData.lead_time_days.toString() : '');
      setStatus(initialData.status || 'Active');
      setSourceIdEntreprise(initialData.source_id_entreprise !== null ? initialData.source_id_entreprise.toString() : '');
    } else {
      setName('');
      setCategorie('');
      setStockQuantity('');
      setMinStockLevel('');
      setLocation('');
      setUnitCost('');
      setLeadTimeDays('');
      setStatus('Active');
      setSourceIdEntreprise('');
    }
    setErrors({});
    EntreprisesImport();
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Le nom est obligatoire.';
    if (!categorie.trim()) newErrors.categorie = 'La catégorie est obligatoire.';
    if (stockQuantity === '' || isNaN(stockQuantity) || parseInt(stockQuantity, 10) < 0)
      newErrors.stockQuantity = 'Quantité en stock doit être un nombre positif.';
    if (minStockLevel !== '' && (isNaN(minStockLevel) || parseInt(minStockLevel, 10) < 0))
      newErrors.minStockLevel = 'Niveau de stock minimum doit être un nombre positif ou vide.';
    if (unitCost !== '' && (isNaN(unitCost) || parseFloat(unitCost) < 0))
      newErrors.unitCost = 'Coût unitaire doit être un nombre positif.';
    if (leadTimeDays !== '' && (isNaN(leadTimeDays) || parseInt(leadTimeDays, 10) < 0))
      newErrors.leadTimeDays = 'Délai de livraison doit être un nombre positif ou vide.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSave = {
        name,
        categorie,
        stock_quantity: parseInt(stockQuantity, 10),
        min_stock_level: minStockLevel ? parseInt(minStockLevel, 10) : null,
        location: location.trim() || null,
        unit_cost: unitCost ? parseFloat(unitCost) : null,
        lead_time_days: leadTimeDays ? parseInt(leadTimeDays, 10) : null,
        status: status,
        source_id_entreprise: sourceIdEntreprise ? parseInt(sourceIdEntreprise, 10) : null,
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
          {initialData ? 'Modifier le Composant' : 'Ajouter un Nouveau Composant'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.composantForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom du Composant:</label>
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
            <label htmlFor="categorie">Catégorie:</label>
            <select
              id="categorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className={errors.categorie ? styles.inputError : ''}
            >
              <option value="">-- Sélectionner --</option>
              {categories.map((categorie, ind) =>
                <option value={categorie} key={ind}>{categorie}</option>
              )}
            </select>
            {errors.categorie && <span className={styles.errorText}>{errors.categorie}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stockQuantity">Quantité en stock:</label>
            <input
              type="number"
              id="stockQuantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className={errors.stockQuantity ? styles.inputError : ''}
              min="0"
            />
            {errors.stockQuantity && <span className={styles.errorText}>{errors.stockQuantity}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="minStockLevel">Niveau de stock minimum:</label>
            <input
              type="number"
              id="minStockLevel"
              value={minStockLevel}
              onChange={(e) => setMinStockLevel(e.target.value)}
              className={errors.minStockLevel ? styles.inputError : ''}
              min="0"
            />
            {errors.minStockLevel && <span className={styles.errorText}>{errors.minStockLevel}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Emplacement:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="unitCost">Coût unitaire (DH):</label>
            <input
              type="number"
              id="unitCost"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              className={errors.unitCost ? styles.inputError : ''}
              step="0.0001"
              min="0"
            />
            {errors.unitCost && <span className={styles.errorText}>{errors.unitCost}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="leadTimeDays">Délai de livraison (jours):</label>
            <input
              type="number"
              id="leadTimeDays"
              value={leadTimeDays}
              onChange={(e) => setLeadTimeDays(e.target.value)}
              className={errors.leadTimeDays ? styles.inputError : ''}
              min="0"
            />
            {errors.leadTimeDays && <span className={styles.errorText}>{errors.leadTimeDays}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Statut:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="End of Life">End of Life</option>
              <option value="Obsolete">Obsolete</option>
              <option value="Discontinued">Discontinued</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sourceIdEntreprise">ID Source Entreprise</label>
            <select
              id="sourceIdEntreprise"
              value={sourceIdEntreprise}
              onChange={(e) => setSourceIdEntreprise(e.target.value)}
              className={errors.sourceIdEntreprise ? styles.inputError : ''}
            >
              <option value="">-- Sélectionner --</option>
              <option value={null} style={{ backgroundColor: 'darkgreen' }}>Local</option>
              {entreprises.map((entreprise, index) =>
                <option value={entreprise.entreprise_id} key={index}> {entreprise.name} </option>
              )}
            </select>
            {errors.sourceIdEntreprise && <span className={styles.errorText}>{errors.sourceIdEntreprise}</span>}
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

export default ComposantFormModal;
