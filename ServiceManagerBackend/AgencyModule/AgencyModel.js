import Sequelize from 'sequelize';                      // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB.js'; // to connect to the database

// define the Agency model
const Agency = sequelize.define('agencies', {

    agency_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

    start_time: {
        type: Sequelize.TIME,
        allowNull: false
    },

    end_time: {
        type: Sequelize.TIME,
        allowNull: false
    },

    adress: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    current: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

export default Agency;