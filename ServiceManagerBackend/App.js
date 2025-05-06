// import packages
import express from 'express'
import dotenv from 'dotenv';

// database connection
import sequelize from './DatabaseModule/ConnectDB.js';
import Models from './DatabaseModule/ModelAssociations.js'
const { User, Agency, Email, Intervention, Section} = Models;

const app = express();
app.use(express.json());

// All routes
import UserRoute from './UserModule/UserRouter.js';

app.use('/user', UserRoute);



// Connect to the database
sequelize.sync()
    .then(() => {
            console.log('Good.');
            app.listen(3000, () => {
            console.log('Server running on port 3000');
            });
    })
    .catch((error) => {
            console.error('Error from the database :', error);
});

sequelize.sync();



// lance the server
dotenv.config();
app.listen(process.env.PORT, () => {
    console.log('Serveur démarré sur le port ', process.env.PORT);
});