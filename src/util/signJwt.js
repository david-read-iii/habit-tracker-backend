const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) for the given user. The token includes 
 * the user's ID and timezone and is signed using the server's secret. It
 * expires in 7 days.
 *
 * @param {Object} user - The user object
 * @param {string} user._id - The user's unique id
 * @param {string} user.timezone - The user's timezone
 * @returns {string} A signed JWT
 */
function signJwt(user) {
    return jwt.sign(
        { userId: user._id, timezone: user.timezone },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

module.exports = { signJwt };
