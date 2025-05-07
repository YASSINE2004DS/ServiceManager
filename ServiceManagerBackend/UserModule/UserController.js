import UserService from "./UserService.js"

/**
 * @class UserController
 * @brief This class serves as the controller layer for user-related HTTP requests.
 *        It delegates all user operations (CRUD) to the corresponding methods in the UserService,
 *        ensuring a clear separation between the routing logic and the business logic.
 *
 * @function getUsers    : responsible for getting all users.
 * @function createUser  : responsible for creating new user.
 * @function getUserById : get a spécifique user by ID.
 * @function modifyUser  : modify a existing user by ID.
 * @function deleteUser  : delet a user by his ID.
 * @function login       : login a user.
 * @function getProfil   : get the user profil.
 */
class UserController {

    async getUsers    (req, res) { return UserService.getUsers      (req, res); }

    async createUser  (req, res) { return UserService.createUser    (req, res); }

    async getUserById (req, res) { return UserService.getUserById   (req, res); }

    async modifyUser  (req, res) { return UserService.modifyUser    (req, res); }

    async deleteUser  (req, res) { return UserService.deleteUser    (req, res); }

    async login       (req, res) { return UserService.login         (req, res); }

    async getProfil   (req, res) { return UserService.getProfil     (req, res); }

    async logout      (req, res) { return UserService.logout        (req, res); }

}


export default new UserController();