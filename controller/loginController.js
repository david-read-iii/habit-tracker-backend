const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Authenticates a user with email and password credentials.
 *
 * This function checks if a user exists with the given email, verifies the password,
 * and returns a signed JWT token if authentication is successful.
 *
 * @async
 * @function loginUser
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's plain text password.
 * @returns {Promise<string>} A signed JWT token valid for 7 days.
 * @throws {Error} If the email does not exist or the password is incorrect.
 * The error includes a status code of 400 for client-side login failures.
 */
async function loginUser({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid email or password.");
        error.status = 400;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid email or password.");
        error.status = 400;
        throw error;
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return token;
}

module.exports = { loginUser };
