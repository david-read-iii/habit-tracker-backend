const express = require("express");
const app = express();

// Loads environment variables.
require("dotenv").config();

// Lets you parse JSON requests
app.use(express.json());

// Setup MongoDB connection.
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        // Register signup route
        const signupRoute = require("./route/signup");
        app.use("/api/signup", signupRoute);

        // Start server after DB connection
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });