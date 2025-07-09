const express = require("express");
const router = express.Router();
const authenticateToken = require("../src/middleware/authentication");
const { updateTimezone } = require("../src/controller/timezoneController");

router.patch("/", authenticateToken, updateTimezone);

module.exports = router;
