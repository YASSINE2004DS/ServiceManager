import   Models         from       '../DatabaseModule/ModelAssociations.js';
import   validator      from       './ComposantExporteValidator.js';


const { Exportation , Composant  , ComposantExporte}    = Models;
const {composantSchema , exportationSchema}             = validator ;


class  ComposantExporteService {

        async getComposantsExporteForFacture(req , res) {

        const {exportationId} = req.params;
        let resultat ;
        if (!exportationId) {
            resultat = 'ID d’exportation est requis' ;
            return resultat ;
        }
        try {
            const composantsExporte = await ComposantExporte.findAll({
                where: { id_exportation: exportationId },
                include: [
                    {
                        model: Composant,
                        as: 'composant',
                    }
                ],
                attributes : {
                      exclude: ['id_composant', 'id_exportation' , 'createdAt', 'updatedAt']
                }
            });
            return composantsExporte ;
        } catch (error) {
            resultat = 'Erreur lors de la récupération des composants exportés' + error ;
            return resultat ;
         }
    }

    async getComposantsExporteByExportationId(req , res) {

        const {exportationId} = req.params;
        if (!exportationId) {
            return res.status(400).json({ message: 'ID d’exportation est requis' });
        }
        try {
            const composantsExporte = await ComposantExporte.findAll({
                where: { id_exportation: exportationId },
                include: [
                    {
                        model: Composant,
                        as: 'composant'
                    },
                    {
                        model: Exportation,
                        as: 'exportation',
                    }
                ],
                attributes : {
                      exclude: ['createdAt', 'updatedAt']
                }
            });
            return res.status(200).json(composantsExporte);
        } catch (error) {
              return res.status(500).json({ message: 'Erreur lors de la récupération des composants exportés', error });
        }
    }


    async createExportation(req , res) {

        const { error } = exportationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        try {

            const data = req.body ;
            
             const  NewExportation = await Exportation.create({
                id_entreprise: data.id_entreprise,
                date_exportation: data.date_exportation || new Date(),
                date_demande    : data.date_demande || new Date()  
            });

            const composantsExporte = await ComposantExporte.bulkCreate(
                data.composants.map(composant => ({
                    id_exportation  : NewExportation.id_exportation,
                    id_composant    : composant.id_composant,
                    quantite        : composant.quantite ,
                    prix_unitaire   : composant.prix_unitaire
                })) 
            );
            return res.status(201).json({
                message: 'Composants exportés créés avec succès',
                exportation: NewExportation
            });
        } catch (error) {
            
            return res.status(500).json({ message: 'Erreur lors de la création des composants exportés', error });
        }
    }

     
    async createComposantExporte(req, res) {

        const { error } = composantSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const data = req.body;

            // Vérifier si le composant exporté existe déjà
            const composantExporte = await ComposantExporte.findOne({
                where: { id_composant: data.id_composant, id_exportation: data.id_exportation }
            });

            if (composantExporte) {
                return res.status(409).json({ message: `Le composant exporté pour l'exportation ${data.id_exportation} existe déjà` });
            }

            const newComposantExporte = await ComposantExporte.create(data , 
                {
                    include: [
                        {
                            model: Composant,
                            as: 'composant',
                            attributes: ['id_composant', 'name', 'categorie']
                        }
                    ]
                }
            );
            return res.status(201).json(newComposantExporte);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la création du composant exporté', error });
        }
    }

    async updateComposantExporte(req, res) {
        const { id } = req.params;
        const { error } = composantSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


        try {
            const composantExporte = await ComposantExporte.findByPk(id);
            if (!composantExporte) {
                return res.status(404).json({ message: 'Composant exporté non trouvé' });
            }

            await ComposantExporte.update(req.body, {
                where: { id_vente_locale: id }
            });

            const updatedComposantExporte = await ComposantExporte.findByPk(id , 
                {
                    include: [
                        {
                            model: Composant,
                            as: 'composant',
                            attributes: ['id_composant', 'name', 'categorie']
                        }
                    ]
                }
            );
            return res.status(200).json({ message: 'Composant exporté mis à jour avec succès', composantExporte: updatedComposantExporte });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour du composant exporté', error });
        }
    }

    async deleteComposantExporte(req, res) {
        const { id } = req.params;

        try {
            const composantExporte = await ComposantExporte.findByPk(id,
                {
                    include: [
                        {
                            model: Composant,
                            as: 'composant',
                            attributes: ['id_composant', 'name', 'categorie']
                        }
                    ]
                }
            );

            if (!composantExporte) {
                return res.status(404).json({ message: 'Composant exporté non trouvé' });
            }

            await composantExporte.destroy();
            return res.status(200).json({ message: `Composant exporté ${composantExporte.composant.name} supprimé avec succès` });
        } catch (error) {

            return res.status(500).json({ message: 'Erreur lors de la suppression du composant exporté', error });
        }
    }

 
}


export default  ComposantExporteService;