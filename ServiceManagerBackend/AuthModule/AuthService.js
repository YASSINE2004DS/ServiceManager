import jwt from 'jsonwebtoken'
import { promisify } from 'util' // to make the callback functions asynchronous

// Define the roles in the system.
const ROLES =   {
                    ADMIN : 'admin',
                    USER  : 'user'
                };


// The async version of jwt.verify
const verifyAsync = promisify(jwt.verify);


class AuthService{

    async authenticate(req, res, next){

        // Get the token from the request header.
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        // If the token does not exist.
        if(!token) return res.status(403).json({ message: "Token is required!" });

        // If the SECRET_KEY is not defined in the environment variables.
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }

        try {

            // Verify the token using the async version of jwt.verify.
            const decoded = await verifyAsync(token, process.env.SECRET_KEY);

            // Attach the decoded user information to the request object.
            req.user = decoded;

            // Continue to the next middleware.
            next();

        } catch (error) {
            // Token is invalid.
            return res.status(401).json({ message: "Token is not valid!" });
        }

    }

    async generateToken(user){

        // Check the validation of the user object.
        if(!user || !user.user_id || !user.role) throw new Error("Invalid user object");

        try {

            // Generate the jwt token.
            const token = jwt.sign  (
                                        { user_id: user.user_id, role: user.role },
                                        process.env.SECRET_KEY,
                                        { expiresIn: '7d' }
                                    );

            return token;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async decodeToken(token){
        // Decode the token process.
        const decoded = jwt.decode(token);

        // Check if the decode process failed.
        if(!decoded) throw new Error("Failed to decode the token!");

        // Return the decoded token.
        return decoded;
    }

    async authorize(req, res, next){
        // Get the user information from the request object.
        const user = req.user;
        const role = user.role;

        // If the user is not a admin.
        if(role !== ROLES.ADMIN)
            return res
                        .status(403)
                        .json({ message: "You do not have the required permissions to access this resource" });

        // Access the protected route.
        next();
    }
}


export default new AuthService();