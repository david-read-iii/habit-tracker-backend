const express = require("express");
const router = express.Router();
const { signupUser } = require("../controller/signupController");

router.post("/", async (req, res) => {
    try {
        const token = await signupUser(req.body);
        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        const status = err.status;
        if (status && status >= 400 && status < 500) {
            // If it's a 4xx client error, respond with that status and message
            return res.status(status).json({ error: err.message });
        } else {
            // Otherwise, treat it as a 500 server error
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

module.exports = router;
