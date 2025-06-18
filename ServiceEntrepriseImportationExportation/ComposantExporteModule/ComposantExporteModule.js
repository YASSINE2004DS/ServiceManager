import   Sequelize     from 'sequelize'
import   sequelize     from '../DatabaseModule/ConnectDB.js'


const ComposantExporte = sequelize.define('ventes_locales', {
    id_vente_locale: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },

    quantite: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    prix_unitaire: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },

    id_composant: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'composants',
            key: 'id_composant'
        }
    },

    id_exportation: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
            model: 'exportations',
            key: 'id_exportation'
        }
    },
}) ;

export default ComposantExporte;
