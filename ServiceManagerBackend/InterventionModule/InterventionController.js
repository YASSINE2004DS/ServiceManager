import IneterventionService from './InterventionService.js';


/**
 * @class UserController
 * @brief This class serves as the controller layer for user-related HTTP requests.
 *        It delegates all user operations (CRUD) to the corresponding methods in the UserService,
 *        ensuring a clear separation between the routing logic and the business logic.
 *
 * @function getUsers    : responsible for getting all Intereventions.
 * @function createUser  : responsible for creating new Interevention.
 * @function getUserById : get a spécifique Intereventions by ID.
 * @function modifyUser  : modify a existing Intereventions by ID.
 * @function deleteUser  : delet a Intereventions by his ID.
 */
class InterventionController {
    async getInterventions(req, res) { return IneterventionService.getInterventions                  (req, res)  ;}

    async getInterventionById(req, res) { return IneterventionService.getInterventionById             (req, res)  ;}  

    async getIntereventionByUserId(req, res) { return IneterventionService.getInterventionsByIdUser   (req, res)  ;}

    async createNewIntervention(req, res) { return IneterventionService.createNewIntervention         (req, res) ;}

    async modifyIntervention(req, res) { return IneterventionService.UpdateInterventionById           (req, res) ;}
 
    async deleteIntervention(req, res) { return IneterventionService.deleteInterventionById           (req, res) ;}
}

export default new InterventionController();
// Compare this snippet from ServiceManagerBackend/InterventionModule/InterventionRouter.js: