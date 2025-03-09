import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../Model/User.model.js';

dotenv.config();

// Middleware to verify JWT token
export function verifyToken(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET, function (err, verifiedToken) {
            if (err) {
                return res.status(403).send({ "message": "Invalid Token" });
            }
            userModel.findById(verifiedToken.id).then((user) => {
                // You can add user details to request object if needed
                req.user = user;
                next();
            }).catch((err) => {
                res.status(500).send({ message: err.message });
            });
        });
    } else {
        res.status(404).send({ "message": "Token not present" });
    }
}