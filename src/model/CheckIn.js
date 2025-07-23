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
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("CheckIn", checkInSchema);
