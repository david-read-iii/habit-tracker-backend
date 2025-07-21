const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { addHabit } = require("../controller/addHabitController");

/**
 * @swagger
 * /api/habit:
 *   post:
 *     summary: Create a new habit for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Habits
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
 *                 example: Drink water
 *     responses:
 *       201:
 *         description: Habit successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Habit created
 *                 habit:
 *                   $ref: "#/components/schemas/Habit"
 *               required: ["message", "habit"]
 *       400:
 *         description: Bad request – missing habit name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               error: "Name is required"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.post("/", authenticateToken, addHabit);

module.exports = router;
