import jwt from 'jsonwebtoken'

class AuthService{

    async authenticate(req, res, next){

        // Get the token from the request header.
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        // If the token does not exist.
        if(!token) return res.status(403).json({ message: "Token is required!" });

        // Check the token.
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

            // If the token is not valid.
            if(err) return res.status(401).json({ message: "Token is not valid!" });

            // Add the user information to the request object.
            req.user = decoded;

            // The next middlware!.
            next();
        });
    }

    async generateToken(user){
        // Generate the jwt token.
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '7d' });
        return token;
    }

    async decodeToken(token){
        // Decode the token process.
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
}


export default new AuthService();