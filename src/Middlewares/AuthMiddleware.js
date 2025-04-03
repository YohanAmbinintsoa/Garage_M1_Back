const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ error: "Accès refusé, aucun token fourni !" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; 
        next();
    } catch (err) {
        res.status(401).json({ error: "Token invalide !" });
    }
};

// Middleware to check user role
const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.state < requiredRole) {
            return res.status(403).json({ error: "Accès refusé, privilèges insuffisants !" });
        }
        next();
    };
};

module.exports = { verifyToken, verifyRole };
