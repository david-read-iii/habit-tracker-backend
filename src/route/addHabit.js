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
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "68693cbc16b06087e613ff26"
 *                     name:
 *                       type: string
 *                       example: Drink water
 *                     streak:
 *                       type: integer
 *                       example: 0
 *                     _id:
 *                       type: string
 *                       example: "6878f27a464e52248f20fabe"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-17T12:54:18.812Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-07-17T12:54:18.812Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Bad request – missing habit name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Habit name is required
 *       401:
 *         description: Unauthorized – missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing token
 *       403:
 *         description: Forbidden – invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/", authenticateToken, addHabit);

module.exports = router;
