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
            createdAt: new Date("2025-07-20T10:00:00Z"),
            __v: 0, // should be ignored
            userId: "user123", // should be ignored
        };
        const result = toCleanHabit(inputHabit, 5);

        expect(result).toEqual({
            id: "abc123",
            name: "Read books",
            createdAt: new Date("2025-07-20T10:00:00Z"),
            streak: 5,
        });
    });

    it("should handle empty fields", () => {
        const inputHabit = {
            _id: { toString: () => "xyz789" },
            name: "",
            createdAt: null,
        };
        const result = toCleanHabit(inputHabit, 0);

        expect(result).toEqual({
            id: "xyz789",
            name: "",
            createdAt: null,
            streak: 0,
        });
    });

    it("should throw if _id is missing", () => {
        const inputHabit = {
            name: "No ID",
            createdAt: new Date(),
        };

        expect(() => toCleanHabit(inputHabit, 0)).toThrow();
    });
});
