import { Router } from 'express';
import intereventionController from './InterventionController.js';

import AuthMiddleware from '../AuthModule/AuthMiddleware.js'; //the authentication operations.




/**
 * @class IntereventionController 
 * @brief This class is responsible for the routing mechanism for the Intrevention entity.
 *        In the init function, we add all the functions that will handle HTTP requests.
 *        These functions are defined in the IntereventionController class. When adding a new endpoint,
 *        the only place that needs to be modified is the body of the init function,
 *        by adding the desired new endpoint.
 *
 * @constructor :  is the start point for the class by initial the main root and call init function.
 * @function init: This function is were all endpoints are defined.
 */
class IntereventionController {

     // Define the constructor for the class
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        // Define GET route for fetching all Interventions
        this.router.get('/' ,  

                               async (req, res) => {
                               return intereventionController.getInterventions(req, res);
                       }); 

        // Define POST  route for create new Intervention
        this.router.post('/', 
                               AuthMiddleware.authenticate ,
                               async (req, res) => {
                                return intereventionController.createNewIntervention   (req, res);
                       });

        // Define GET route for fetching Intervention by id
        this.router.get('/:id', 
                              
                               async (req, res) => {
                               return intereventionController.getIntereventionByUserId (req, res);
                        });

        // Define GET route for fetching Interevention by id of a user Id
        this.router.get('/:id/:id_Intervention', 
                              AuthMiddleware.authorizeUserAndAdmin ,
                              async (req, res) => {
                              return intereventionController.getInterventionById(req, res);
                        });

        // Define put route to modify a Intervention by id of a user Id
        this.router.patch('/:id/:id_Intervention', 
                            AuthMiddleware.authorizeUserAndAdmin , //Authorize the user and admin to modify the intervention
                            async (req, res) => {
                            return intereventionController.modifyIntervention(req, res);
                        });

        // Define delete route for deleting a Intervention by id of a user Id
        this.router.delete('/:id/:id_Intervention', 

                            async (req, res) => {
                            return intereventionController.deleteInterventionById(req, res);
                        });

       
        // Define delete route for deleting all interventions send from user
        this.router.delete('/:id', 
            
                            async (req, res) => {
                            return intereventionController.deleteInterventions(req, res);
                        });                  
    }
}

export default new IntereventionController().router; // Export only the router instance, not the class itself

