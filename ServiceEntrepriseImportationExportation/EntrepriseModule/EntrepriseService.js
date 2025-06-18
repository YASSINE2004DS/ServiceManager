import Models       from '../DatabaseModule/ModelAssociations.js';
import ValidateData from './EntrepriseValidator.js'
import { Op }       from 'sequelize';

const {Entreprise} = Models ;
const { entrepriseSchema, entrepriseSchemaForUpdate } = ValidateData;
/**
 * Service to handle operations related to the Entreprise model.
 */
class EntrepriseService {

    /**
     * Retrieves all importation enterprises from the database.
     * @returns {Promise<Array>} A promise that resolves to an array of enterprises.
     */
     async getAllEntrepriseImportation(req, res) {
        try {
            const entreprises = await Entreprise.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                where: {
                    type_entreprise: 'importation'
                }
            });
            return res.status(200).json(entreprises);

        }
        catch (error) {
            return res.status(500).json({ message: 'Error fetching enterprises: ' + error });
        }
    }

    /**
 * Retrieves all exportation  enterprises  (locale) from the database. 
 * @returns {Promise<Array>} A promise that resolves to an array of enterprises.
 */
     async getAllEntrepriseExportation(req, res) {
        try {
            const entreprises = await Entreprise.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                where: {
                    type_entreprise: 'exportation'
                }
            });
            return res.status(200).json(entreprises);

        }
        catch (error) {
            return res.status(500).json({ message: 'Error fetching enterprises: ' + error });
        }
    }

    /**
     * Retrieves an enterprise by its ID.
     * @param {number} id - The ID of the enterprise to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the enterprise object.
     */
     async getEntrepriseById(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'Enterprise ID is required' });
            }
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ message: 'Invalid enterprise ID' });
            }
            const entreprise = await Entreprise.findOne({
                where: { entreprise_id: id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            return res.status(200).json(entreprise);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error fetching enterprises: ' + error });
        }
    }

    /**
     * Creates a new enterprise in the database.
     * @param {Object} data - The data for the new enterprise.
     * @returns {Promise<Object>} A promise that resolves to the created enterprise object.
     */
     async create(req, res) {

        const { error } = entrepriseSchema.validate(req.body);
        const etat = req.query.etat || true ;

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const data = req.body;
            const entreprise = await Entreprise.findOne({
                                                           where : {
                                                            name:data.name
                                                           }
                                                        });
             if(entreprise)
                return res.status(400).json({message : "Entreprise already exist"});

         if(etat==='true') {
             
           const newEntreprise = await Entreprise.create(data);
            return res.status(201).json(newEntreprise);
         }
            return res.status(201).json(''); // Return an empty response if etat is false

        }
        catch (error) {
            return res.status(500).json({ message: 'Error fetching enterprises: ' + error });
        }
    }

    /**
     * Updates an existing enterprise in the database.
     * @param {number} id - The ID of the enterprise to update.
     * @param {Object} data - The new data for the enterprise.
     * @returns {Promise<Object>} A promise that resolves to the updated enterprise object.
     */

    async UpdateEntreprise(req, res) {
        const id = req.params.id;
        const etat = req.query.etat || true ;

        if (!id) {
            return res.status(400).json({ message: 'Enterprise ID is required' });
        }

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid enterprise ID' });
        }

        try {

            const data = req.body;
            const { error } = entrepriseSchemaForUpdate.validate(data);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            // Validate the data before updating
            const entreprise = await Entreprise.findOne({
                where: { entreprise_id: id }
            });

            if (!entreprise) {
                return res.status(404).json({ message: 'Enterprise not found' });
            }

            if(etat==='true') {

            const [updated] = await Entreprise.update(data, {
                where: { entreprise_id: id }
            });

            if (updated) {
                const updatedEntreprise = await Entreprise.findOne({
                    where: { entreprise_id: id },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                });
                return res.status(200).json(updatedEntreprise);
            }

            }

            return res.status(200).json(''); // Return an empty response if etat is false

        }
        catch (error) {
            return res.status(500).json({ message: 'Error updating enterprise: ' + error });
        }
    }

    /**
     * Deletes an enterprise by its ID.
     * @param {number} id - The ID of the enterprise to delete.
     * @returns {Promise<Object>} A promise that resolves to a success message.
     */

    async deleteEntreprise(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Enterprise ID is required' });
        }

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid enterprise ID' });
        }

        try {
            const entreprise = await Entreprise.findOne({
                where: { entreprise_id: id }
            });

            if (!entreprise) {
                return res.status(404).json({ message: 'Enterprise not found' });
            }

            await Entreprise.destroy({
                where: { entreprise_id: id }
            });

            return res.status(200).json({ message: 'Enterprise deleted successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error deleting enterprise: ' + error });
        }
    }

}

export default new EntrepriseService();