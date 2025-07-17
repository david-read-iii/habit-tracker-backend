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
                    }
                },
                schemas: {
                    Error: {
                        type: "object",
                        properties: {
                            error: {
                                type: "string",
                                description: "A description of the error",
                            },
                        },
                        required: ["error"],
                    },
                },
                responses: {
                    // Common 401 error from authentication middleware
                    UnauthorizedError: {
                        description: "Unauthorized - Missing token",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                },
                                example: {
                                    error: "Missing token"
                                }
                            }
                        }
                    },
                    // Common 403 error from authentication middleware
                    ForbiddenError: {
                        description: "Forbidden - Invalid or expired token",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                },
                                example: {
                                    error: "Invalid or expired token"
                                }
                            }
                        }
                    },
                    // Common 500 error used server-wide
                    InternalServerError: {
                        description: "Unexpected server error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                },
                                example: {
                                    error: "Internal server error"
                                }
                            }
                        }
                    }
                },
            },
        },
        apis: [__dirname + "/../route/*.js"],
    }; // TODO: Define common User and Habit Swagger schemas here.

    const swaggerSpec = swaggerJSDoc(options);

    // Register swagger middleware on the Express app.
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
}

module.exports = setupSwagger;
