/**
 * Registers application routes with the provided Express app instance.
 *
 * This function loads route modules and attaches them to their respective API paths.
 * 
 * It should be called during the initial application setup.
 *
 * @param {import("express").Express} app - The Express application instance
 */
function loadRoutes(app) {
    const signupRoute = require("../route/signup");
    app.use("/api/signup", signupRoute);
    const loginRoute = require("../route/login");
    app.use("/api/login", loginRoute);
    const timezoneRoute = require("../route/timezone");
    app.use("/api/timezone", timezoneRoute);
}

module.exports = loadRoutes;
