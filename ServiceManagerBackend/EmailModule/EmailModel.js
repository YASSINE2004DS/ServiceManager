import Sequelize from 'sequelize';                      // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB.js'; // to connect to the database


const Email = sequelize.define('emails', {
    email_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    content: {
        type: Sequelize.STRING(2000),
        allowNull: false
    },

    status: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    source_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },

    destination_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    }
})

export default Email;