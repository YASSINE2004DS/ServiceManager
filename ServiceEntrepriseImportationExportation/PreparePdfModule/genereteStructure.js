
import path from 'path';
import fs from 'fs';
import { FLOAT } from 'sequelize';

export function generateStructureFacture(exportationData) {
  const { client, ComposnatsExporte } = exportationData;
   
  // Assurez-vous que les données sont valides et que les champs sont présents
  const clientName = client?.entreprise?.name || 'Nom du Client Inconnu';
  const clientAddress = client?.entreprise?.address || '';
  const clientEmail = client?.entreprise?.adresse_email || '';
  const clientPhone = client?.entreprise?.phone || ''; // Ajouté si disponible
  const factureDate = client?.date_exportation ? new Date(client.date_exportation).toLocaleDateString('fr-FR') : 'Date Inconnue';
  const factureDemande = client?.date_exportation ? new Date(client.date_demande).toLocaleDateString('fr-FR') : 'Date Inconnue';
  const factureNumber = String(client.id_exportation*1998).padStart(6, '0').substring(0 , 6);  // Format de facture avec 6 chiffres

   const logoAbsolutePath = path.join(process.cwd(), 'public', 'logo.png');

       const logoBuffer = fs.readFileSync(logoAbsolutePath);
    // Convertir le buffer en Base64
    const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  const composantsRows = ComposnatsExporte.map((c, index) => `
    <tr class="${index % 2 === 0 ? 'even-row' : 'odd-row'}">
      <td>${c.composant.name || 'Inconnue'}</td>
      <td>${c.composant.categorie || 'Inconnue'}</td>
      <td class="text-center">${c.quantite || 0}</td>
      <td class="text-right">${(Number(c.composant?.unit_cost) || 0).toFixed(2)} DH</td>
      <td class="text-right">${Number((c.quantite || 0) * (c.composant?.unit_cost || 0)).toFixed(2)} DH</td>
    </tr>
  `).join('');

  const totalHT = ComposnatsExporte.reduce((sum, c) => sum + (c.quantite || 0) * (c.composant.unit_cost || 0), 0);
  // Supposons une TVA de 20% pour l'exemple, ajustez si nécessaire
//   const tvaRate = 0.20;
//   const totalTVA = totalHT * tvaRate;
//   const totalTTC = totalHT + totalTVA;


  return `
    <html>
    <head>
      <title>Facture N° ${factureNumber}</title>
      <style>
        /* Variables CSS pour un thème facile */
        :root {
          --primary-color: #0056b3; /* Bleu foncé pour les accents */
          --secondary-color: #6c757d; /* Gris pour le texte secondaire */
          --border-color: #dee2e6;
          --header-bg: #f8f9fa; /* Arrière-plan léger pour l'en-tête */
          --table-header-bg: #e9ecef; /* Arrière-plan pour les en-têtes de tableau */
          --font-family: 'Helvetica Neue', Arial, sans-serif;
          --text-color: #343a40;
          --line-height: 1.6;
        }

        body {
          font-family: var(--font-family);
          padding: 30px;
          color: var(--text-color);
          line-height: var(--line-height);
          background-color: #f4f7f6; /* Très léger fond pour la page */
        }

        .invoice-container {
          width: 210mm; /* A4 width */
          min-height: 297mm; /* A4 height */
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
          padding: 30px 40px; /* Padding interne */
          box-sizing: border-box; /* Inclure padding dans la largeur */
        }

        /* En-tête de la facture */
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          border-bottom: 2px solid var(--primary-color);
          padding-bottom: 20px;
        }

        .invoice-header .logo-section {
          flex: 1;
        }

        .invoice-header .logo {
          max-width: 150px; /* Taille du logo */
          height: auto;
        }

        .invoice-header .company-info {
          flex: 1;
          text-align: right;
          font-size: 0.9em;
          color: var(--secondary-color);
        }
        .invoice-header .company-info strong {
            color: var(--text-color);
        }

        .invoice-title {
          font-size: 2.8em;
          color: var(--primary-color);
          text-align: center;
          margin-top: -10px; /* Ajustement si nécessaire après le header */
          margin-bottom: 40px;
          font-weight: 700;
          text-transform: uppercase;
        }

        /* Sections d'information (client, date, etc.) */
        .invoice-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .invoice-details .detail-block {
          flex: 1;
          margin-right: 20px;
          padding: 15px;
          background-color: var(--header-bg);
          border-left: 4px solid var(--primary-color);
          border-radius: 4px;
          font-size: 0.95em;
        }
         .invoice-details .detail-block:last-child {
            margin-right: 0;
        }


        .detail-block strong {
          display: block;
          margin-bottom: 5px;
          color: var(--primary-color);
          font-size: 1.1em;
        }

        /* Tableau des composants */
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
          margin-bottom: 40px;
        }

        .items-table th, .items-table td {
          border: 1px solid var(--border-color);
          padding: 12px;
          text-align: left;
          font-size: 0.9em;
        }

        .items-table th {
          background-color: var(--table-header-bg);
          color: var(--text-color);
          font-weight: 600;
          text-transform: uppercase;
        }

        .items-table .text-center { text-align: center; }
        .items-table .text-right { text-align: right; }

        .items-table .even-row { background-color: #fdfdfd; } /* Légèrement plus clair */
        .items-table .odd-row { background-color: #ffffff; }

        /* Section des totaux */
        .totals-section {
          width: 40%; /* Pour aligner à droite sous le tableau */
          margin-left: auto;
          margin-top: 20px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden; /* Pour que les bords arrondis s'appliquent */
          background-color: var(--header-bg);
        }

        .totals-section div {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          border-bottom: 1px solid var(--border-color);
        }
        .totals-section div:last-child {
            border-bottom: none;
        }

        .totals-section .label {
          color: var(--secondary-color);
        }

        .totals-section .value {
          font-weight: 600;
          color: var(--text-color);
        }

        .totals-section .grand-total {
          background-color: lightgray ;
          color: #ffffff;
          font-size: 1.2em;
          font-weight: 700;
          padding: 15px 15px;
        }

        /* Pied de page / Signature */
        .invoice-footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          text-align: right;
          font-size: 0.9em;
          color: var(--secondary-color);
        }

        .invoice-footer p {
            margin: 5px 0;
        }
        .invoice-footer strong {
            color: var(--text-color);
        }

        .signature-line {
          margin-top: 40px;
          width: 250px;
          border-bottom: 1px solid var(--text-color);
          margin-left: auto; /* Aligner à droite */
          padding-bottom: 5px;
          text-align: center;
        }
        .signature-text {
            text-align: right;
            font-size: 0.9em;
            color: var(--secondary-color);
            margin-top: 5px;
        }

        /* Media Queries pour l'impression */
        @media print {
            body {
                padding: 0;
                margin: 0;
                -webkit-print-color-adjust: exact; /* Pour Chrome */
                print-color-adjust: exact; /* Standard */
            }
            .invoice-container {
                box-shadow: none;
                border: none;
                margin: 0;
                padding: 15mm; /* Marges pour l'impression A4 */
                width: 100%;
                min-height: auto;
            }
            .invoice-header, .invoice-details, .items-table, .totals-section, .invoice-footer {
                break-inside: avoid; /* Empêche les ruptures de page au milieu des sections */
            }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="invoice-header">
          <div class="logo-section">
            <img src="${logoBase64}" alt="safarelec logo" class="logo" />
          </div>
          <div class="company-info">
            <strong>Safarelec</strong><br>
            Lot 324, Zone industrielle, El Jadida – Maroc<br>
            safarelec2@gmail.com<br>
            +212 523 351 060</div>
        </div>

        <h1 class="invoice-title">Facture</h1>

        <div class="invoice-details">
          <div class="detail-block">
            <strong>Facturé à :</strong>
            ${clientName}<br>
            ${clientAddress}<br>
            ${clientEmail}<br>
            ${clientPhone}
          </div>
          <div class="detail-block">
            <strong>Détails de la facture :</strong>
            N° Facture: ${factureNumber}<br>
            Date de demande: ${factureDemande}<br>
            Date de livraison: ${factureDate}<br>
         </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Composant</th>
              <th>Catégorie</th>
              <th class="text-center">Quantité</th>
              <th class="text-right">Prix Unitaire</th>
              <th class="text-right">Montant Total</th>
            </tr>
          </thead>
          <tbody>
            ${composantsRows}
          </tbody>
        </table>

        <div class="totals-section">
          <div class="grand-total">
            <span class="label">Total :</span>
            <span class="value">${totalHT.toFixed(2)} DH</span>
          </div>
        </div>

        <div class="invoice-footer">
          <p>Merci pour votre confiance !</p>
          <div class="signature-line"></div>
          <p class="signature-text">Signature de Safarelec</p>
        </div>
      </div>
    </body>
    </html>
  `;
}