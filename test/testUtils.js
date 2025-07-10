/**
 * Creates a mock response object that mimics the Express `res` object.
 * 
 * This utility is used in unit tests to simulate how the response object
 * behaves in Express. It mocks the `status` and `json` methods:
 * 
 * - `res.status(code).json(data)` will work as expected
 * - Each method is a Jest mock function, allowing assertions
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
