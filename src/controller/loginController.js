const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Authenticates a user and returns a JWT if login is successful.
 * 
 * This function:
 * - Looks up the user by email
 * - Compares the provided password with the stored hashed password
 * - Returns a signed JWT if authentication is successful
 * 
 * Expects `email` and `password` in the request body.
 * Returns appropriate error responses for invalid credentials or server errors.
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.email - The user's email address
 * @param {string} req.body.password - The user's plain text password
 * 
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response:
 *   - 200: `{ token: <JWT> }` on successful login
 *   - 400: `{ error: "Invalid email or password" }` for bad credentials
 *   - 500: `{ error: "Internal server error" }` on unexpected failure
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

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({ token });
    } catch (err) {
        console.error("500 error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { loginUser };
