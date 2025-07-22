const { deleteHabit } = require("../../src/controller/deleteHabitController");
const Habit = require("../../src/model/Habit");
const { createMockRes } = require("../testUtils");
jest.mock("../../src/model/Habit");

describe("deleteHabit", () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { userId: "user123" },
            params: { id: "habit456" },
        };

        res = createMockRes();

        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should delete habit and return success message", async () => {
        Habit.findOneAndDelete.mockResolvedValue({
            _id: "habit456",
            userId: "user123",
            name: "Sample Habit",
        });
        await deleteHabit(req, res);

        expect(Habit.findOneAndDelete).toHaveBeenCalledWith({
            _id: "habit456",
            userId: "user123",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Habit deleted" });
    });

    it("should return 404 if habit is not found", async () => {
        Habit.findOneAndDelete.mockResolvedValue(null);
        await deleteHabit(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Habit not found" });
    });

    it("should return 500 for internal server errors", async () => {
        Habit.findOneAndDelete.mockRejectedValue(new Error("DB error"));
        await deleteHabit(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});
