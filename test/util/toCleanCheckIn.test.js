const { toCleanCheckIn } = require("../../src/util/toCleanCheckIn");

describe("toCleanCheckIn", () => {

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should convert a Mongoose CheckIn object to a clean object", () => {
        const mockCheckIn = {
            _id: { toString: () => "abc123" },
            habitId: "habit456",
            habitDay: "2025-07-24",
            __v: 0, // should be ignored
            createdAt: new Date("2025-07-20T10:00:00Z") // should be ignored
        };
        const result = toCleanCheckIn(mockCheckIn);

        expect(result).toEqual({
            id: "abc123",
            habitId: "habit456",
            habitDay: "2025-07-24"
        });
    });

    it("should throw if _id is missing or toString fails", () => {
        const badCheckIn = {
            habitId: "habit456",
            habitDay: "2025-07-24"
        };

        expect(() => toCleanCheckIn(badCheckIn)).toThrow();
    });

    it("should include only id, habitId, and habitDay", () => {
        const mockCheckIn = {
            _id: { toString: () => "xyz789" },
            habitId: "habit999",
            habitDay: "2025-07-23",
            userId: "user000",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = toCleanCheckIn(mockCheckIn);

        expect(result).toEqual({
            id: "xyz789",
            habitId: "habit999",
            habitDay: "2025-07-23"
        });

        // Ensure no extra properties
        expect(Object.keys(result)).toEqual(["id", "habitId", "habitDay"]);
    });
});
