const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { addCheckIn } = require("../controller/addCheckInController");

/**
 * @swagger
 * /api/check-in:
 *   post:
 *     summary: Add a check in for the authenticated user
 *     tags:
 *       - Check Ins
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - habitId
 *             properties:
 *               habitId:
 *                 type: string
 *                 example: "64b9f3a8b8c7a2d1e4d9e123"
 *     responses:
 *       201:
 *         description: Check in created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Check in created
 *                 checkIn:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64ba0b20b8c7a2d1e4d9e456"
 *                     habitId:
 *                       type: string
 *                       example: "64b9f3a8b8c7a2d1e4d9e123"
 *                     habitDay:
 *                       type: string
 *                       format: date
 *                       example: "2025-07-24"
 *                   required: [ "id", "habitId", "habitDay" ]
 *               required: [ "message", "checkIn" ]
 *       400:
 *         description: Bad request – missing habitId or already checked in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             examples:
 *               MissingHabitId:
 *                 summary: Missing habit id
 *                 value:
 *                   error: "habitId is required"
 *               DuplicateCheckIn:
 *                 summary: Check in already recorded for today
 *                 value:
 *                   error: "Already checked in for today"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.post("/", authenticateToken, addCheckIn);

module.exports = router;
