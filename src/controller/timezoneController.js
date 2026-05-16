const User = require("../model/User");
const CheckIn = require("../model/CheckIn");

/**
 * Updates the authenticated user's timezone. All a user's streaks are deleted on timezone change to avoid 
 * complicated logic in streak calculation.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.user - Decoded JWT payload containing the userId.
 * @param {string} req.body.timezone - The new timezone to set (e.g., "America/New_York").
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response:
 *   - 200: Timezone updated successfully.
 *   - 400: Invalid timezone provided.
 *   - 404: User not found in database.
 *   - 500: Internal server error.
 */
async function updateTimezone(req, res) {
    try {
        const userId = req.user.userId;
        const { timezone } = req.body;

        if (!timezone) {
            return res.status(400).json({ error: "Timezone is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { timezone },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await CheckIn.deleteMany({ userId: userId });

        return res.status(200).json({ message: "Timezone updated", timezone: user.timezone });
    } catch (err) {
        console.error("500 error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { updateTimezone };
