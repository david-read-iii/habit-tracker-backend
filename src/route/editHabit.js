const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { editHabit } = require("../controller/editHabitController");

/**
 * @swagger
 * /api/habit/{id}:
 *   patch:
 *     summary: Update an existing habit for the authenticated user
 *     description: Authenticated route to update the name of a specific habit.
 *     tags:
 *       - Habits
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the habit to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the habit
 *                 example: "Workout"
 *     responses:
 *       200:
 *         description: Habit successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Habit updated
 *                 habit:
 *                   $ref: "#/components/schemas/Habit"
 *               required: ["message", "habit"]
 *       400:
 *         description: Bad request - missing or invalid habit name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               error: "Habit name is required"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       404:
 *         description: Not found - Habit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               error: "Habit not found"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.patch("/:id", authenticateToken, editHabit);

module.exports = router;
