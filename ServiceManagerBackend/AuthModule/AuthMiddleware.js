import AuthService from "./AuthService.js";

/**
 * @class AuthMiddleware
 * @brief This class serves as the middleware layer for authentication-related operations.
 *        Middleware class for handling authentication-related operations.
 *        Provides methods for token verification, generation, and decoding.
 */
class AuthMiddleware{

    // Middleware used to verify if the user is authenticated before accessing the protected routes.
    async authenticate(req, res, next) { return AuthService.authenticate      (req, res, next); }

    // Middleware used to generate a token (jwt) for the user.
    async generateToken(user)          { return AuthService.generateToken     (user);           }

    // Middleware used to decode a token (jwt) for the user.
    async decodeToken(token)           { return AuthService.decodeToken       (token);          }

    // Middleware used to authorize a admin Operations.
    async authorizeAdminOnly    (req, res, next)   { return AuthService.authorizeAdminOnly         (req, res, next); }

    
    // Middleware used to authorize  navigate pages and operations a user and admin . 
    async authorizeUserAndAdmin (req, res, next)   { return AuthService.authorizeUserAndAdmin   (req, res, next); }
}

export default new AuthMiddleware();