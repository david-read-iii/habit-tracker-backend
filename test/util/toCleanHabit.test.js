const { toCleanHabit } = require("../../src/util/toCleanHabit");

describe("toCleanHabit", () => {

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should convert a habit object to a clean format", () => {
        const inputHabit = {
            _id: { toString: () => "abc123" },
            name: "Read books",
            streak: 5,
            createdAt: new Date("2025-07-20T10:00:00Z"),
            __v: 0, // should be ignored
            userId: "user123", // should be ignored
        };
        const result = toCleanHabit(inputHabit);

        expect(result).toEqual({
            id: "abc123",
            name: "Read books",
            streak: 5,
            createdAt: new Date("2025-07-20T10:00:00Z"),
        });
    });

    it("should handle empty fields", () => {
        const inputHabit = {
            _id: { toString: () => "xyz789" },
            name: "",
            streak: 0,
            createdAt: null,
        };
        const result = toCleanHabit(inputHabit);

        expect(result).toEqual({
            id: "xyz789",
            name: "",
            streak: 0,
            createdAt: null,
        });
    });

    it("should throw if _id is missing", () => {
        const inputHabit = {
            name: "No ID",
            streak: 1,
            createdAt: new Date(),
        };

        expect(() => toCleanHabit(inputHabit)).toThrow();
    });
});
