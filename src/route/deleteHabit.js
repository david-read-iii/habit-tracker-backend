const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { deleteHabit } = require("../controller/deleteHabitController");

/**
 * @swagger
 * /api/habit/{id}:
 *   delete:
 *     summary: Delete a habit
 *     description: Deletes a habit belonging to the authenticated user.
 *     tags:
 *       - Habits
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the habit to delete
 *     responses:
 *       200:
 *         description: Habit successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Habit deleted
 *               required: ["message"]
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
router.delete("/:id", authenticateToken, deleteHabit);

module.exports = router;
