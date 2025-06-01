import { Router }        from 'express';
import sectionController from './SectionController.js';





/**
 * @class SectionController 
 * @brief This class is responsible for the routing mechanism for the Section entity.
 *        In the init function, we add all the functions that will handle HTTP requests.
 *        These functions are defined in the SectionController class. When adding a new endpoint,
 *        the only place that needs to be modified is the body of the init function,
 *        by adding the desired new endpoint.
 *
 * @constructor :  is the start point for the class by initial the main root and call init function.
 * @function init: This function is were all endpoints are defined.
 */
class SectionController {

     // Define the constructor for the class
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        // Define GET route for fetching all Interventions
        this.router.get('/' ,  
                               async (req, res) => {
                               return sectionController.getSections(req, res);
                       }); 

        // Define POST  route for create new Intervention
        this.router.post('/', 
                               async (req, res) => {
                                return sectionController.CreateNewSection(req, res);
                       });

        // Define GET route for fetching Intervention by id
        this.router.get('/:id_Section', 
                               async (req, res) => {
                               return sectionController.getSectionById(req, res);
                        });


        // Define put route to modify a Intervention by id of a user Id
        this.router.patch('/:id_Section', 
                            async (req, res) => {
                            return sectionController.updateSection(req, res);
                        });

        // Define delete route for deleting a Intervention by id of a user Id
        this.router.delete('/:id_Section', 
                            async (req, res) => {
                            return sectionController.deleteSection(req, res);
                        });
    }
}

export default new SectionController().router; // Export only the router instance, not the class itself