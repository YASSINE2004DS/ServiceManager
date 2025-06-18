import   ComposantExporteController     from './ComposantExporteController.js';
import { Router }                       from 'express';


class ComposantExporteRouter {
  constructor() {
    this.composantExporteController = new ComposantExporteController();
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/:exportationId', async (req, res) => {
      await this.composantExporteController.getComposantsExporteByExportationId(req, res);
    });

    this.router.post('/exportation', async (req, res) => {
      await this.composantExporteController.createExportation(req, res);
    });

    this.router.post('/composantExporte', async (req, res) => {
      await this.composantExporteController.createComposantExporte(req, res);
    });   

    this.router.patch('/:id', async (req, res) => {
      await this.composantExporteController.updateComposantExporte(req, res);
    });

    this.router.delete('/:id', async (req, res) => {
      await this.composantExporteController.deleteComposantExporte(req, res);
    });
  }

}

export default new ComposantExporteRouter().router;
// Exporting the router instance to be used in the main application file