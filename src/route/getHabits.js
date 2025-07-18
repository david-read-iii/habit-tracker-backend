const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { getHabits } = require("../controller/getHabitsController");

// TODO: Add Swagger.
router.get("/", authenticateToken, getHabits);

module.exports = router;
