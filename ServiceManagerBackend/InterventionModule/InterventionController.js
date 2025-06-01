import IneterventionService from './InterventionService.js';




/**
 * @class InterventionController
 * @brief This class serves as the controller layer for Intervention-related HTTP requests.
 *        It delegates all Interevention operations (CRUD) to the corresponding methods in the InterventionService,
 *        ensuring a clear separation between the routing logic and the business logic.
 *
 * @function getInterventions        : responsible for getting all Intereventions.
 * @function createNewInterevention  : responsible for creating new Interevention.
 * @function getInterventionById     : get a spécifique Intereventions by ID.
 * @function modifyIntervention      : modify a existing Intereventions by ID.
 * @function deleteIntervention      : delet a Intereventions by his ID.
 */
class InterventionController {
    async getInterventions         (req, res) { return IneterventionService.getInterventions           (req, res) ;}

    async getInterventionById      (req, res) { return IneterventionService.getInterventionById        (req, res) ;}  

    async getIntereventionByUserId (req, res) { return IneterventionService.getInterventionsByIdUser   (req, res) ;}

    async createNewIntervention    (req, res) { return IneterventionService.createNewIntervention      (req, res) ;}

    async modifyIntervention       (req, res) { return IneterventionService.UpdateInterventionById     (req, res) ;}
 
    async deleteInterventionById   (req, res) { return IneterventionService.deleteInterventionById     (req, res) ;}

    async deleteInterventions      (req, res) { return IneterventionService.deleteAll                  (req, res) ;}
}

export default new InterventionController();
// Compare this snippet from ServiceManagerBackend/InterventionModule/InterventionRouter.js: