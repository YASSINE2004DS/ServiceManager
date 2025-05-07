import Sequelize from 'sequelize';                      // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB.js'; // to connect to the database

// define the Agency Model
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
        allowNull: true
    },

    end_time: {
        type: Sequelize.TIME,
        allowNull: true
    },

    adress: {
        type: Sequelize.STRING(100),
        allowNull: true
    },

    current: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

export default Agency;