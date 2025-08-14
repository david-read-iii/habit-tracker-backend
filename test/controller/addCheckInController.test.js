const { addCheckIn } = require("../../src/controller/addCheckInController");
const CheckIn = require("../../src/model/CheckIn");
const { toCleanCheckIn } = require("../../src/util/toCleanCheckIn");
const moment = require("moment-timezone");
const { createMockRes } = require("../testUtils");
jest.mock("../../src/model/CheckIn");
jest.mock("../../src/util/toCleanCheckIn");

describe("addCheckIn", () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: {
                userId: "user123",
                timezone: "America/New_York"
            },
            body: {
                habitId: "habit456"
            }
        };

        res = createMockRes();

        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create a new check in and return 201", async () => {
        const mockCheckIn = {
            _id: "newId",
            userId: "user123",
            habitId: "habit456",
            habitDay: moment().tz(req.user.timezone).format("YYYY-MM-DD")
        };
        CheckIn.findOne.mockResolvedValue(null);
        CheckIn.create.mockResolvedValue(mockCheckIn);
        toCleanCheckIn.mockReturnValue({ id: "newId", habitDay: mockCheckIn.habitDay });
        await addCheckIn(req, res);

        expect(CheckIn.create).toHaveBeenCalledWith({
            userId: "user123",
            habitId: "habit456",
            habitDay: mockCheckIn.habitDay
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Check in created",
            checkIn: { id: "newId", habitDay: mockCheckIn.habitDay }
        });
    });

    it("should return 400 if habitId is missing", async () => {
        req.body.habitId = undefined;
        await addCheckIn(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "habitId is required" });
    });

    it("should return 400 if already checked in today", async () => {
        const today = moment().tz(req.user.timezone).format("YYYY-MM-DD");
        CheckIn.findOne.mockResolvedValue({ _id: "existingId", habitDay: today });
        await addCheckIn(req, res);

        expect(CheckIn.findOne).toHaveBeenCalledWith({
            userId: "user123",
            habitId: "habit456",
            habitDay: today
        });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Already checked in for today" });
    });

    it("should handle unexpected errors and return 500", async () => {
        CheckIn.findOne.mockRejectedValue(new Error("DB error"));
        await addCheckIn(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});
