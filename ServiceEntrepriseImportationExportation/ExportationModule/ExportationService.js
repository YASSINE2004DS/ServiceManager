import Models                    from '../DatabaseModule/ModelAssociations.js';
// import validator                 from './ExportationValidator.js';

const {Exportation , Entreprise} = Models;
// const {ExportationValidator, ExportationUpdateValidator} = validator;


class ExportationService {
    async getAllExportations(req, res) {
        const { id_entreprise } = req.params; // Récupérer l'ID de l'entreprise depuis les paramètres de la requête
        try {
            const exportations = await Exportation.findAll(
                {
                     where : {id_entreprise : id_entreprise } ,
                    include: [{
                        model: Entreprise,
                        attributes: ['name' , 'address' , 'adresse_email' , 'pays'] // Inclure le nom de l'entreprise
                    }],
                    order: [['date_exportation', 'DESC']] // Optionnel : trier par date d'exportation
                }
            );
            return res.status(200).json(exportations);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des exportations', error });
        }
    }

    async getExportationById(req, res) {
        const {exportationId} = req.params;

        try {
            const exportation = await Exportation.findByPk(exportationId ,
                 {
                    include: [{
                        model: Entreprise,
                        attributes: ['name' , 'address' , 'adresse_email' , 'pays'] // Inclure le nom de l'entreprise
                    }]
                }
            );
            if (!exportation) {
                return res.status(404).json({ message: 'Exportation non trouvée' });
            }
            return exportation ;
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération de l’exportation', error });
        }
    }

    async getExportationByEntrepriseName(req, res) {
        const { entrepriseName } = req.params;

        if (!entrepriseName) {
            return res.status(400).json({ message: 'Nom de l’entreprise est requis' });
        }

        try {
            const exportations = await Exportation.findAll({
                include: [{
                    model: Entreprise ,
                    where: { name: entrepriseName },
                    attributes: ['name'] // Inclure le nom de l'entreprise
                }] ,
                order: [['date_exportation', 'DESC']] // Optionnel : trier par date d'exportation
            });

            if (!exportations || exportations.length === 0) {
                return res.status(404).json({ message: 'Aucune exportation trouvée pour cette entreprise' });
            }
            return res.status(200).json(exportations);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des exportations', error });
        }
    }

    async UpdateExportationById(req, res) {
        const { id } = req.params;
        // const { error } = ExportationUpdateValidator.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        try {

            const exportation = await Exportation.findByPk(id);
            if (!exportation) {
                return res.status(404).json({ message: 'Exportation non trouvée' });
            }

                 await Exportation.update(req.body, {
                         where: { id_exportation: id }
                });

            const updatedExportation = await Exportation.findByPk(id);

            return res.status(200).json({ message: 'Exportation mise à jour avec succès' , exportation: updatedExportation });
        } catch (error) {

            return res.status(500).json({ message: 'Erreur lors de la mise à jour de l’exportation', error });
        }
    }

     async deleteExportationById(req, res) {
        const { id } = req.params;

        try {
            
            const exportation = await Exportation.findByPk(id);
            if (!exportation) {
                return res.status(404).json({ message: 'Exportation non trouvée' });
            }

            await Exportation.destroy({ where: { id_exportation: id } });

            return res.status(200).json({ message: 'Exportation supprimée avec succès' });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la suppression de l’exportation', error });
        }
    }

}

export default ExportationService ;