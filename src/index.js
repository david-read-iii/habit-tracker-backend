const express = require("express");
const app = express();

// Loads environment variables.
require("dotenv").config();

// Lets you parse JSON requests.
app.use(express.json());

// Setup MongoDB connection.
const mongoose = require("mongoose");
const loadRoutes = require("./config/loadRoutes");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        // Setup Swagger for API documentation.
        if (process.env.NODE_ENV !== "production") {
            const setupSwagger = require("./config/swagger");
            setupSwagger(app);
        }

        // Load all routes.
        loadRoutes(app);

        // Start server after DB connection.
        const PORT = process.env.PORT;
        const HOST = process.env.NODE_ENV === "development" ? "0.0.0.0" : "localhost";
        app.listen(PORT, HOST, () => {
            console.log(`Server listening on ${HOST}:${PORT}`);
        });

    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
