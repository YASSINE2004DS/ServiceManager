// src/components/ExportationsListModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ExportationsListModal.module.css'; // Changement ici !
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faDollarSign, faBox, faListAlt, faFileExport, faExternalLinkAlt , faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ExportationsListModal = ({ isOpen, onClose, entreprise }) => {
  const [exportations, setExportations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExportations = async () => {
      if (!entreprise) {
        setExportations([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Données factices pour les exportations et ventes_locales (composants exportés)
        const dummyExportations = [
            {
                id_exportation: 101,
                date_exportation: "2024-05-10T10:00:00Z",
                montant_total: 550.75,
                destination: "France",
                id_entreprise: 1, // Lié à Safarilec
                VentesLocales: [
                    { id_vente_locale: 1, quantite: 100, prix_unitaire: 2.50, id_composant: 1, Composant: { name: 'Résistance 10kΩ', categorie: 'Résistance' } },
                    { id_vente_locale: 2, quantite: 50, prix_unitaire: 6.00, id_composant: 2, Composant: { name: 'Condensateur 100nF', categorie: 'Condensateur' } }
                ]
            },
            {
                id_exportation: 102,
                date_exportation: "2024-06-01T14:30:00Z",
                montant_total: 1200.00,
                destination: "Espagne",
                id_entreprise: 1, // Lié à Safarilec
                VentesLocales: [
                    { id_vente_locale: 3, quantite: 200, prix_unitaire: 3.00, id_composant: 3, Composant: { name: 'Diode 1N4148', categorie: 'Diode' } },
                    { id_vente_locale: 4, quantite: 10, prix_unitaire: 60.00, id_composant: 4, Composant: { name: 'Microcontrôleur ESP32', categorie: 'Microcontrôleur' } }
                ]
            },
            {
                id_exportation: 103,
                date_exportation: "2024-05-20T09:00:00Z",
                montant_total: 800.00,
                destination: "Canada",
                id_entreprise: 3, // Lié à Global Components Inc.
                VentesLocales: [
                    { id_vente_locale: 5, quantite: 500, prix_unitaire: 1.50, id_composant: 1, Composant: { name: 'Résistance 10kΩ', categorie: 'Résistance' } }
                ]
            }
        ];

        const filteredExportations = dummyExportations.filter(exp => exp.id_entreprise === entreprise.entreprise_id);
        setExportations(filteredExportations);

      } catch (err) {
        console.error("Erreur lors de la récupération des exportations:", err);
        setError("Impossible de charger les exportations.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchExportations();
    }
  }, [isOpen, entreprise]);

  if (!isOpen || !entreprise) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.largeModal}`}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className={styles.modalTitle}>
          <FontAwesomeIcon icon={faFileExport} className={styles.modalTitleIcon} /> Exportations de {entreprise.name}
        </h2>

        {loading && <div className={styles.loadingMessage}>Chargement des exportations...</div>}
        {error && <div className={styles.errorMessage}><FontAwesomeIcon icon={faInfoCircle} /> {error}</div>}

        {!loading && !error && exportations.length === 0 && (
          <div className={styles.noDataMessage}>
            Aucune exportation trouvée pour cette entreprise.
          </div>
        )}

        {!loading && !error && exportations.length > 0 && (
          <div className={styles.exportationsList}>
            {exportations.map(exp => (
              <div key={exp.id_exportation} className={styles.exportationCard}>
                <div className={styles.exportationHeaderCard}>
                    <h3>Exportation #{exp.id_exportation}</h3>
                    <div className={styles.exportationInfo}>
                        <p><FontAwesomeIcon icon={faCalendarAlt} className={styles.faIcon} /> Date: {new Date(exp.date_exportation).toLocaleDateString()}</p>
                        <p><FontAwesomeIcon icon={faDollarSign} className={styles.faIcon} /> Montant Total: {exp.montant_total ? `${exp.montant_total.toFixed(2)} DH` : 'N/A'}</p>
                        <p><FontAwesomeIcon icon={faExternalLinkAlt} className={styles.faIcon} /> Destination: {exp.destination || 'N/A'}</p>
                    </div>
                </div>

                {exp.VentesLocales && exp.VentesLocales.length > 0 ? (
                  <div className={styles.ventesLocalesList}>
                    <h4><FontAwesomeIcon icon={faListAlt} /> Composants Exportés:</h4>
                    {exp.VentesLocales.map(vl => (
                      <div key={vl.id_vente_locale} className={styles.venteLocaleItem}>
                        <p><FontAwesomeIcon icon={faBox} className={styles.faIcon} /> {vl.Composant?.name || 'Composant Inconnu'} ({vl.Composant?.categorie || 'N/A'})</p>
                        <p>Quantité: {vl.quantite}</p>
                        <p>Prix Unitaire: {vl.prix_unitaire ? `${vl.prix_unitaire.toFixed(2)} DH` : 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noVentesMessage}>Aucun composant détaillé pour cette exportation.</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportationsListModal;