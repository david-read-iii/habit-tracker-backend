const Habit = require("../model/Habit");
const { toCleanHabit } = require("../util/toCleanHabit");

/**
 * Edits the name of an existing habit for the authenticated user.
 *
 * Expects:
 * - req.user.userId: the ID of the authenticated user (from middleware).
 * - req.params.id: the ID of the habit to edit.
 * - req.body.name: the new name for the habit.
 *
 * Returns:
 * - 200 OK with updated habit if successful.
 * - 400 Bad Request if the name is missing or empty.
 * - 404 Not Found if the habit does not exist for the user.
 * - 500 Internal Server Error for other issues.
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
