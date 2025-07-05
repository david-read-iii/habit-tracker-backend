const express = require("express");
const router = express.Router();
const { loginUser } = require("../controller/loginController");
const { handleError } = require("../controller/commonController");

router.post("/", async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ token });
    } catch (err) {
        handleError(err, res);
    }
});

module.exports = router;
