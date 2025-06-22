import statistiqueService  from "./statistiqueService.js"; 
import { Router } from "express";

class statistiqueRouter {
    constructor() {
        this.statistiqueService =  statistiqueService;
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
     this.router.get(
            '/',
            async (req, res) => {
                try {
                    return  await this.statistiqueService.getStats(req, res)

                } catch (error) {
                    console.error('Error fetching statistics:', error);
                    return res.status(500).json({ error: 'Internal Server Error' + error.message });
                }
            }
        );

    }
}

export default new statistiqueRouter().router;