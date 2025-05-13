import { Router } from 'express'; // Required to create route handlers.

import EmailController from './EmailController.js'; // the email controller.
import AuthMiddleware from '../AuthModule/AuthMiddleware.js'; //the authentication operations.

/**
 * @class EmailRouter
 * @brief This class is responsible for the routing mechanism for the Email entity.
 *        In the init function, we add all the functions that will handle HTTP requests.
 *        These functions are defined in the EmailController class. When adding a new endpoint,
 *        the only place that needs to be modified is the body of the init function,
 *        by adding the desired new endpoint.
 *
 * @constructor :  is the start point for the class by initial the main root and call init function.
 * @function init: This function is were all endpoints are defined.
 */

class EmailRouter {
    constructor() {
        this.router = Router(); // Initialize the Express router
        this.init(); // Setup routes
    }

    init() {
        // Define POST route for creating new email
        this.router.post    (
                                '/',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return EmailController.createEmail(req, res);}
                            );

        // Define GET route for fetching all emails by userid
        this.router.get     (
                                '/:userid/source',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return EmailController.getEmailsBySourceUserId (req, res);}
                            );

        // Define GET route for fetching all emails by userid
        this.router.get     (
                                '/:userid/destination',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return EmailController.getEmailsByDestinationUserId (req, res);}
                            );

        // Define GET route for fetching email by id
        this.router.get     (
                                '/:id',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return EmailController.getEmailById(req, res);}
                            );

        // Define POST route for make a email as read
        this.router.post    (
                                '/:id/read',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return EmailController.readEmail(req, res);  }
                            );
    }
}

// Export only the router instance, not the class itself
export default new EmailRouter().router;
