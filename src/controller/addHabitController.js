const Habit = require("../model/Habit");

/**
 * Creates a new habit for the authenticated user.
 * 
 * Expects a valid JWT-authenticated request (with `req.user.userId`) and a `name` in the request body.
 * 
 * @param {Object} req - Express request object
 * @param {string} req.user.userId - The authenticated user's ID (injected by JWT middleware)
 * @param {string} req.body.name - The name of the habit to create
 * 
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response:
 *   - 201: `{ message: "Habit created", habit: <habitObject> }`
 *   - 400: `{ error: "Habit name is required" }` if name is missing
 *   - 500: `{ error: "Internal server error" }` on failure
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

        const cleanHabit = {
            id: habit._id.toString(),
            name: habit.name,
            streak: habit.streak,
            createdAt: habit.createdAt,
        };

        return res.status(201).json({ message: "Habit created", habit: cleanHabit });
    } catch (err) {
        console.error("Error creating habit:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { addHabit };
