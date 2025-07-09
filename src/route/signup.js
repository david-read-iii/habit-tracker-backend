const express = require("express");
const router = express.Router();
const { signupUser } = require("../src/controller/signupController");

router.post("/", signupUser);

module.exports = router;
