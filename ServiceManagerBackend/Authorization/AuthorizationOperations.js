// file for authorization operations using JWT tokens
// autorization (admin and user) and admin only

import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for token verification
import dotenv from 'dotenv'; // Import dotenv for environment variable management
dotenv.config(); // Load environment variables from .env file

const verifyTokenExist = (req , res , next) => {

    try {
        // Get the token from the request headers
        const token = req.headers.token; // Extract the token from the 'Authorization' header

        if (!token) return res.status(401).json({ Error: "Authorization refusé" });   // If no token is provided, return an error

        // Verify the token using JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);                    // Decode the token using the secret key

        if (!decoded) return res.status(401).json({ Error: "Authorization refusé" }); // If the token is invalid, return an error

        req.user = decoded;                                                           // Attach the decoded user information to the request object
        next();                                                                       // Call the next middleware or route handler
    } catch (error) {
        res.status(500).json({ Error: error.message });                              // Handle any errors that occur during verification
    }
}

// Middleware to check if the user is an Admin or the owner of the resource
const AuthorizationAdminAndUser = (req, res, next) => {
    verifyTokenExist(req, res, () => {
        const user = req.user ;

        if(user.role !== "Admin" && req.params.id !== user.id)
            res.status(401).json("Acces denied");

        next();
    });
};


// Middleware to check if the user is an Admin only
// This middleware is used to restrict access to certain routes to only Admin users
const AuthorizationJustAdmin = (req, res, next) => {
    verifyTokenExist(req, res, () => {
        const user = req.user ;

        if(user.role !== "Admin")
            res.status(401).json("Acces denied");

        next();
    });
};

export default {
    AuthorizationAdminAndUser,
    AuthorizationJustAdmin,
    verifyTokenExist
}