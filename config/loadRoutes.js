/**
 * Registers application routes with the provided Express app instance.
 *
 * This function loads route modules (e.g., signup and login)
 * and attaches them to their respective API paths.
 * 
 * It should be called during the initial application setup.
 *
 * @param {import("express").Express} app - The Express application instance
 */
function loadRoutes(app) {
    const signupRoute = require("../route/signup");
    const loginRoute = require("../route/login");

    app.use("/api/signup", signupRoute);
    app.use("/api/login", loginRoute);
}

module.exports = loadRoutes;
