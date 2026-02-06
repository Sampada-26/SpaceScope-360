const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
    // GET Progress
    app.get("/api/quiz/progress", async (req, res) => {
        if (!req.user) return res.status(401).send({ error: "You must log in!" });

        try {
            const user = await User.findById(req.user.id);
            res.send(user.quizProgress || []);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    // POST Save Progress (Unlock next level)
    app.post("/api/quiz/progress", async (req, res) => {
        if (!req.user) return res.status(401).send({ error: "You must log in!" });

        const { moduleId, score, passed } = req.body;

        try {
            const user = await User.findById(req.user.id);

            // Check if module already exists
            const existingIndex = user.quizProgress.findIndex(p => p.moduleId === moduleId);

            if (existingIndex >= 0) {
                // Update existing
                user.quizProgress[existingIndex].score = Math.max(user.quizProgress[existingIndex].score, score);
                if (passed) user.quizProgress[existingIndex].completed = true;
            } else {
                // Add new
                user.quizProgress.push({ moduleId, score, completed: passed });
            }

            // Auto-unlock next module logic? 
            // Ideally, if module 1 is passed, we shouldn't explicitly push module 2 here unless we have a strict "unlocked" list.
            // But usually the client just checks "is module N-1 completed?" to unlock N.
            // So saving "completed: true" for module 1 is enough.

            await user.save();
            res.send(user.quizProgress);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
