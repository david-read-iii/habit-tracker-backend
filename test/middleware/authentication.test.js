const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../../src/middleware/authentication");
const { createMockRes } = require("../testUtils");

jest.mock("jsonwebtoken");

describe("authenticateToken", () => {
    let req, res, next;

    beforeEach(() => {
        res = createMockRes();
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call next() and attach decoded user if token is valid", () => {
        const decoded = { userId: "12345" };
        req = {
            headers: {
                authorization: "Bearer validtoken"
            }
        };
        jwt.verify.mockReturnValue(decoded);
        authenticateToken(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith("validtoken", process.env.JWT_SECRET);
        expect(req.user).toEqual(decoded);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 401 if no Authorization header is provided", () => {
        req = { headers: {} };
        authenticateToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Missing token" });
        expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if token is invalid or expired", () => {
        req = {
            headers: {
                authorization: "Bearer invalidtoken"
            }
        };
        jwt.verify.mockImplementation(() => {
            throw new Error("Invalid token");
        });
        authenticateToken(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith("invalidtoken", process.env.JWT_SECRET);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid or expired token" });
        expect(next).not.toHaveBeenCalled();
    });
});
