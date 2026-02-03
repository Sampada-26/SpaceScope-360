const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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
