const express = require("express");
const router = express.Router();
const { loginUser } = require("../controller/loginController");

router.post("/", loginUser);

module.exports = router;
