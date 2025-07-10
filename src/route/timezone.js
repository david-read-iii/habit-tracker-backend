const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authentication");
const { updateTimezone } = require("../controller/timezoneController");

router.patch("/", authenticateToken, updateTimezone);

module.exports = router;
