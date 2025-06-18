import Composant            from    '../ComposentModule/ComposentModule.js'     ;
import Entreprise           from    '../EntrepriseModule/EntrepriseModule.js'   ;
import Exportation          from    '../ExportationModule/ExportationModule.js' ;
import ComposantExporte     from    '../ComposantExporteModule/ComposantExporteModule.js'    ;

// Agency ⟷ Users
Entreprise.hasMany(Composant, {
    foreignKey: 'source_id_entreprise',
    onDelete: 'CASCADE',
    // hooks: true
});

Composant.belongsTo(Entreprise, {
    foreignKey: 'source_id_entreprise',
    onDelete: 'CASCADE',
    // hooks: true
});


Entreprise.hasMany(Exportation, {
    foreignKey: 'id_entreprise',
    onDelete: 'CASCADE',
    // hooks: true
});

Exportation.belongsTo(Entreprise, {
    foreignKey: 'id_entreprise',
    onDelete: 'CASCADE',
    // hooks: true
});

Exportation.hasMany(ComposantExporte, {
    foreignKey: 'id_exportation',
    onDelete: 'CASCADE',
    // hooks: true
});

ComposantExporte.belongsTo(Exportation, {
    foreignKey: 'id_exportation',
    onDelete: 'CASCADE',
    // hooks: true
});

Composant.hasMany(ComposantExporte, {
    foreignKey: 'id_composant',
    onDelete: 'CASCADE',
    // hooks: true
});

ComposantExporte.belongsTo(Composant, {
    foreignKey: 'id_composant',
    onDelete: 'CASCADE',
    // hooks: true
});







export default {
   Entreprise,
    Composant ,
    Exportation ,
    ComposantExporte
};
