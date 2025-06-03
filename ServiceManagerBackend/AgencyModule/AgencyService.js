import Models from '../DatabaseModule/ModelAssociations.js'; // import Models
import validateDataAgency from './AgencyValidator.js';       // import the variables for validate data from user 
const { VerifyDataAgencyCreating , VerifyDataAgencyupdating } = validateDataAgency ; 
const {  Agency } = Models ;                                 // import  Model agency from Models variable

class AgencyService {

    async getAgencies(req , res) {
        try {

            // Get all Agencies from the database.
            const agencies = await Agency.findAll();

            //return the Agencies informations
            res.json(agencies);
        } catch (error) {
            // handle error
            res.status(500).json({ Error : error.message });
        }
    }

 
    async getAgencyById(req , res) {
        try {
            // Check if the Agence exist and valid.
            const agencyId = req.params.id;

            if(isNaN(Number(agencyId)))
                return res.status(400).json({ Error: "Agency id not valid!" });

            // Get the Agence from the database.
            const agency = await Agency.findOne({ 
                                                    where: { agency_id: agencyId } 
                                                });

            // If the Agence not exist.
            if(!agency) return res.status(400).json({ Error: `No agency has the id : ${agencyId}` });

            // Return the Agence informations
            return res.json(agency);
        }

        catch (error) {
            // handle error
            res.status(500).json({ Error : error.message });
        }
    }
    
    
    async createAgency(req , res) {
       
        // validate the data
        const { error } = VerifyDataAgencyCreating.validate(req.body); 

                let etat ;

         if(req.query.etat)
         {
            etat = req.query.etat.toLowerCase()==='true' ? 1 : 0 ; // convert etat to 1 or 0
         }
         else 
            etat = 1 ;

        // check if the data is valid
        if (error) return res.status(400).json({ message : error.details[0].message });

        // find Agency by name
        const findAgency = await Agency.findOne({ 
                                                   where: { name: req.body.name } 
                                                });

         // verify exist Agency
        if (findAgency)   return res.status(400).json({ message : 'Agency already exists' });             
 
        try {
             if(etat) {

            Agency.update({
                current: 0 // set all agencies to not current
            }, {
                where: {} // update all records
            });

            // Created the new Agency
            const agency = await Agency.create({    
                name           : req.body.name,
                address        : req.body.address,
                start_time     : req.body.start_time,
                end_time       : req.body.end_time,
                current        : 1                  // 1 => current Agency 
            });

            // return Success response
            res.status(201).json({ Success: 'Agency created successfully', agency });

            }else {
                return res.status(201).json('');
            }

        } catch (error) {

            res.status(500).json({ Error : error.message });
        }
    }


    // handler to update the current agency
    /**
     * Update the current agency.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} - Returns a success message if the agency is updated successfully.
     * @throws {Object} - Returns an error message if there is an error during the update process.
     * @description This function updates the current agency by setting all agencies to not current and then setting the specified agency as current.
     */
    
    async updateAgencyCourant (req , res) {

        const Id_agency = req.params.id;
        try {
            // Set all agencies to not current
            await Agency.update({
                current: 0 // set all agencies to not current
            }, {
                where: {} // update all records
            });

            await Agency.update({
                current: 1 // set all agencies to not current
            }, {
                where: {agency_id : Id_agency} // update all records
            });
          
            // Return success response
            return res.status(200).json({ Success: 'Agency modifié avec succées' });
        } catch (error) {
            // handle error
            return res.status(500).json({ message: error.message });
        }
    }

    async UpdateAgency(req , res) {
        // validate the data
        const { error } = VerifyDataAgencyupdating.validate(req.body); 
        let etat ;

         if(req.query.etat)
         {
            etat = req.query.etat.toLowerCase()==='true' ? 1 : 0 ; // convert etat to 1 or 0
         }
         else 
            etat = 1 ;

        // check if the data is valid
        if (error) return res.status(400).json({ message: error.details[0].message });

        //retrieve agency id from parameter
        const agencyId = req.params.id;

        // check if the agency id is valid
        if(isNaN(Number(agencyId)))  return res.status(400).json({ Error: "Agency id not valid!" });
           
        // check if the agency exist by id
        const AgencyExist = await Agency.findOne({ 
                                                    where: { agency_id: agencyId } 
                                                 });

         // verify exist Agency
        if (!AgencyExist)   return res.status(400).json({ Error: 'Agency not found' });
            
        try {

            // check if the agency name is provided
          if(req.body.name) {
            // check if the agency name already exist
            const findAgency = await Agency.findOne({ 
                                                      where: { name: req.body.name } 
                                                    });

             // if the agency name already exist and not the same as the current agency
            if(findAgency && findAgency.agency_id !== parseInt(agencyId) ) return res.status(400).json({ Error: 'Agency already exists'});
          }

           if(etat) {
          // update the agency
            const agency = await Agency.update({
                name            : req.body.name,
                address         : req.body.address,
                start_time      : req.body.start_time,
                end_time        : req.body.end_time,
                current         : req.body.current
            }, { 
                where: { agency_id: agencyId }
                                               });
           const agencyupdated = await Agency.findOne({
                                                where: { agency_id: agencyId },
                                                attributes: { exclude: ['createdAt', 'updatedAt'] }
                                             });                               

            // return Success response
            res.status(200).json({ Success: 'Agency updated successfully', agency , agencyupdated });

            }else {

                return res.status(200).json('');
            }
        } catch (error) {
            // handle error
            res.status(500).json({ Error : error.message });
        }
    }


    async deleteAgency(req , res){

        //retrieve agency id from parameter
        const agencyId = req.params.id ;

        // check if the agency id is valid
        if(isNaN(Number(agencyId)))  return res.status(400).json({ Error: "Agency id not valid!" });

        try{
            // check if the agency exist by id
            const findAgency = await Agency.findOne({
                                                       where : { agency_id : agencyId } 
                                                    });

            // verify exist Agency
            if(!findAgency) return res.status(400).json({Error : "Agency not Found !"});

           // delete the agency
            findAgency.destroy();

            // return Success response
             return res.json({message : "Agency deleted successfully"});

        }catch(error){
            // handle error
            res.status(500).json({ Error : error.message });
        }
    }
}// end class

export default new AgencyService();
// The code defines a class AgencyService that provides methods to manage agencies in a database.