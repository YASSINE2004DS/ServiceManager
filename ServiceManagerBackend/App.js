const express = require('express');
const app = express();
const AuthoesRouter = require('./Routers/User.route');
const UserRoute = require('./Routers/Auth.route');
require('dotenv').config(); // Pour charger les variables d'environnement depuis le fichier .env
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' })); // Autoriser les requêtes depuis le frontend

app.use(express.json()); // Pour parser les requêtes JSON

// Vos routes ici

app.use('/users', UserRoute);


app.listen(process.env.PORT, () => {
    console.log('Serveur démarré sur le port ', process.env.PORT);
});