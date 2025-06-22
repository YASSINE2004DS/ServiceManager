// import packages
import express from 'express'
import dotenv from 'dotenv';

// database connection
import sequelize from './DatabaseModule/ConnectDB.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
// All routes
import UserRoute              from './UserModule/UserRouter.js';        // import User Route
import AgencyRoute            from './AgencyModule/AgencyRouter.js';  // import Agency Route
import InterventionRoute      from './InterventionModule/InterventionRouter.js'; // import Intervention Route
import EmailRoute             from './EmailModule/EmailRouter.js'; // import Email Route
import SectionRouter          from './SectionModule/SectionRouter.js';
import StatistiquesRouter     from './StatistiquesService/RouterStatistiques.js'; // import Statistics Route

app.use(express.static('public')); 
app.use('/api/user'             ,  UserRoute);
app.use('/api/agency'           ,  AgencyRoute);
app.use('/api/intervention'     ,  InterventionRoute);
app.use('/api/email'            ,  EmailRoute);
app.use('/api/section'          ,  SectionRouter);
app.use('/api/statistiques'     ,  StatistiquesRouter);



// Connect to the database
sequelize.sync({})
    .then(() => {
            console.log('Good.');
            app.listen(3000, () => {
            console.log('Database connected successfully!');
            });
    })
    .catch((error) => {
            console.error('Error from the database :', error);
});

sequelize.sync();

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur interne est survenue.');
});

// lance the server
dotenv.config();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

