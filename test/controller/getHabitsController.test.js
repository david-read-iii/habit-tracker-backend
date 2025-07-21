const { getHabits } = require("../../src/controller/getHabitsController");
const Habit = require("../../src/model/Habit");
const { createMockRes } = require("../testUtils");
jest.mock("../../src/model/Habit");

describe("getHabits", () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { userId: "user123" },
            query: { page: "1", limit: "2" }
        };

        res = createMockRes();

        // jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return habits and nextPage", async () => {
        const fakeHabits = [
            {
                _id: "123",
                name: "habit1",
                streak: 0,
                createdAt: "2025-07-17T12:39:23.898Z"
            },
            {
                _id: "124",
                name: "habit2",
                streak: 5,
                createdAt: "2025-07-17T12:40:40.395Z"
            },
        ];
        Habit.find.mockReturnValue({
            skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockResolvedValue(fakeHabits)
            })
        });
        Habit.countDocuments.mockResolvedValue(5);
        await getHabits(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            habits: [
                {
                    id: "123",
                    name: "habit1",
                    streak: 0,
                    createdAt: "2025-07-17T12:39:23.898Z"
                },
                {
                    id: "124",
                    name: "habit2",
                    streak: 5,
                    createdAt: "2025-07-17T12:40:40.395Z"
                },
            ],
            nextPage: 2
        });
    });

    it("should return nextPage as null if on last page", async () => {
        req.query.page = "2";
        req.query.limit = "2";
        const fakeHabits = [
            {
                _id: "123",
                name: "habit1",
                streak: 0,
                createdAt: "2025-07-17T12:39:23.898Z"
            },
            {
                _id: "124",
                name: "habit2",
                streak: 5,
                createdAt: "2025-07-17T12:40:40.395Z"
            },
        ];
        Habit.countDocuments.mockResolvedValue(4); // totalPages = 2
        Habit.find.mockReturnValue({
            skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockResolvedValue(fakeHabits)
            })
        });
        await getHabits(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            habits: [
                {
                    id: "123",
                    name: "habit1",
                    streak: 0,
                    createdAt: "2025-07-17T12:39:23.898Z"
                },
                {
                    id: "124",
                    name: "habit2",
                    streak: 5,
                    createdAt: "2025-07-17T12:40:40.395Z"
                },
            ],
            nextPage: null
        });
    });

    it("should return 400 if page or limit are invalid", async () => {
        req.query.page = "0";
        req.query.limit = "10";
        await getHabits(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Page or limit are invalid. Both must be integers greater than 0."
        });
    });

    it("should return 400 if page exceeds totalPages", async () => {
        req.query.page = "3";
        req.query.limit = "2";
        Habit.countDocuments.mockResolvedValue(4); // totalPages = 2
        await getHabits(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Page 3 exceeds the total number of available pages (2)."
        });
    });

    it("should return 500 on internal server error", async () => {
        Habit.countDocuments.mockRejectedValue(new Error("DB error"));
        await getHabits(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Internal server error"
        });
    });
});
