import agencyService from './AgencyService' // import AgencyService from AgencyService file

/**
 * @class UserController
 * @brief This class serves as the controller layer for Agency-related HTTP requests.
 *        It delegates all Agency operations (CRUD) to the corresponding methods in the AgencyService,
 *        ensuring a clear separation between the routing logic and the business logic.
 *
 * @function getUsers    : Async function to handle the request and response for getting all agencies.
 * @function createUser  : Async function to handle the request and response for creating a new agency.
 * @function getUserById : Async function to handle the request and response for getting a specific agency by ID.
 * @function modifyUser  : Async function to handle the request and response for updating an existing agency by ID.
 * @function deleteUser  : Async function to handle the request and response for deleting an agency by ID.
 */

//class AgencyController is a controller class that handles the requests and responses for the Agency module
class AgencyController
{
    async getAllAgency (req , res)   { return await agencyService.getAgencies  (req , res)   ;}

    async getAgencyById (req , res)  { return await agencyService.getAgencyById (req , res)  ;}

    async createAgency (req , res)   { return await agencyService.createAgency  (req , res)    ;}

    async updateAgency (req , res)   { return await agencyService.updateAgency  (req , res)    ;} 

    async deleteAgency (req , res)    { return await agencyService.deleteAgency (req , res)    ;}
}

export default new AgencyController(); // Export an instance of the AgencyController class.