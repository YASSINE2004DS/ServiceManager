import Sequelize      from 'sequelize'
import sequelize      from '../DatabaseModule/ConnectDB.js'


const Composant = sequelize.define('composants' , {

     id_composant : {
        type            : Sequelize.BIGINT ,
        autoIncrement   : true ,
        primaryKey      : true
     },

     name : {
        type            : Sequelize.STRING,
        allowNull       : false ,
     },

     categorie : {
        type            : Sequelize.STRING,
        allowNull       : false ,
     }, 

      stock_quantity: { // Quantité en stock
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

       min_stock_level: { // Niveau de stock minimum (pour déclencher une alerte de réapprovisionnement)
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
    },

      location: { // Emplacement physique du composant dans l'entrepôt (ex : "Allée 3, Bac 12")
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },

     unit_cost: { // Coût unitaire d'achat du composant (peut être différent du prix de vente)
        type: Sequelize.DECIMAL(10, 4), // DECIMAL pour la précision monétaire
        allowNull: true,
        defaultValue: null
     },

     lead_time_days: { // Délai de livraison en jours pour le réapprovisionnement
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
     },

    status: { // Statut du composant (ex : "Actif", "Fin de vie", "Obsolète", "Abandonné", "Brouillon")
        type: Sequelize.ENUM('Active', 'Obsolete', 'Discontinued'), // J'ai gardé les noms anglais pour ENUM car c'est une pratique courante, mais vous pouvez les traduire
        allowNull: false,
        defaultValue: 'Active'
     },
   
     source_id_entreprise : {
       type             : Sequelize.BIGINT ,
        allowNull       : true ,
        defaultValue    : null ,
        references      : {
            model: 'entreprises',
            key: 'entreprise_id'
        }        

     }
});

export default Composant ;