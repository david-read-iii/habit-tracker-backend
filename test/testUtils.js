/**
 * Creates a mock response object that mimics the Express res object.
 *
 * @returns {Object} A mock Express response object with `status` and `json` methods.
 */
function createMockRes() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
}

module.exports = { createMockRes };
