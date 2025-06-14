import { Router } from 'express'; // Required to create route handlers.

import AuthMiddleware from '../AuthModule/AuthMiddleware.js'; // The authentication operations.

import AgencyController from './AgencyController.js'; // Import the Agency controller.

/**
 * @class AgencyRouter 
 * @brief This class is responsible for the routing mechanism for the Agency entity.
 *        In the init function, we add all the functions that will handle HTTP requests.
 *        These functions are defined in the AgencyController class. When adding a new endpoint,
 *        the only place that needs to be modified is the body of the init function,
 *        by adding the desired new endpoint.
 *
 * @constructor :  is the starting point for the class by initializing the main router and calling the init function.
 * @function init: This function is where all endpoints are defined.
 */

class AgencyRouter {
    constructor() {
        this.router = Router(); // Initialize the Express router
        this.init(); // Setup routes
    }

    init() {
        // Define GET route for fetching all agencies
        this.router.get('/',
                           AuthMiddleware.authorizeAdminOnly , 
                           async (req, res) => {
                           return AgencyController.getAllAgency(req, res);
                        });

        // Define POST route for creating a new agency
        this.router.post('/', 
                              AuthMiddleware.authorizeAdminOnly  , 
                              async (req, res) => {
                              return AgencyController.createAgency(req, res);
                         });

        // Define GET route for fetching agency by ID
        this.router.get('/:id',  
                                AuthMiddleware.authorizeAdminOnly, 
                                async (req, res) => {
                                    if (!req.params.id) {
                                        return res.status(400).json({ error: 'ID is required' });
                                    }
                                    return AgencyController.getAgencyById(req, res);
                                });

        // Define PATCH route to modify an agency by ID
        this.router.patch('/:id', 
                                  AuthMiddleware.authorizeAdminOnly , 
                                  async (req, res) => {
                                  return AgencyController.updateAgency(req, res);
                        });

        // Define PATCH route to set the current agency
        this.router.patch('/:id/set-current', 
                          AuthMiddleware.authorizeAdminOnly , 
                          async (req, res) => {
                          return AgencyController.updateCourantAgency(req, res);
                        });

        // Define DELETE route for deleting an agency by ID
        this.router.delete('/:id', AuthMiddleware.authorizeAdminOnly , 
                                   async (req, res) => {
                                   return AgencyController.deleteAgency(req, res);
                         });
    }
};

export default new AgencyRouter().router; // Export only the router instance, not the class itself