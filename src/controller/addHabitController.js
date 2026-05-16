const Habit = require("../model/Habit");
const { toCleanHabit } = require("../util/toCleanHabit");

/**
 * Creates a new habit for the authenticated user.
 * 
 * @param {Object} req - Express request object
 * @param {string} req.user.userId - The authenticated user's ID (injected by JWT middleware)
 * @param {string} req.body.name - The name of the habit to create
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response:
 *   - 201: Habit created
 *   - 400: Habit name is missing
 *   - 500: Internal server error
 */
async function addHabit(req, res) {
    try {
        const userId = req.user.userId;
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Habit name is required" });
        }

        const habit = new Habit({
            userId,
            name: name.trim(),
        });

        await habit.save();

        return res.status(201).json({ message: "Habit created", habit: toCleanHabit(habit, 0) });
    } catch (err) {
        console.error("Error creating habit:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { addHabit };
