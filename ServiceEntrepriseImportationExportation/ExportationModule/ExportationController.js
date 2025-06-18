import ExportationService from './ExportationService.js';


class ExportationController {
    constructor() {
        this.exportationService = new ExportationService();
    }

    async getAllExportations(req, res) {
        return this.exportationService.getAllExportations(req, res);
    }

    async getExportationById(req, res) {
        return this.exportationService.getExportationById(req, res);
    }
    async getExportationByEntrepriseName(req, res) {
        return this.exportationService.getExportationByEntrepriseName(req, res);
    }
    async UpdateExportationById(req, res) {
        return this.exportationService.UpdateExportationById(req, res);
    }
    async deleteExportationById(req, res) {
        return this.exportationService.deleteExportationById(req, res);
    }

}

export default ExportationController;
// ExportationController.js