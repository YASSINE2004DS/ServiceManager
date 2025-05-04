import Sequelize from 'sequelize'; // to use the sequelize library
import sequelize from '../DatabaseModule/ConnectDB'; // to connect to the database

// This model defines the structure of the 'User' table
const User = sequelize.define('users', {

    user_id: {
        type:          Sequelize.BIGINT,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false,
    },

    first_name: {
        type:          Sequelize.STRING(50),
        allowNull:     false,
    },

    last_name: {
        type:          Sequelize.STRING(50),
        allowNull:     false,
    },

    email: {
        type:          Sequelize.STRING(100),
        allowNull:     false,
        unique:        true,
    },

    password: {
        type:          Sequelize.STRING(200),
        allowNull:     false,
    },

    role: {
        type:          Sequelize.STRING(50),
        allowNull:     false,
        defaultValue:  'user',
    },

    agency_id: {
        type:          Sequelize.BIGINT,
        allowNull:     false,
        references:    {
            model: 'agencies',
            key:   'agency_id',
        }
    }
});

export default User;