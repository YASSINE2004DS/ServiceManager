// gateway.js (ou app.js)

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Optionnel : pour gérer les requêtes CORS si vos services sont sur des domaines différents
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement depuis un fichier .env si nécessaire

const app = express();
const PORT = process.env.PORT || 3000; // Le port unique de votre API Gateway

// Optionnel : Activer CORS pour toutes les requêtes (important si votre frontend accède à cette gateway depuis un autre domaine/port)
app.use(cors());

// Middleware pour parser les corps de requêtes JSON (si nécessaire pour des requêtes POST/PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Configuration du Proxy pour le Service A (sur le port 8000) ---
// Les requêtes vers http://localhost:3000/api/serviceA/XYZ seront redirigées vers http://localhost:8000/XYZ
app.use(
  '/api/serviceA', // Le chemin qui déclenchera le proxy
  createProxyMiddleware({
    target: 'http://localhost:8000', // L'URL de votre Service A
    changeOrigin: true, // Nécessaire pour que le backend voit l'hôte original
    pathRewrite: {
      '^/api/serviceA': '', // Réécrit le chemin : enlève '/api/serviceA' de l'URL avant de la passer au service cible
    },
    onProxyReq: (proxyReq, req, res) => {
    //   Optionnel : Logique à exécuter avant de proxifier la requête
      console.log(`Proxying request to Service A: ${req.method} ${req.url} -> ${proxyReq.path}`);
      // Exemple : Ajouter un en-tête d'authentification si vous en avez un
      // proxyReq.setHeader('Authorization', `Bearer ${yourAuthToken}`);
    },
    onError: (err, req, res) => {
        console.error('Error proxying to Service A:', err);
        res.status(500).send('Proxy Error for Service A');
    }
  })
);

// --- Configuration du Proxy pour le Service B (sur le port 8001) ---
// Les requêtes vers http://localhost:3000/api/serviceB/XYZ seront redirigées vers http://localhost:8001/XYZ
app.use(
  '/api/serviceB', // Le chemin qui déclenchera le proxy
  createProxyMiddleware({
    target: 'http://localhost:8001', // L'URL de votre Service B
    changeOrigin: true,
    pathRewrite: {
      '^/api/serviceB': '', // Réécrit le chemin : enlève '/api/serviceB' de l'URL
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request to Service B: ${req.method} ${req.url} -> ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
        console.error('Error proxying to Service B:', err);
        res.status(500).send('Proxy Error for Service B');
    }
  })
);

// Gérer les requêtes non routées
app.use((req, res) => {
  res.status(404).send('API Gateway: Route non trouvée.');
});

// Démarrer le serveur API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log(`Service A accessible via http://localhost:${PORT}/api/serviceA`);
  console.log(`Service B accessible via http://localhost:${PORT}/api/serviceB`);
});