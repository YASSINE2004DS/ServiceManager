import Models from '../DatabaseModule/ModelAssociations.js'; // import Models


// import the models from the database; 
const { Section } = Models ; 

class SectionService {

    async getSections(req , res) {
        try {
            // Get all Agencies from the database.
            const sections = await Section.findAll();

            //return the Agencies informations
            res.status(200).json(sections);
        } catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

    async getSectionById(req , res) {
        try {
            // Check if the Interevention exist and valid.
            const sectionId = req.params.id_Section;

            if(isNaN(Number(sectionId)))
                return res.status(400).json({ message: "Section id not valid!" });

            // Get the Interevention from the database.
            const section = await Section.findOne({ 
                                                    where: { section_id: sectionId } 
                                                });

            // If the Interevention not exist.
            if(!section) return res.status(400).json({ message: `No Section has the id : ${sectionId}` });

            // Return the Interevention informations
            return res.json(section);
        }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

    async createNewSection(req , res){

        try {
            //retreive the data from the request body
            const dataFromUser = req.body ;
            const etat =  req.query.etat==='true' ? 1 : 0  || 0 ; 

            //Get the interevention from the database
            const VerifySectionExist =  await Section.findOne({
                                                                where : { name : dataFromUser.name }
                                                               });
            //check the interevention exist in the database
            if(VerifySectionExist) return res.status(400).json({message : "Section déja exists"});

            //Create the new interevention in the database
            if( etat) {
            const CreateNewSection = await Section.create({ 
                name                 : dataFromUser.name
            });
 
  
             //check if the interevention is created in the database
            if(CreateNewSection) return res.status(201).json({Success : `Section ${dataFromUser.name} est été  ajouter` , Section : CreateNewSection});
          
            }
            else {
                return res.status(200).json('');
            }
            } catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

    async UpdateSectionById(req , res){
        try{
            // retrieve the id from the request parameters
            const sectionId = req.params.id_Section ; // get the id from the request parameters
            const etat =  req.query.etat==='true' ? 1 : 0  || 0 ; 

            //retrieve the data from the request body
            const dataFromUser = req.body ;

            // Check if the id is valid 
            if(isNaN(Number(sectionId))) return res.status(400).json({ message: "Section id not valid!" });
            
           // retreive the section from the database
            const sectionExist = await Section.findOne({ 
                                                                where: { section_id: sectionId } 
                                                });

            //check if the section exist in the database
            if(!sectionExist) return res.status(400).json({ message: `No Section has the id : ${sectionId}` });
 
             if(dataFromUser.name) {
            // check if the  name updated already exist in the database 
            const VerifySectionExist =  await Section.findOne({
                                                                where : { name : dataFromUser.name }
                                                               });
            // check if the name updated already exist in the database and not equal to the id of the section we are updating
            if( ( VerifySectionExist && VerifySectionExist.section_id != sectionId ) ) return res.status(400).json({message : "Section already exists"});
             }

            if(etat)
            {
            // upadate the section in the database
            const UpdateSection = await Section.update(dataFromUser , { where : { section_id : sectionId } });

            let SectionUpdated // variable to store the updated section

            //check if section is updated in the database
            if(dataFromUser.name) { 
                SectionUpdated = await Section.findOne({
                    where     : { name : dataFromUser.name },
                    attributes: { exclude: ['updatedAt'] }
                                                                  });
            }else{
             SectionUpdated = await Section.findOne({
                where     : { section_id : sectionId },
                attributes: { exclude: ['updatedAt'] }
                                                                });
            }                                                     
            if(UpdateSection) return res.status(200).json({Success : "Section a été modifier" , UpdateSection , SectionUpdated});
          }else {
            return res.status(200).json('');
          }
        }catch (error) {    
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

    async deleteSectionById(req , res) {
        try {
            // Check if the Interevention exist and valid.
            const sectionId = req.params.id_Section;
            const etat =  req.query.etat==='true' ? 1 : 0  || 0 ; 

            if(isNaN(Number(sectionId)))
                return res.status(400).json({ message: "Section id not valid!" });

            // Get the Interevention from the database.
            const section = await Section.findOne({ 
                                                    where: { section_id: sectionId } 
                                                });

            // If the Interevention not exist.
            if(!section) return res.status(400).json({ message: `No Section has the id : ${sectionId}` });

             if(etat) {

             // Delete the Interevention from the database.
            await Section.destroy({ where: { section_id: sectionId } });
            // Return success message
            return res.status(200).json({ Success: `Section  ${section.name} a été supprimer!` });

             }else

               return res.status(200).json('');
            
        }catch (error) {
            // handle error
            res.status(500).json({ message : error.message });
        }
    }

}

export default new SectionService(); // export the instance of the class