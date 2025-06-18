import { Router }                from 'express';
import EntrepriseController      from './EntrepriseController.js'
import AuthMiddleware            from '../AuthModule/AuthMiddleware.js'; //the authentication operations.

class EntrepriseRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {

        this.router.get(    "/importation",
                            async (req , res) => {
                                 return await EntrepriseController.getImportationEntreprises(req , res);
                            }
                        )  

        this.router.get(    "/exportation",
                            async (req , res) => {
                               return   await EntrepriseController.getExportationEntreprises(req , res);
                            }
                        ) 
                   
        this.router.get(    "/:id",
                            AuthMiddleware.authorizeAdminOnly,
                            async (req , res) => {
                               return   await EntrepriseController.getEntrepriseById(req , res);
                            }
                       )   

        this.router.post(  "/",
                            async (req , res) => {
                               return   await EntrepriseController.createNewEntreprise(req , res);
                             }
                        ) 
                        
         this.router.patch(  "/:id",
                            async (req , res) => {
                               return   await EntrepriseController.updateEntrepriseById(req , res);
                             }
                        ) 
                        
        this.router.delete(  "/:id",
                            async (req , res) => {
                               return   await EntrepriseController.deleteEntreprise(req , res);
                             }
                        ) 
    }
}


export default new EntrepriseRouter().router ;