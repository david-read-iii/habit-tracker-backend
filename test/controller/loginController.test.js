const { loginUser } = require("../../src/controller/loginController");
const User = require("../../src/model/User");
const bcrypt = require("bcryptjs");
const { signJwt } = require("../../src/util/signJwt");
const { createMockRes } = require("../testUtils");

jest.mock("../../src/util/signJwt");

describe("loginUser", () => {

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns 200 and token for valid credentials", async () => {
        const req = { body: { email: "test@example.com", password: "password123" } };
        const res = createMockRes();
        const mockUser = { _id: "user123", password: "hashedPassword", timezone: "America/New_York" };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        signJwt.mockReturnValue("fake-jwt-token");
        await loginUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
        expect(signJwt).toHaveBeenCalledWith(expect.objectContaining({
            _id: "user123",
            timezone: "America/New_York"
        }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: "fake-jwt-token" });
    });

    it("returns 400 if user not found", async () => {
        const req = { body: { email: "notfound@example.com", password: "password" } };
        const res = createMockRes();
        User.findOne = jest.fn().mockResolvedValue(null);

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid email or password" });
    });

    it("returns 400 if password incorrect", async () => {
        const req = { body: { email: "test@example.com", password: "wrongpassword" } };
        const res = createMockRes();
        const mockUser = { _id: "user123", password: "hashedPassword" };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid email or password" });
    });

    it("returns 500 on unexpected error", async () => {
        const req = { body: { email: "test@example.com", password: "password" } };
        const res = createMockRes();
        User.findOne = jest.fn().mockRejectedValue(new Error("DB error"));

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});