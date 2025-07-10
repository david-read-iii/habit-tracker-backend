const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate requests using a JWT (JSON Web Token).
 *
 * Expects the token to be provided in the `Authorization` header in the format: "Bearer <token>".
 * 
 * If the token is valid, it attaches the decoded payload (e.g. userId) to `req.user`
 * and passes control to the next middleware or route handler.
 * 
 * If the token is missing or invalid, it responds with an appropriate HTTP error:
 * - 401 Unauthorized: No token was provided
 * - 403 Forbidden: Token is invalid or expired
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Callback to pass control to the next middleware
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Expecting a value like "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded { userId: ... } to the request
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = { authenticateToken };
