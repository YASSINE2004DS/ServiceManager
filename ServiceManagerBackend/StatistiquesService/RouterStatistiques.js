import { Router } from 'express'; // Required to create route handlers.
import StatistiquesService from './ServiceStatistiques.js'; // the statistics service.

class StatistiquesRouter {
    constructor() {
        this.router = Router(); // Initialize the Express router
        this.init(); // Setup routes
    }

    init() {
        // Define GET route for fetching statistics
        this.router.get(
            '/',
            async (req, res) => {
                try {
                    return  await StatistiquesService.getStats(req, res)

                } catch (error) {
                    console.error('Error fetching statistics:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        );
    }
}

// Export the router instance
export default new StatistiquesRouter().router;