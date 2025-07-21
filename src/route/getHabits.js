const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { getHabits } = require("../controller/getHabitsController");

/**
 * @swagger
 * /api/habits:
 *   get:
 *     summary: Get paginated user habits
 *     tags:
 *       - Habits
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: Page number (must be >= 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: Number of habits per page (must be >= 1)
 *     responses:
 *       200:
 *         description: List of habits with optional next page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 habits:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Habit"
 *                 nextPage:
 *                   type: integer
 *                   nullable: true
 *                   description: Next page number if more results exist, else null
 *                   example: 2
 *               required: ["habits", "nextPage"]
 *       400:
 *         description: Bad request – invalid query parameters or page out of range
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               InvalidQueryParams:
 *                 summary: Invalid query parameters
 *                 value:
 *                   error: "Page or limit are invalid. Both must be integers greater than 0."
 *               PageOutOfRange:
 *                 summary: Page out of range
 *                 value:
 *                   error: "Page 2 exceeds the total number of available pages 1."
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.get("/", authenticateToken, getHabits);

module.exports = router;
