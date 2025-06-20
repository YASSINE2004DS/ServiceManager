import React, { useState } from 'react';
import styles from './ExportationForm.module.css';

const composantsDisponibles = [
  { id: 1, name: 'Transformateur', categorie: 'Haute tension' },
  { id: 2, name: 'Disjoncteur', categorie: 'Basse tension' },
  { id: 3, name: 'Fusible', categorie: 'Protection' },
];

export default function ExportationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    date_exportation: '',
    date_demande: '',
    composants: [
      { id_composant: '', quantite: '', categorie: '' }
    ]
  });

  const handleComposantChange = (index, field, value) => {
    const updated = [...formData.composants];
    updated[index][field] = value;
    setFormData({ ...formData, composants: updated });
  };

  const addComposant = () => {
    setFormData({
      ...formData,
      composants: [...formData.composants, { id_composant: '', quantite: '', categorie: '' }]
    });
  };

  const removeComposant = (index) => {
    const updated = formData.composants.filter((_, i) => i !== index);
    setFormData({ ...formData, composants: updated });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.sectionTitle}>Nouvelle Exportation</h2>

      <div className={styles.formGroup}>
        <label>Date d'exportation</label>
        <input
          type="date"
          name="date_exportation"
          className={styles.inputField}
          value={formData.date_exportation}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Date de demande</label>
        <input
          type="date"
          name="date_demande"
          className={styles.inputField}
          value={formData.date_demande}
          onChange={handleChange}
          required
        />
      </div>

      <h3 className={styles.sectionTitle}>Composants à exporter</h3>

      {formData.composants.map((composant, index) => (
        <div className={styles.composantCard} key={index}>
          {index > 0 && (
            <button type="button" className={styles.removeBtn} onClick={() => removeComposant(index)}>
              Supprimer
            </button>
          )}
          <div className={styles.formGroup}>
            <label>Nom du composant</label>
            <select
              className={styles.selectField}
              value={composant.id_composant}
              onChange={(e) => handleComposantChange(index, 'id_composant', e.target.value)}
              required
            >
              <option value="">-- Choisir un composant --</option>
              {composantsDisponibles.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Catégorie</label>
            <select
              className={styles.selectField}
              value={composant.categorie}
              onChange={(e) => handleComposantChange(index, 'categorie', e.target.value)}
              required
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="Haute tension">Haute tension</option>
              <option value="Basse tension">Basse tension</option>
              <option value="Protection">Protection</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Quantité</label>
            <input
              type="number"
              min="1"
              className={styles.inputField}
              value={composant.quantite}
              onChange={(e) => handleComposantChange(index, 'quantite', e.target.value)}
              required
            />
          </div>
        </div>
      ))}

      <button type="button" className={styles.addBtn} onClick={addComposant}>
        + Ajouter un composant
      </button>

      <button type="submit" className={styles.submitBtn}>
        Enregistrer l'exportation
      </button>
    </form>
  );
}
