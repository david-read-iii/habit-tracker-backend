const bcrypt = require("bcryptjs");
const { signJwt } = require("../util/signJwt");
const User = require("../model/User");

/**
 * Handles user signup by creating a new account and returning a JWT token.
 * 
 * @param {Object} req - Express request object.
 * @param {string} req.body.email - The user's email address (must be unique).
 * @param {string} req.body.password - The user's plain text password.
 * @param {string} req.body.timezone - The user's preferred timezone (e.g., "America/New_York").
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response:
 *   - 201: Signup successful and authentication token appended to body.
 *   - 400: Email already used.
 *   - 500: Internal server error.
 */
async function signupUser(req, res) {
    try {
        // Check for existing user
        const { email, password, timezone } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            email,
            password: hashedPassword,
            timezone
        });
        await user.save();

        const token = signJwt(user);
        return res.status(201).json({ token });
    } catch (err) {
        console.error("500 error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { signupUser };
