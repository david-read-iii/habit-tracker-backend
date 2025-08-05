const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { signJwt } = require("../util/signJwt");

/**
 * Authenticates a user and returns a JWT if login is successful.
 * 
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's plain text password.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response:
 *   - 200: User logged in and authentication token appended in body.
 *   - 400: Invalid email or password.
 *   - 500: Internal server error.
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = signJwt(user);
        return res.status(200).json({ token });
    } catch (err) {
        console.error("500 error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { loginUser };
