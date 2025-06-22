import Models from '../DatabaseModule/ModelAssociations.js';

const {Entreprise , Exportation , Composant   } = Models ;

//class for service statistique
class StatistiquesService {

    async   getStats(req , res) {
    const entreprisesImportCount        = await Entreprise.count({
        where: { type_entreprise: 'importation' }
    });
     const entreprisesExportCount       = await Entreprise.count({
        where: { type_entreprise: 'exportation' }
    });
    const exportationsCount              = await Exportation.count();
    const composantsCount                = await Composant.count();

    return  res.status(200).json({
        entreprisesImport: entreprisesImportCount,
        entreprisesExport: entreprisesExportCount,
        exportations: exportationsCount,
        composants: composantsCount
    });
}

}

export default new StatistiquesService();