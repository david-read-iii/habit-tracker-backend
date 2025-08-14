const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
        required: true,
    },
    habitDay: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Prevent duplicate check ins for the same habitDay.
checkInSchema.index({ userId: 1, habitId: 1, habitDay: 1 }, { unique: true });

module.exports = mongoose.model("CheckIn", checkInSchema);
