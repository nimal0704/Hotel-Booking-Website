// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // 1. Get the token from the request header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    // The header format is "Bearer TOKEN"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Access denied. Token is missing.' });
    }

    try {
        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user info to the request object
        req.user = decoded;

        // 4. Call next() to pass control to the next middleware or route handler
        next();
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
}

module.exports = authMiddleware;