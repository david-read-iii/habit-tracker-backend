const Habit = require("../model/Habit");
const { toCleanHabit } = require("../util/toCleanHabit");

/**
 * Edits the name of an existing habit for the authenticated user.
 * 
 * @param {Object} req - Express request object.
 * @param {string} req.user.userId - The ID of the authenticated user.
 * @param {string} req.params.id - The ID of the habit to edit.
 * @param {string} req.body.name - New name for the habit. 
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response:
 *   - 200: Habit updated.
 *   - 400: Invalid habit name provided.
 *   - 404: Habit not found in database.
 *   - 500: Internal server error.
 */
async function editHabit(req, res) {
    try {
        const userId = req.user.userId;
        const { id } = req.params; // habit id
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Habit name is required" });
        }

        const habit = await Habit.findOne({ _id: id, userId });

        if (!habit) {
            return res.status(404).json({ error: "Habit not found" });
        }

        habit.name = name.trim();
        await habit.save();

        return res.status(200).json({ message: "Habit updated", habit: toCleanHabit(habit) });
    } catch (err) {
        console.error("Error updating habit:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { editHabit };
