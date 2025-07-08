const express = require("express");
const router = express.Router();
const { signupUser } = require("../controller/signupController");

router.post("/", signupUser);

module.exports = router;
