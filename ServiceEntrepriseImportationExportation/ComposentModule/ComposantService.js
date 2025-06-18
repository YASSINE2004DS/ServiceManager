import Models                          from '../DatabaseModule/ModelAssociations.js'
import validator                       from './ComposantValidator.js'

const { ComposantValidator , ComposantUpdateValidator } = validator;
const { Composant , Entreprise }          = Models;



class ComposantService {

    async getAllComposant(req , res) {

        try {
            const composant = await Composant.findAll({
                                                      include: [ 
                                                            {
                                                                model: Entreprise,
                                                                attributes: ['name', 'address', 'adresse_email', 'pays'] // Inclure le nom de l'entreprise
                                                            }
                                                      ],
                                                     });
                 

            
            return res.status(200).json(composant);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des composants', error });
        }
    }

    async getComposantById(req, res) {
        const { id } = req.params;

        try {
            const composant = await Composant.findByPk(id);
            if (!composant) {
                return res.status(404).json({ message: 'Composant non trouvé' });
            }
            return res.status(200).json(composant);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération du composant', error });
        }
    }

    async getComposantByCategorie(req, res) {
        const { categorie } = req.params;

        if(!categorie) {
            return res.status(400).json({ message: 'Catégorie est requise' });
        }

        try {
            const composant = await Composant.findAll({
                where: { categorie : categorie }
            });

            if (!composant) {
                return res.status(404).json({ message: 'Composant non trouvé' });
            }
            return res.status(200).json(composant);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération du composant', error });
        }
    }

    async createComposant(req, res) {
        const { error } = ComposantValidator.validate(req.body);
        const etat = req.query.etat || true ;
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const data = req.body;

            // Vérifier si le composant existe déjà
            const composant = await Composant.findOne({
                where: { name: data.name , categorie: data.categorie }
            });

            if (composant) {
                return res.status(409).json({ message: `le composant ${composant.name} de la categorie ${composant.categorie} déje existe`  });
            }
           
            if(etat=='true') {
                const newComposant = await Composant.create(req.body);
                return res.status(201).json(newComposant);   
            }
            return res.status(201).json(''); 

        } catch (error) {

            return res.status(500).json({ message: 'Erreur lors de la création du composant', error });
        }
    }

    async updateComposant(req, res) {
        const { id } = req.params;
        const { error } = ComposantUpdateValidator.validate(req.body);
        const etat = req.query.etat || true ;

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            let composant = await Composant.findByPk(id);

            if (!composant) {
                return res.status(404).json({ message: 'Composant non trouvé' });
            }

            if(etat=='true') {
              await composant.update(req.body);

            // Rechercher le composant mis à jour pour renvoyer les données actualisées
            composant = await Composant.findByPk(id);

            return res.status(200).json(composant); 
            } 

            return res.status(200).json('');

        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour du composant', error });
        }
    }

    async deleteComposant(req, res) {
        const { id } = req.params;

        try {
            const composant = await Composant.findByPk(id);

            if (!composant) {
                return res.status(404).json({ message: 'Composant non trouvé' });
            }
           
            await composant.destroy();
   
            return res.status(200).json({message : `composant ${composant.name} supprimé avec succées`}); 

        } catch (error) {

            return res.status(500).json({ message: 'Erreur lors de la suppression du composant', error });
        }
    }

    
}

export default  ComposantService;