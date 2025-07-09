const User = require("../src/model/User");

/**
 * Updates the authenticated user's timezone.
 * 
 * This route is protected by JWT authentication and expects the user's ID 
 * to be attached to `req.user` by middleware. It checks for a valid timezone 
 * in the request body and updates the user's record. If the user is not found 
 * or the timezone is missing, it returns appropriate 4xx errors.
 * 
 * Future functionality may include resetting the user's habit streak when timezone changes.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.user - Decoded JWT payload containing the userId
 * @param {string} req.body.timezone - The new timezone to set (e.g., "America/New_York")
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response:
 *   - 200: `{ message: "Timezone updated", timezone: "..." }`
 *   - 400: `{ error: "Timezone is required" }`
 *   - 404: `{ error: "User not found" }`
 *   - 500: `{ error: "Internal server error" }`
 */
async function updateTimezone(req, res) {
    try {
        const userId = req.user.userId;
        const { timezone } = req.body;

        if (!timezone) {
            return res.status(400).json({ error: "Timezone is required" });
        }

        // TODO: Reset streaks logic would go here (once you track them). For now, just update the timezone.
        const user = await User.findByIdAndUpdate(
            userId,
            { timezone /* , streak: 0 */ },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "Timezone updated", timezone: user.timezone });
    } catch (err) {
        console.error("500 error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { updateTimezone };
