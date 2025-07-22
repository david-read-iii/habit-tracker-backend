const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate requests using a JWT (JSON Web Token).
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 * @returns {Object} JSON Response:
 *   - 401: Missing token.
 *   - 403: Invalid or expired token.
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
