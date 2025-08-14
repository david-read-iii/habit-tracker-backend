const { editHabit } = require("../../src/controller/editHabitController");
const Habit = require("../../src/model/Habit");
const { createMockRes } = require("../testUtils");
jest.mock("../../src/model/Habit");

describe("editHabit", () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { userId: "user123" },
            params: { id: "habit123" },
            body: { name: "New Habit Name" },
        };

        res = createMockRes();

        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should update and return habit if found", async () => {
        const mockHabit = {
            _id: "habit123",
            name: "Old Habit Name",
            createdAt: new Date("2023-01-01"),
            save: jest.fn(),
        };
        Habit.findOne.mockResolvedValue(mockHabit);
        await editHabit(req, res);

        expect(mockHabit.name).toBe("New Habit Name");
        expect(mockHabit.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Habit updated",
            habit: {
                id: "habit123",
                name: "New Habit Name",
                createdAt: new Date("2023-01-01"),
            },
        });
    });

    it("should return 400 if name is missing", async () => {
        req.body.name = "";
        await editHabit(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Habit name is required" });
    });

    it("should return 404 if habit is not found", async () => {
        Habit.findOne.mockResolvedValue(null);
        await editHabit(req, res);

        expect(Habit.findOne).toHaveBeenCalledWith({ _id: "habit123", userId: "user123" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Habit not found" });
    });

    it("should return 500 if an error occurs", async () => {
        Habit.findOne.mockRejectedValue(new Error("Database error"));
        await editHabit(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});
