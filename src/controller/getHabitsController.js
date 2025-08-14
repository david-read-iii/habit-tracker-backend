const Habit = require("../model/Habit");
const CheckIn = require("../model/CheckIn");
const { toCleanHabit } = require("../util/toCleanHabit");

/**
 * Retrieves a paginated list of habits for the authenticated user.
 * 
 * @param {Object} req - Express request object.
 * @param {string} req.user.userId - The ID of the authenticated user.
 * @param {number} req.query.page - Page number to return.
 * @param {number} req.query.limit - Number of habits to return.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response:
 *   - 200: Habits returned successfully.
 *   - 400: Page or limit query params invalid.
 *   - 500: Internal server error.
 */
async function getHabits(req, res) {
    try {
        const userId = req.user.userId;

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        if (!page || page < 1 || !limit || limit < 1) {
            return res.status(400).json({
                error: "Page or limit are invalid. Both must be integers greater than 0.",
            });
        }

        const skip = (page - 1) * limit;
        const total = await Habit.countDocuments({ userId });
        const totalPages = Math.ceil(total / limit);

        if (page > totalPages && totalPages !== 0) {
            return res.status(400).json({
                error: `Page ${page} exceeds the total number of available pages (${totalPages}).`,
            });
        }

        const habits = await Habit.find({ userId }).skip(skip).limit(limit);

        // Calculate streak for each habit
        const habitsWithStreaks = await Promise.all(
            habits.map(async (habit) => {
                // Fetch recent check-ins for this habit (last 30 days for efficiency)
                const recentCheckIns = await CheckIn
                    .find({ habitId: habit._id })
                    .sort({ habitDay: -1 }); // Newest first

                // Compute streak
                let streak = 0;
                const today = new Date();
                const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

                let expectedDate = new Date(todayStr);

                for (const checkIn of recentCheckIns) {
                    const checkInDate = new Date(checkIn.habitDay);

                    // If check-in matches expected date, streak++
                    if (checkInDate.getTime() === expectedDate.getTime()) {
                        streak++;
                        // Move to previous day
                        expectedDate.setDate(expectedDate.getDate() - 1);
                    } else {
                        // Break if a day was missed
                        break;
                    }
                }

                return toCleanHabit(habit, streak);
            })
        );

        const hasNextPage = page * limit < total;
        const nextPage = hasNextPage ? page + 1 : null;

        res.status(200).json({ habits: habitsWithStreaks, nextPage });
    } catch (error) {
        console.error("Error fetching habits:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getHabits };
