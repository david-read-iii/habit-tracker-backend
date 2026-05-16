/**
 * Transforms a Habit Mongoose document into a plain object
 * suitable for API responses.
 *
 * @param {Object} habit - The Habit document from the database.
 * @param {Number} streak - Streak derived by summing the number of Check In entries associated with this Habit.
 * @returns {Object} A plain object with selected habit fields.
 */
function toCleanHabit(habit, streak) {
    return {
        id: habit._id.toString(),
        name: habit.name,
        createdAt: habit.createdAt,
        streak: streak
    };
}

module.exports = { toCleanHabit };
