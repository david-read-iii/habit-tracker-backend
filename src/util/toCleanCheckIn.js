/**
 * Transforms a Check In Mongoose document into a plain object
 * suitable for API responses.
 *
 * @param {Object} checkIn - The Check In document from the database.
 * @returns {Object} A plain object with selected check in fields.
 */
function toCleanCheckIn(checkIn) {
    return {
        id: checkIn._id.toString(),
        habitId: checkIn.habitId,
        habitDay: checkIn.habitDay
    };
}

module.exports = { toCleanCheckIn };
