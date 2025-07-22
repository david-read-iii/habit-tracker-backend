/**
 * Transforms a Habit Mongoose document into a plain object
 * suitable for API responses.
 *
 * @param {Object} habit - The Habit document from the database.
 * @returns {Object} A plain object with selected habit fields.
 */
function toCleanHabit(habit) {
    return {
        id: habit._id.toString(),
        name: habit.name,
        streak: habit.streak,
        createdAt: habit.createdAt,
    };
}

module.exports = { toCleanHabit };
