const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

/**
 * Registers a new user in the system.
 *
 * This function checks if the provided email already exists, hashes the password,
 * saves the user to the database, and returns a signed JWT for authentication.
 *
 * @async
 * @function signupUser
 * @param {Object} params - The user signup parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's plain text password.
 * @param {string} params.timezone - The user's timezone.
 * @returns {Promise<string>} A JWT token valid for 7 days.
 * @throws {Error} If the email is already in use or another error occurs during signup.
 */
async function signupUser({ email, password, timezone }) {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error("Email already in use.");
        error.status = 400;
        throw error;
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

    // Generate JWT
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return token;
}

module.exports = { signupUser };
