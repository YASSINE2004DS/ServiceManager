import    Sequelize     from 'sequelize'
import    sequelize     from '../DatabaseModule/ConnectDB.js'


const Exportation = sequelize.define('exportations', {
    id_exportation : {
        type           : Sequelize.BIGINT,
        autoIncrement   : true,
        primaryKey      : true
    },

    date_demande : {
        type           : Sequelize.DATE,
        allowNull      : false,
        defaultValue   : Sequelize.NOW
    },

    date_exportation : {
        type           : Sequelize.DATE,
        allowNull      : false,
        defaultValue   : Sequelize.NOW
    },

    id_entreprise : {
        type           : Sequelize.BIGINT,
        allowNull      : false,
        references     : {
            model: 'entreprises',
            key: 'entreprise_id'
        }
    }

});
export default Exportation;