import { Router } from 'express';
import intereventionController from './InterventionController.js';
import Authorization from '../Authorization/AuthorizationOperations.js'; // Import the authorization operations.
const { AuthorizationAdminAndUser, AuthorizationJustAdmin , verifyTokenExist } = Authorization; // Import the authorization operations



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
        // Define GET route for fetching all agencies
        this.router.get('/', AuthorizationJustAdmin , async (req, res) => {
            return intereventionController.getInterventions(req, res);
        });

        // Define POST  route for create new agency
        this.router.post('/', verifyTokenExist , async (req, res) => {
            return intereventionController.createNewIntervention   (req, res);
        });

        this.router.get('/:id', AuthorizationAdminAndUser , async (req, res) => {
            return intereventionController.getIntereventionByUserId (req, res);
        });

        // Define GET route for fetching agency by id
        this.router.get('/:id/:id_Intervention', AuthorizationAdminAndUser , async (req, res) => {
            return intereventionController.getInterventionById(req, res);
        });

        // Define put route to modify a agency by id
        this.router.patch('/:id/:id_Intervention', AuthorizationAdminAndUser , async (req, res) => {
            return intereventionController.modifyIntervention(req, res);
        });

        // Define delete route for deleting a agency by id
        this.router.delete('/:id/:id_Intervention', AuthorizationJustAdmin , async (req, res) => {
            return intereventionController.deleteIntervention(req, res);
        });
    }
}

export default new IntereventionController().router; // Export only the router instance, not the class itself

