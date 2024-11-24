import jwt from "jsonwebtoken";
import 'dotenv/config';

const jwtSecret = process.env.JWT_KEY;

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('No token provided');
    }
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    })
}
export default authenticateToken;