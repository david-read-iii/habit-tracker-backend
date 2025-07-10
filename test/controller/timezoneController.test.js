const { updateTimezone } = require("../../src/controller/timezoneController");
const User = require("../../src/model/User");
const { createMockRes } = require("../testUtils");

jest.mock("../../src/model/User");

describe("updateTimezone", () => {
    let req, res;

    beforeEach(() => {
        res = createMockRes();
        req = {
            user: { userId: "user123" },
            body: { timezone: "America/New_York" },
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and updated timezone on success", async () => {
        const mockUser = { timezone: "America/New_York" };
        User.findByIdAndUpdate.mockResolvedValue(mockUser);
        await updateTimezone(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            "user123",
            { timezone: "America/New_York" },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Timezone updated",
            timezone: "America/New_York",
        });
    });

    it("should return 400 if timezone is missing", async () => {
        req.body.timezone = null;
        await updateTimezone(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Timezone is required" });
    });

    it("should return 404 if user is not found", async () => {
        User.findByIdAndUpdate.mockResolvedValue(null);
        await updateTimezone(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            "user123",
            { timezone: "America/New_York" },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("should return 500 if an unexpected error occurs", async () => {
        User.findByIdAndUpdate.mockRejectedValue(new Error("DB failure"));
        await updateTimezone(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});
