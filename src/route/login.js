const express = require("express");
const router = express.Router();
const { loginUser } = require("../src/controller/loginController");

router.post("/", loginUser);

module.exports = router;
