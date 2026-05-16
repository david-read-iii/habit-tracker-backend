const CheckIn = require("../model/CheckIn");
const { toCleanCheckIn } = require("../util/toCleanCheckIn");
const moment = require("moment-timezone");

/**
 * Adds a new check in for the authenticated user.
 * 
 * @param {Object} req - Express request object
 * @param {string} req.user.userId - The authenticated user's ID (injected by JWT middleware)
 * @param {string} req.user.timezone - The authenticated user's timezone (injected by JWT middleware)
 * @param {string} req.body.habitId - The id associated with the habit for which to create a check in for
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response:
 *   - 201: Check in created
 *   - 400: Habit id missing or already checked in for today
 *   - 500: Internal server error
 */
async function addCheckIn(req, res) {
    try {
        const { userId, timezone } = req.user;
        const { habitId } = req.body;

        if (!habitId) {
            return res.status(400).json({ error: "habitId is required" });
        }

        // Get current time in user's timezone
        const now = moment().tz(timezone);

        // Calculate habitDay as YYYY-MM-DD
        const habitDay = now.format("YYYY-MM-DD");

        // Check for existing check in for this day
        const existingCheckIn = await CheckIn.findOne({ userId, habitId, habitDay });
        if (existingCheckIn) {
            return res.status(400).json({ error: "Already checked in for today" });
        }

        // Create new check in
        const checkIn = await CheckIn.create({
            userId,
            habitId,
            habitDay
        });

        return res.status(201).json({ message: "Check in created", checkIn: toCleanCheckIn(checkIn) });
    } catch (err) {
        console.error("Error creating check in:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { addCheckIn };
