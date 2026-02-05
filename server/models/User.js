const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
});

mongoose.model("users", userSchema);
