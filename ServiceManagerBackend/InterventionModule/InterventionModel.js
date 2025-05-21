import Sequelize, { INTEGER } from 'sequelize';         // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB.js'; // to connect to the database

const Intervention = sequelize.define('interventions', {

    intervention_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false
    },

    team: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

    reference: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    post: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    maintenance_type: {
        type: Sequelize.STRING(50),
        allowNull: false
    },

    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    work_order_number: {
        type: Sequelize.BIGINT,
        allowNull: false
    },

    work_autorisation_number: {
        type: Sequelize.BIGINT,
        allowNull: false
    },

    planification: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    reception: {
        type: Sequelize.BOOLEAN,
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

    comment: {
        type: Sequelize.STRING(3000),
        allowNull: true
    },

    validate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    section_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'sections',
            key: 'section_id'
        }
    },

    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    }
})





export default  Intervention ;


