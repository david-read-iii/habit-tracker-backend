/**
 * Handles errors consistently across all route handlers.
 *
 * @param {Error} err - The error object thrown in the try/catch block.
 * @param {Response} res - The Express response object.
 */
function handleError(err, res) {
    const status = err.status;
    if (status && status >= 400 && status < 500) {
        console.error("4xx error:", err);
        return res.status(status).json({ error: err.message });
    } else {
        console.error("500 error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { handleError };
