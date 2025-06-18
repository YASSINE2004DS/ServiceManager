import   PrepareFactureService     from   './PreparePdfService.js'
import   Router                    from   'express'


class PrepareFactureRouter {
    constructor()
    {
        this.factureService =  new PrepareFactureService();
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/:exportationId' ,
                         (req , res)=>
                         this.factureService.PrepareFactureExportation(req , res)
                        );
    }
}

export default new PrepareFactureRouter().router ;