const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    streak: {
        type: Number,
        default: 0
    },
    lastCompleted: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Habit", habitSchema);
