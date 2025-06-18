import  ComposnantController   from './ComposantController.js'
import { Router } from 'express';



class ComposantRouter {

    constructor() {
        this.composantController = new ComposnantController();
        this.router = Router();
        this.init();
    }

     init () {

         this.router.get(  '/' ,
                            async (req, res) => {
                              await  this.composantController.getAllComposant(req , res);
                            }                            
                         );

         this.router.get(  '/Id/:id' ,
                            async (req, res) => {
                              await  this.composantController.getComposantById(req , res);
                            }                            
                        );    
                        
         this.router.get(  '/categorie/:categorie' ,
                            async (req, res) => {
                              await  this.composantController.getComposantByCategorie(req , res);
                            }                            
                        );
                        
         this.router.post(  '/' ,
                            async (req, res) => {
                              await  this.composantController.createComposant(req , res);
                            }                            
                        );
 
         this.router.patch(  '/:id' ,
                            async (req, res) => {
                              await  this.composantController.updateComposant(req , res);
                            }                            
                        ); 
                        
         this.router.delete(  '/:id' ,
                            async (req, res) => {
                              await  this.composantController.deleteComposant(req , res);
                            }                            
                        );                          
     }

}

export default new ComposantRouter().router;
// Exporting the router instance to be used in the main application file