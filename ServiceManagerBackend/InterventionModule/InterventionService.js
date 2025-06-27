import Models                     from '../DatabaseModule/ModelAssociations.js'; // import Models
import validateDataInterevention  from './ValidatorInterevention.js';       // import the variables for validate data from user 
const { ValidateUpdatingIntervention , ValidateCreatingIntervention } = validateDataInterevention; // destructure the variables for validate data from user
import { Op }                     from 'sequelize';



// import the models from the database; 
const {  Intervention , Section , User } = Models ; 

class InterventionService {
    async getInterventions(req , res) {
        try {
            let  interventions ;
            const Intervention_today = req.query.Intervention_today ;
            const validateIntervention = req.query.validate || 1 ;
            const today = new Date();
                        today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);
            // Get all Agencies from the database.
            if( Intervention_today ==='false') {

                        interventions = await Intervention.findAll({ 
                                                        where     :  {
                                                                       validate : parseInt(validateIntervention)
                                                                    },
                                                        attributes: { exclude: ['updatedAt'] } ,
                                                        include   : {
                                                                model: Section,
                                                                attributes: ['name'] // <-- optionnel : liste des attributs à retourner
                                                                  }
                                                               
                                                             });
             }else {
                        interventions = await Intervention.findAll({ 
                                                        where     :  {
                                                                       validate : 1 , 
                                                                       date     : {
                                                                                [Op.gte]: today,
                                                                                [Op.lt]: tomorrow
                                                                        }
                                                                    },
                                                        attributes: { exclude: ['updatedAt'] } ,
                                                        include   : {
                                                                model: Section,
                                                                attributes: ['name'] // <-- optionnel : liste des attributs à retourner
                                                                  }
                                                               
                                                             });
             }                                                 

            //return the Agencies informations
            res.json(interventions);
        } catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }


    async getInterventionById(req , res) {
        try {
            // Check if the Interevention exist and valid.
            const interventionId = req.params.id_Intervention;
            const userId = req.params.id;

            if(isNaN(Number(interventionId)))
                return res.status(400).json({ message: "Intervention id not valid!" });

            // Get the Interevention from the database.
            const intervention = await Intervention.findOne({ 
                                                    where: { intervention_id: interventionId } ,
                                                    attributes: { exclude: ['updatedAt'] } ,
                                                    include: {
                                                        model: Section,
                                                        attributes: ['name'] // <-- optionnel : liste des attributs à retourner
                                                      }
                                                });
            const User_courant = await User.findOne({
                                                       where : {user_id : userId }
                                                    })

            // If the Interevention not exist.
            if(!intervention) return res.status(400).json({ message: `No Intervention has the id : ${interventionId}` });

            if(intervention.user_id != userId && User_courant.role !== 'admin') return res.status(403).json({message : "Authorization failed"}) ;

            // Return the Interevention informations
            return res.status(200).json(intervention);
        }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }


