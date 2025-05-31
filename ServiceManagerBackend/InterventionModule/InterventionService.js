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
            return res.json(intervention );
        }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }


    async getInterventionsByIdUser(req , res) {
        try {
            //reteive the id user from the request parameters    
            const userId = req.params.id;
            const page = parseInt(req.query.page) || 1; // get the page number from the query string  
            const limit =  parseInt(req.query.limit) || 1; // get the limit from the query string
            const offset = (page - 1) * limit; // calculate the offset

            if(isNaN(Number(userId)))
                return res.status(400).json({ message: "Intervention id not valid!" });

            // Get the Intreventions from the database.
            const {count , rows} = await Intervention.findAndCountAll({ 
                                                               limit: limit,
                                                               offset: offset,
                                                               where: { user_id: userId }, 
                                                               attributes: { exclude: ['updatedAt'] },
                                                               include: {
                                                                model: Section,
                                                                attributes: ['name'] // <-- optionnel : liste des attributs à retourner
                                                                  },
                                                                order: [['createdAt', 'DESC']]
                                                            });

            // If the Intervention not exist.
            // if(!rows) return res.status(400).json({ message: `No Intervention has the id : ${userId}` });

            // Return the Interevention informations
            return res.json({
                pages : Math.ceil(count / limit), // calculate the number of pages
                data  : rows, // return the data
            });
        }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
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
