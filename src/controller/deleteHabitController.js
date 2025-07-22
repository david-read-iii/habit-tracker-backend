const Habit = require("../model/Habit");

/**
 * Deletes a habit for the authenticated user.
 *
 * @async
 * @function deleteHabit
 * @param {Object} req - Express request object.
 * @param {Object} req.user - Authenticated user object.
 * @param {string} req.user.userId - The ID of the authenticated user.
 * @param {Object} req.params - URL parameters.
 * @param {string} req.params.id - The ID of the habit to delete.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 * @throws {404} Returns 404 status if no habit found.
 * @throws {500} Returns 500 status if an internal error occurs.
 */
async function deleteHabit(req, res) {
    try {
        const userId = req.user.userId;
        const { id } = req.params; // habit id

        const habit = await Habit.findOneAndDelete({ _id: id, userId });

        if (!habit) {
            return res.status(404).json({ error: "Habit not found" });
        }

        return res.status(200).json({ message: "Habit deleted" });
    } catch (err) {
        console.error("Error deleting habit:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { deleteHabit };
