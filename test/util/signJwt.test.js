const jwt = require("jsonwebtoken");
const { signJwt } = require("../../src/util/signJwt");
jest.mock("jsonwebtoken");

describe("signJwt", () => {
    const user = {
        _id: "1234567890abcdef",
        timezone: "America/New_York"
    };

    beforeEach(() => {
        process.env.JWT_SECRET = "test_secret";
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should call jwt.sign with correct payload and options", () => {
        jwt.sign.mockReturnValue("mockedToken");
        const token = signJwt(user);

        expect(jwt.sign).toHaveBeenCalledWith(
            { userId: user._id, timezone: user.timezone },
            "test_secret",
            { expiresIn: "7d" }
        );
        expect(token).toBe("mockedToken");
    });

    it("should return the JWT string", () => {
        jwt.sign.mockReturnValue("test.jwt.token");
        const token = signJwt(user);

        expect(token).toBe("test.jwt.token");
    });
});
