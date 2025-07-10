const { signupUser } = require("../../src/controller/signupController");
const User = require("../../src/model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createMockRes } = require("../testUtils");

jest.mock("../../src/model/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("signupUser", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 201 and a token on successful signup", async () => {
        const req = {
            body: { email: "test@example.com", password: "123456", timezone: "UTC" },
        };
        const res = createMockRes();
        User.findOne.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue("hashed_password");
        jwt.sign.mockReturnValue("fake_jwt_token");
        const mockSave = jest.fn().mockResolvedValue();
        User.mockImplementation(() => ({
            save: mockSave,
            _id: "user123",
        }));
        await signupUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
        expect(jwt.sign).toHaveBeenCalledWith(
            { userId: "user123" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ token: "fake_jwt_token" });
    });

    it("should return 400 if email is already in use", async () => {
        const req = {
            body: { email: "test@example.com", password: "123456", timezone: "UTC" },
        };
        const res = createMockRes();
        User.findOne.mockResolvedValue({ email: "test@example.com" });
        await signupUser(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Email already in use" });
    });

    it("should return 500 on unexpected error", async () => {
        const req = {
            body: { email: "test@example.com", password: "123456", timezone: "UTC" },
        };
        const res = createMockRes();
        User.findOne.mockRejectedValue(new Error("DB error"));
        await signupUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});
