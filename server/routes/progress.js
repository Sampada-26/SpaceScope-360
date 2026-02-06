const mongoose = require("mongoose");

const UserProgress = mongoose.model("userprogress");

const MAX_LEVEL = 3;

function getBadge(completedLevels) {
  if (completedLevels.includes(3)) return "Gold";
  if (completedLevels.includes(2)) return "Silver";
  if (completedLevels.includes(1)) return "Bronze";
  return "None";
}

function getStatus(completedLevels) {
  if (completedLevels.includes(3)) return "Completed";
  if (completedLevels.length > 0) return "In Progress";
  return "Active";
}

module.exports = (app) => {
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).json({ error: "userId is required" });

      let progress = await UserProgress.findOne({ userId });
      if (!progress) {
        const name = req.query.name || req.user?.name || "Space Cadet";
        const email = req.query.email || req.user?.email || "cadet@spacescope.ai";
        progress = await UserProgress.create({
          userId,
          name,
          email,
          currentLevel: 1,
          completedLevels: [],
          badge: "None",
          status: "Active",
        });
      }

      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/complete-level", async (req, res) => {
    try {
      const { userId, completedLevel } = req.body;
      const level = Number(completedLevel);

      if (!userId || Number.isNaN(level)) {
        return res.status(400).json({ error: "userId and completedLevel are required" });
      }

      let progress = await UserProgress.findOne({ userId });
      if (!progress) {
        progress = new UserProgress({ userId });
      }

      const completedSet = new Set(progress.completedLevels);
      completedSet.add(level);
      const completedLevels = Array.from(completedSet).sort((a, b) => a - b);

      const nextLevel = Math.min(MAX_LEVEL, level + 1);
      progress.currentLevel = Math.max(progress.currentLevel || 1, nextLevel);
      progress.completedLevels = completedLevels;
      progress.badge = getBadge(completedLevels);
      progress.status = getStatus(completedLevels);

      await progress.save();
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to update progress" });
    }
  });
};
