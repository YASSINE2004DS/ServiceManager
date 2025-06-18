import ExportationController from './ExportationController.js';
import { Router } from 'express';


class ExportationRouter {
    constructor() {
        this.router = Router();
        this.exportationController = new ExportationController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/Exportation/:id_entreprise', 
                         (req, res) => 
                            this.exportationController.getAllExportations(req, res)
                        );

        this.router.get(
                          '/:exportationId', 
                          (req, res) => 
                             this.exportationController.getExportationById(req, res)
                        );

        this.router.get('/entreprise/:entrepriseName', 
                         (req, res) => 
                              this.exportationController.getExportationByEntrepriseName(req, res)
                        );

        this.router.patch('/:id', 
                         (req, res) => 
                            this.exportationController.UpdateExportationById(req, res)
                        );

        this.router.delete(
                            '/:id', 
                             (req, res) => 
                                this.exportationController.deleteExportationById(req, res)
                         );
    }
}
export default new ExportationRouter().router;
// ExportationRouter.js