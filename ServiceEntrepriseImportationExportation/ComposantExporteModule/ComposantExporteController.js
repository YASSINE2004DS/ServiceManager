import   ComposantExporteService    from './ComposantExporteService.js';

class ComposantExporteController {

  constructor() {
    this.composantExporteService = new ComposantExporteService();
  }

  async getComposantsExporteByExportationId(req, res) {
    return await this.composantExporteService.getComposantsExporteByExportationId(req, res);
  }

  async getComposantsExporteForFacture(req, res) {
    return await this.composantExporteService.getComposantsExporteForFacture(req , res);
  }


  async createExportation(req, res) {
    await this.composantExporteService.createExportation(req, res);
  }

  async createComposantExporte(req, res) {
    return await this.composantExporteService.createComposantExporte(req, res);
  }

  async updateComposantExporte(req, res) {
    return await this.composantExporteService.updateComposantExporte(req, res);
  }

  async deleteComposantExporte(req, res) {
    return await this.composantExporteService.deleteComposantExporte(req, res);
  }

}

export default ComposantExporteController;
// Exporting the ComposantExporteController class to be used in the router