async getInterventionsByIdUser(req, res) {
    try {
        // 1. Validate userId
        const userId = req.params.id;

        // Use a more robust check for valid ID (e.g., UUID if applicable, or simple integer check)
        // For numbers, ensure it's a positive integer.
        if (isNaN(parseInt(userId)) || parseInt(userId) <= 0) {
            return res.status(400).json({ message: "L'identifiant de l'utilisateur n'est pas valide." });
        }

        // 2. Parse and validate pagination parameters
        // Default values for page and limit should be reasonable for a first fetch.
        // A limit of 1 is usually not what's intended for pagination. Let's use 10 or 20 as a common default.
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Default limit set to 10 for better usability

        // Ensure page and limit are positive integers
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({ message: "Les paramètres de pagination (page, limit) doivent être des nombres positifs." });
        }

        const offset = (page - 1) * limit;

        // 3. Fetch Interventions from the database with pagination
        // Using `findAndCountAll` is more efficient for pagination as it returns both data and total count.
        const { count, rows: interventions } = await Intervention.findAndCountAll({
            where: { user_id: userId },
            attributes: { exclude: ['updatedAt'] }, // Exclude 'updatedAt' from results
            include: {
                model: Section,
                attributes: ['name'] // Include only the 'name' attribute from the Section model
            },
            limit: limit,   // Apply the limit for pagination
            offset: offset, // Apply the offset for pagination
            order: [['createdAt', 'DESC']] // Optional: Order interventions, e.g., by most recent
        });

        // 4. Handle no interventions found for the user
        // It's better to return an empty array and total count than a 400 error.
        // A 400 status means a bad request, not "no data found for this valid request".
        if (interventions.length === 0 && page === 1) {
            return res.status(200).json({
                message: `Aucune intervention trouvée pour l'utilisateur avec l'ID : ${userId}.`,
                interventions: [],
                totalItems: 0,
                totalPages: 0,
                currentPage: page
            });
        }

        // 5. Calculate total pages
        const totalPages = Math.ceil(count / limit);

        // 6. Return the interventions and pagination metadata
        return res.status(200).json({
            message: `Interventions récupérées avec succès pour l'utilisateur ${userId}.`,
            interventions: interventions,
            totalItems: count,      // Total number of items (interventions)
            totalPages: totalPages, // Total number of pages
            currentPage: page,      // Current page number
            limit: limit            // Limit per page
        });

    } catch (error) {
        // 7. Handle internal server errors
        console.error(`Erreur lors de la récupération des interventions pour l'utilisateur ${req.params.id}:`, error);
        res.status(500).json({
            message: "Une erreur est survenue lors de la récupération des interventions.",
            error: error.message
        });
    }
}


    async createNewIntervention(req , res){

          try {

            let etat ;
             if(req.query.etat)
                 etat = req.query.etat==='true' ? 1 : 0 ;
            else 
                 etat = 1 ;

            const { error } = ValidateCreatingIntervention.validate(req.body); // validate the data from user
             
            if(error) return res.status(400).json({ message: error.details[0].message }); // check if the data is valid

            //retreive the data from the request body
            const dataFromUser = req.body ;

            //Get the interevention from the database
            const VerifyIntereventionExist =  await Intervention.findOne({
                                                                where : { intervention_id : dataFromUser.intervention_id }
                                                               });
            //check the interevention exist in the database
            if(VerifyIntereventionExist) return res.status(400).json({message : "Intervention demande déja exists"});

             if(etat)
             {
            //Create the new interevention in the database
            const CreateNewIntervention = await Intervention.create({ 
                intervention_id      : dataFromUser.intervention_id,
                date                 : dataFromUser.date,
                team                 : dataFromUser.team,
                reference            : dataFromUser.reference,
                post                 : dataFromUser.post,
                maintenance_type     : dataFromUser.maintenance_type,
                status               : dataFromUser.status,
                work_order_number    : dataFromUser.work_order_number,
                work_autorisation_number : dataFromUser.work_autorisation_number,
                planification        : dataFromUser.planification,
                reception            : dataFromUser.reception,
                start_time           : dataFromUser.start_time,
                end_time             : dataFromUser.end_time,
                comment              : dataFromUser.comment,
                validate             : dataFromUser.validate,
                section_id            : dataFromUser.section_id,
                user_id              : dataFromUser.user_id

                                                                         });

             //check if the interevention is created in the database
            if(CreateNewIntervention) return res.status(200).json({Success : `Intervention ${dataFromUser.intervention_id} a été ajouter` , Interevntion : CreateNewIntervention});
          
             }else {
               return res.status(200).json('');
             }

            } catch (error) {
            // handle error
            return res.status(500).json({ message : error.message });
            }
    }


    async UpdateInterventionById(req , res){
         try{

            const { error } = ValidateUpdatingIntervention.validate(req.body); // validate the data from user
             let etat ;
             if(req.query.etat)
                 etat = req.query.etat==='true' ? 1 : 0 ;
            else 
                 etat = 1 ;

            if(error) return res.status(400).json({ message: error.details[0].message }); // check if the data is valid
             // retrieve the id from the request parameters
             const interventionId = req.params.id_Intervention ; // get the id from the request parameters

             //retrieve the data from the request body
             const dataFromUser = req.body ;

            // Check if the id is valid 
            if(isNaN(Number(interventionId))) return res.status(400).json({ message: "Intervention id not valid!" });
            
           // retreive the intervention from the database
            const intreventionExist = await Intervention.findOne({ 
                                                                where: { intervention_id: interventionId } 
                                                             });
         // req.params.id = interventionId; // set the id in the request parameters

            //check if the intervention exist in the database
            if(!intreventionExist) return res.status(400).json({ message: `No Intervention has the id : ${interventionId}` });
 
             if(dataFromUser.intervention_id) {
            // check if the  id intervention updated already exist in the database 
            const VerifyInterventionExist =  await Intervention.findOne({
                                                                where : { intervention_id : dataFromUser.intervention_id }
                                                               });
            // check if the id intervention updated already exist in the database and not equal to the id of the intervention we are updating
            if( ( VerifyInterventionExist && dataFromUser.intervention_id != interventionId ) ) return res.status(400).json({message : "Intervention demande déja exists"});
             }

             if(etat)
             {
            // upadate the intervention in the database
            const UpdateIntervention = await Intervention.update(dataFromUser , { 
                                                                              where : { intervention_id : interventionId } ,
                                                                                });

            let IntereventionUpdated // variable to store the updated intervention

            //check if intervention demande is updated in the database
            if(dataFromUser.intervention_id) { 
                IntereventionUpdated = await Intervention.findOne({
                    where     : { intervention_id : dataFromUser.intervention_id },
                    attributes: { exclude: ['updatedAt'] } ,
                    include   : {
                        model     : Section,
                        attributes: ['name'] // <-- optionnel : liste des attributs à retourner
                          }
                                                                  });
            }else{
             IntereventionUpdated = await Intervention.findOne({
                where     : { intervention_id : interventionId },
                attributes: { exclude: ['updatedAt'] } ,
                include   : {
                    model: Section,
                    attributes: ['name'] // <-- optionnel : liste des attributs à retourner
                      }
                                                                });
            }                                                     
            if(UpdateIntervention) return res.status(200).json({Success : `Intervention ${interventionId}  a été Modifier` , UpdateIntervention , IntereventionUpdated});
        }else {
            return res.status(200).json('');
        }
    }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

    async deleteInterventionById(req , res) {
        try {
            // Check if the Interevention exist and valid.
            const interventionId = req.params.id_Intervention;

            if(interventionId && isNaN(Number(interventionId)))
                return res.status(400).json({ message: "Intervention id not valid!" });
            if(interventionId){

            // Get the Interevention from the database.
            const intervention = await Intervention.findOne({ 
                                                             where: { intervention_id: interventionId } 
                                                            });

            // If the Interevention not exist.
            if(!intervention) return res.status(400).json({ message: `No Intervention has the id : ${interventionId}` });

            // Delete the Interevention from the database.
            await Intervention.destroy({ where: { intervention_id: interventionId } });

            // Return success message
            return res.json({ Success: `Intervention with id : ${interventionId} deleted successfully!` });

            }

        }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

    async deleteAll(req , res) {

        try {
                await Intervention.destroy({where : {validate : 1}}) ;

                return res.json({ Success: `Interventions deleted successfully!` }); 
            
        } catch (error) {
                        // handle error
            res.status(500).json({ message : error.message });
        }
    }

}


export default new InterventionService(); // export the instance of the class
