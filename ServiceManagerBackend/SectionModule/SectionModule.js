import Sequelize, { INTEGER } from 'sequelize';         // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB.js'; // to connect to the database

const Section = sequelize.define('sections', {

    section_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
});

export default Section ;
    