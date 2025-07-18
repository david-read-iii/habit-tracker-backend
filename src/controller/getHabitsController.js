const Habit = require("../model/Habit");

/**
 * Retrieves a paginated list of habits for the authenticated user.
 * 
 * Query Parameters:
 * - page (number): The current page number (must be > 0).
 * - limit (number): The number of habits per page (must be > 0).
 * 
 * Response:
 * - 200: Returns an array of habits and the next page number (or null if none).
 * - 400: If page or limit are invalid, or if the requested page exceeds available pages.
 * - 500: On server error.
 * 
 * @param {import("express").Request} req - Express request object (expects `req.user.userId`)
 * @param {import("express").Response} res - Express response object
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
        const hasNextPage = page * limit < total;
        const nextPage = hasNextPage ? page + 1 : null;

        res.status(200).json({ habits, nextPage });
    } catch (error) {
        console.error("Error fetching habits:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getHabits };
