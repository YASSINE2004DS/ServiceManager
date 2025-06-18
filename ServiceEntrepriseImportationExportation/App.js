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
import EntrepriseRouter              from './EntrepriseModule/EntrepriseRouter.js'            ;  // import Entreprise Route
import ComposantRouter               from './ComposentModule/ComposentRouter.js'              ;  // import Composant Route
import ExportationRouter             from './ExportationModule/ExportationRouter.js'          ;  // import Exportation Route
import ComposantExporteRouter        from './ComposantExporteModule/ComposantExporteRouter.js';  // import Composant Exporte Route
import factureExportation            from './PreparePdfModule/PrepareFactureRouter.js'        ;

app.use(express.static('public')); 
app.use('/api/entreprise'             ,  EntrepriseRouter );
app.use('/api/composants'              ,  ComposantRouter  );
app.use('/api/exportation'            ,  ExportationRouter);
app.use('/api/composantExporte'       ,  ComposantExporteRouter);
app.use('/api/facture'                , factureExportation);
     



// Connect to the database
sequelize.sync({})
    .then(() => {
            console.log('Good , Database connected successfully! ');
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

