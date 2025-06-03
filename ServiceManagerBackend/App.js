// import packages
import express from 'express'
import dotenv from 'dotenv';

// database connection
import sequelize from './DatabaseModule/ConnectDB.js';
import Models from './DatabaseModule/ModelAssociations.js'
import cors from 'cors';

const { User, Agency, Email, Intervention, Section} = Models;

const app = express();
app.use(express.json());
app.use(cors());
// All routes
import UserRoute              from './UserModule/UserRouter.js';        // import User Route
import AgencyRoute            from './AgencyModule/AgencyRouter.js';  // import Agency Route
import InterventionRoute      from './InterventionModule/InterventionRouter.js'; // import Intervention Route
import EmailRoute             from './EmailModule/EmailRouter.js'; // import Email Route
import SectionRouter          from './SectionModule/SectionRouter.js';

app.use(express.static('public')); 
app.use('/api/user'             ,  UserRoute);
app.use('/api/agency'           ,  AgencyRoute);
app.use('/api/intervention'     ,  InterventionRoute);
app.use('/api/email'            ,  EmailRoute);
app.use('/api/section'          ,  SectionRouter);



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


// lance the server
dotenv.config();
app.listen(process.env.PORT, () => {
    console.log('Server running on port : ', process.env.PORT);
});

