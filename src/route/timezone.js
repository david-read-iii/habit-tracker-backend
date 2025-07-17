const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { updateTimezone } = require("../controller/timezoneController");

/**
 * @swagger
 * /api/timezone:
 *   patch:
 *     summary: Update the authenticated user's timezone
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timezone
 *             properties:
 *               timezone:
 *                 type: string
 *                 example: America/New_York
 *     responses:
 *       200:
 *         description: Timezone successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Timezone updated
 *                 timezone:
 *                   type: string
 *                   example: America/New_York
 *       400:
 *         description: Missing timezone in request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               error: "Timezone is required"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               error: "User not found"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.patch("/", authenticateToken, updateTimezone);

module.exports = router;
