import React, { useEffect, useState } from 'react';
import styles from './ExportationFormModal.module.css';
import axios     from 'axios';
import {ErrorManagement}                     from '../../../../Shared/Components/MessageManagement'
import PageChargement                        from '../../../../Pages/PageCommunComponnent/PageChargement'
import {ConfirmeOperation}                      from '../../../../Shared/Components/SweetAlert'
import { useNavigate, useParams , useSearchParams}                   from 'react-router-dom'; // Importez ceci

// const composantsDisponibles = [
//   { id: 1, name: 'Transformateur', categorie: 'Haute tension' },
//   { id: 2, name: 'Disjoncteur', categorie: 'Basse tension' },
//   { id: 3, name: 'Fusible', categorie: 'Protection' },
//   { id: 4, name: 'Câble isolé', categorie: 'Connexion' },
// ];

export default function ExportationForm({ onSubmit }) {
  const {idEntreprise}          = useParams();
  const [Params, setParams]     = useSearchParams();
  const [formData, setFormData] = useState({
  id_entreprise: idEntreprise,
  date_exportation: new Date().toISOString().split('T')[0], // "2025-06-20"
  date_demande: '',
  composants: [{ id_composant: '', quantite: '' }]
});
  const [loading  , setLoading ]                           = useState(true);
  const [composantsDisponibles , setComposantsDisponibles] = useState([]);
  const [erreur, setErreur]                                = useState(null);
  const [success, setSuccess]                              = useState(null);
  const navigate                                           = useNavigate();

  useEffect(()=> {
  const fetchComponents =  async ()=> {
    try {
      const response = await axios.get('http://localhost:8001/api/composants');
      setComposantsDisponibles(response.data);
      setLoading(false);

    } catch (error) {
      console("erreur : erreur fetching compononts " + error);
    }
  }
  fetchComponents();
}, [])

// const categorieSet = [... new Set(composantsDisponibles.map((c)=>c.categorie))] ;
// // console.log(categorieSet);
  const handleComposantChange = (index, field, value) => {
    const updated = [...formData.composants];
    updated[index][field] = value;
    setFormData({ ...formData, composants: updated });
  };

  const addComposant = () => {
    setFormData({
      ...formData,
      composants: [...formData.composants, { id_composant: '', quantite: '' }]
    });
  };

  const removeComposant = (index) => {
    const updated = formData.composants.filter((_, i) => i !== index);
    setFormData({ ...formData, composants: updated });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAvailableComposants = (currentIndex) => {
    const selectedIds = formData.composants
      .filter((_, i) => i !== currentIndex)
      .map(c => parseInt(c.id_composant));
    return composantsDisponibles.filter(c => !selectedIds.includes(c.id_composant));
  };

  const RequestToAddExport = async (etat=false) => {
    const response = await axios.post(`http://localhost:8001/api/composantExporte/exportation?etat=${etat}` ,
                                      formData
                                     );
       if(etat)
       {
        setSuccess("exportation bien enregistrer");
        setTimeout(() => {
          navigate(`/admin/Exportation?ExportationId=${idEntreprise}&Entreprise=${Params.get('entrepriseName')}`);
        }, (2000));
       }
        return response ;                
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        RequestToAddExport()
        .then(()=>{
                         ConfirmeOperation(  `Es-tu sûr d'ajouter cette exportation ?`,
                                             '',
                                             ()=>RequestToAddExport(true)
                      
                                          );            
        })
        .catch(error =>{
          setErreur(error?.response?.data?.message);
        })


    } catch (error) {
       console.error("Erreur lors de l'enregistrement de l'exportation :", error);
    }
  };



  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>

                  {/*  erreur management  */}
                  {(erreur && ErrorManagement(null, erreur, "error", setErreur)) || 
                   (success && ErrorManagement(null, success, "success", setSuccess))}
      
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
              {getAvailableComposants(index).map((c) => (
                <option key={c.id} value={c.id_composant}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* <div className={styles.formGroup}>
            <label>Catégorie</label>
            <select
              className={styles.selectField}
              value={composant.categorie}
              onChange={(e) => handleComposantChange(index, 'categorie', e.target.value)}
              required
            >
              <option value="">-- Choisir une catégorie --</option>
              {
                categorieSet.map((Cat , ind)=>(
                  <option key={ind} value={Cat}>{Cat}</option>
                ))
              }
            </select>
          </div> */}

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

      <button type="submit" className={styles.submitBtn} >
        Enregistrer l'exportation
      </button>
    </form>
  );
}
