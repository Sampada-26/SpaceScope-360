const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    avatar: String,
    quizProgress: [{
        moduleId: Number, // 1-based index or ID
        score: Number,
        completed: Boolean,
        unlockedAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
});

mongoose.model("users", userSchema);
