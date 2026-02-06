const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

// Models & Services
require("./models/User");
require("./models/UserProgress");
require("./config/passport");

const connectDB = require("./config/db");

// Connect to Database
connectDB();

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.JWT_SECRET],
  })
);

// FIX: Patch for passport <-> cookie-session compatibility
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

require("./routes/auth")(app);
require("./routes/progress")(app);

app.get("/api/health", (_, res) => {
  res.json({ ok: true, service: "SpaceScope-360 API" });
});

app.get("/api/sky-watcher/status", (_, res) => {
  res.json({
    issVisible: true,
    nearbySatellites: 12,
    alert: "green",
    message: "All clear"
  });
});

app.get("/api/earth-guardian/alerts", (_, res) => {
  res.json({
    fires: [{ lat: 19.076, lng: 72.8777, level: "high" }],
    floods: [],
    languageSupport: ["hi", "mr"]
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
