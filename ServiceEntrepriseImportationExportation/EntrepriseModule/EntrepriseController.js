import EntrepriseService from './EntrepriseService.js'

class EntrepriseController {

    async getImportationEntreprises(req , res) {
        return await EntrepriseService.getAllEntrepriseImportation(req , res) ;
    }

        async getExportationEntreprises(req , res) {
        return await EntrepriseService.getAllEntrepriseExportation(req , res) ;
    }

        async getEntrepriseById(req , res) {
            return await EntrepriseService.getEntrepriseById(req , res);
    }

        async createNewEntreprise(req , res) {
            return await EntrepriseService.create(req , res);
    }

        async updateEntrepriseById(req , res) {
             return await EntrepriseService.UpdateEntreprise(req , res);
    }

            async deleteEntreprise(req , res) {
             return await EntrepriseService.deleteEntreprise(req , res);
    }
}

export default new EntrepriseController();