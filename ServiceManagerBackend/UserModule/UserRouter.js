import { Router } from 'express'; // Required to create route handlers.

import UserController from './UserController.js'; // Import the user controller.


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

    init() {
        // Define GET route for fetching users
        this.router.get('/',  async (req, res) => {
            return UserController.getUsers(req, res);
        });

        // Define POST  route for create new user
        this.router.post('/', async (req, res) => {
            return UserController.createUser(req, res);
        })

        // Define GET route for fetching user by id
        this.router.get('/:id', async (req, res) => {
            return UserController.getUserById(req, res);
        })

        // Define put route to modify a user by id
        this.router.patch('/:id', async (req, res) => {
            return UserController.modifyUser(req, res);
        })

        // Define delete route for deleting a user by id
        this.router.delete('/:id', async (req, res) => {
            return UserController.deleteUser(req, res);
        })
    }
}

// Export only the router instance, not the class itself
export default new UserRouter().router;