import ComposantService                from './ComposantService.js';


class ComposantController {
    constructor() {
        this.composantService = new ComposantService();
    }

    async getAllComposant(req, res) {
        return await this.composantService.getAllComposant(req, res);
    }

    async getComposantById(req, res) {
        return await this.composantService.getComposantById(req, res);
    }

    async getComposantByCategorie(req, res) {
        return await this.composantService.getComposantByCategorie(req, res);
    }

    async createComposant(req, res) {
        return await this.composantService.createComposant(req, res);
    }

    async updateComposant(req, res) {
        return await this.composantService.updateComposant(req, res);
    }

    async deleteComposant(req, res) {
        return await this.composantService.deleteComposant(req, res);
    }
}

export default  ComposantController;