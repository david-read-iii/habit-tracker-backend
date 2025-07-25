const CheckIn = require("../model/CheckIn");
const { toCleanCheckIn } = require("../util/toCleanCheckIn");
const moment = require("moment-timezone");

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
