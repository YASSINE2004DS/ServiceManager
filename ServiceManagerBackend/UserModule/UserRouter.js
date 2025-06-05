import { Router } from 'express'; // Required to create route handlers.

import UserController from './UserController.js'; // the user controller.
import AuthMiddleware from '../AuthModule/AuthMiddleware.js'; //the authentication operations.


/**
 * @class UserRouter
 * @brief This class is responsible for the routing mechanism for the User entity.
 *        In the init function, we add all the functions that will handle HTTP requests.
 *        These functions are defined in the UserController class. When adding a new endpoint,
 *        the only place that needs to be modified is the body of the init function,
 *        by adding the desired new endpoint.
 *
 * @constructor :  is the start point for the class by initial the main root and call init function.
 * @function init: This function is were all endpoints are defined.
 */

class UserRouter {
    constructor() {
        this.router = Router(); // Initialize the Express router
        this.init(); // Setup routes
    }

    init()
    {

        // Define GET route for fetching users
        this.router.get     (
                                '/',
                                AuthMiddleware.authenticate,
                                AuthMiddleware.authorizeAdminOnly,
                                async (req, res) => { return UserController.getUsers(req, res);    }
                            );

        // Define POST  route for create new user
        this.router.post    (
                                '/',
                                async (req, res) => { return UserController.createUser(req, res);  }
                            );

        // Define GET route for fetching all inactive users
        this.router.get     (
                                '/inactive',
                                AuthMiddleware.authenticate,
                                AuthMiddleware.authorizeAdminOnly,
                                async (req, res) => { return UserController.geInActivetUsers(req, res); }
                            );

        // Define POST route for make user active
        this.router.post    (
                                '/active/:id',
                                AuthMiddleware.authenticate,
                                AuthMiddleware.authorizeAdminOnly,
                                async (req, res) => { return UserController.makeUserActive(req, res);   }
                            );

        // Define POST route for login
        this.router.post    (
                                '/login',
                                async (req, res) => { return UserController.login(req, res);       }
                            );

        // Define GET route for fetching user profil
        this.router.get     (
                                '/me',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return UserController.getProfil(req, res);   }
                            );

        // Define POST route for logout
        this.router.post    (
                                '/logout',
                                AuthMiddleware.authenticate,
                                async (req, res) => { return UserController.logout(req, res);      }
                            );

        // Define GET route for fetching user by id
        this.router.get     (
                                '/:id',
                                AuthMiddleware.authenticate,
                                AuthMiddleware.authorizeAdminOnly,
                                async (req, res) => {return UserController.getUserById(req, res);  }
                            );

        // Define PUT route to modify a user by id
        this.router.patch   (
                                '/:id',
                                AuthMiddleware.authenticate,
                                AuthMiddleware.authorizeAdminOnly,
                                async (req, res) => { return UserController.modifyUser(req, res);  }
                            );

        // Define DELETE route for deleting a user by id
        this.router.delete  (
                                '/:id',
                                AuthMiddleware.authenticate,
                                AuthMiddleware.authorizeAdminOnly,
                                async (req, res) => { return UserController.deleteUser(req, res);  }
                            );
        


        

    }
}

// Export only the router instance, not the class itself
export default new UserRouter().router;