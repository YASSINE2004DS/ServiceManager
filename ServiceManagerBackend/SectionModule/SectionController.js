import SectionService from './SectionService.js';


/**
 * @class SectionController
 * @brief This class serves as the controller layer for Intervention-related HTTP requests.
 *        It delegates all Sections operations (CRUD) to the corresponding methods in the SectionService,
 *        ensuring a clear separation between the routing logic and the business logic.
 *
 * @function getSections        : responsible for getting all Sections.
 * @function CreateNewSection   : responsible for creating new Section.
 * @function getSectionById     : get a spécifique Section by ID.
 * @function updateSection      : modify a existing Section by ID.
 * @function deleteSection      : delet a Section by his ID.
 */
class SectionController {
    async getSections         (req, res) { return SectionService.getSections         (req, res)  ;}

    async getSectionById      (req, res) { return SectionService.getSectionById      (req, res)  ;}  

    async CreateNewSection    (req, res) { return SectionService.createNewSection    (req, res)  ;}

    async updateSection       (req, res) { return SectionService.UpdateSectionById   (req, res)  ;}

    async deleteSection       (req, res) { return SectionService.deleteSectionById   (req, res)  ;}

}

export default new SectionController();
// Compare this snippet from ServiceManagerBackend/InterventionModule/InterventionRouter.js: