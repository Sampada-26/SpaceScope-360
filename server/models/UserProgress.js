const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true, unique: true },
    name: { type: String, default: "Space Cadet" },
    email: { type: String, default: "cadet@spacescope.ai" },
    currentLevel: { type: Number, default: 1 },
    completedLevels: { type: [Number], default: [] },
    badge: { type: String, default: "None" },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

mongoose.model("userprogress", userProgressSchema);
