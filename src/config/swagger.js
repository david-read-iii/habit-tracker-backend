const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Sets up Swagger UI and API documentation middleware on the given Express app.
 * 
 * This function configures Swagger using swagger-jsdoc with API definitions
 * specified in the route files, then registers the Swagger UI middleware
 * at the `/api-docs` endpoint.
 * 
 * It also logs the URL where the Swagger UI can be accessed.
 * 
 * @param {import("express").Express} app - The Express application instance.
 */
function setupSwagger(app) {
    const port = process.env.PORT;

    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Habit Tracker",
                version: "1.0.0",
                description: "API documentation for the Habit Tracker backend",
            },
            servers: [
                {
                    url: `http://localhost:${port}`,
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        },
        apis: [__dirname + "/../route/*.js"],
    };

    const swaggerSpec = swaggerJSDoc(options);

    // Register swagger middleware on the Express app.
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
}

module.exports = setupSwagger;
