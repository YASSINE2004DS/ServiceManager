import Sequelize from 'sequelize';                      // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB.js'; // to connect to the database


// Define the Entreprise model
const Entreprise = sequelize.define('entreprises' , {
    entreprise_id:{
        type            : Sequelize.BIGINT,
        primaryKey      : true ,
        autoIncrement   : true
    },

    name : {
        type        : Sequelize.STRING(50),
        allowNull   : false
    },

    address : {
        type        : Sequelize.STRING(100),
        allowNull   : true
    },

    adresse_email : {
        type        : Sequelize.STRING(100),
        allowNull   : true
    },

    pays : {
        type        : Sequelize.STRING(50),
        allowNull   : false,
        defaultValue: 'Maroc'
    },

    type_entreprise : {
        type        : Sequelize.STRING(20) ,
        values      : ['importation', 'exportation'],
        allowNull   : false,
  
    },

    locale : {
        type        :Sequelize.BOOLEAN,
        allowNull   : false,
        defaultValue: true
    }
}) ;

export default Entreprise ; 