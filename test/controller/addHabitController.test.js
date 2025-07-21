const { addHabit } = require("../../src/controller/addHabitController");
const Habit = require("../../src/model/Habit");
const { createMockRes } = require("../testUtils");
jest.mock("../../src/model/Habit");

describe("addHabit", () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { userId: "user123" },
            body: {},
        };

        res = createMockRes();

        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return 201 and create habit if valid", async () => {
        req.body.name = "  Drink Water  ";
        const mockSave = jest.fn().mockResolvedValue(true);
        Habit.mockImplementation(() => ({
            _id: "123",
            userId: "user123",
            name: "Drink Water",
            streak: 0,
            createdAt: "2025-07-17T14:23:45.123Z",
            save: mockSave,
        }));
        await addHabit(req, res);

        expect(Habit).toHaveBeenCalledWith({ userId: "user123", name: "Drink Water" });
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Habit created",
            habit: expect.objectContaining({
                id: "123",
                name: "Drink Water",
                streak: 0,
                createdAt: "2025-07-17T14:23:45.123Z"
            }),
        });
    });

    it("should return 400 if habit name is missing", async () => {
        req.body.name = "";
        await addHabit(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Habit name is required" });
    });

    it("should return 500 on database error", async () => {
        req.body.name = "Meditate";
        Habit.mockImplementation(() => ({
            userId: "user123",
            name: "Meditate",
            save: jest.fn().mockRejectedValue(new Error("DB failure")),
        }));
        await addHabit(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});
