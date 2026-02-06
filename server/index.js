const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const axios = require("axios");
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
  res.json({ ok: true, service: "Singularity API" });
});

app.get("/api/sky-watcher/status", (_, res) => {
  res.json({
    issVisible: true,
    nearbySatellites: 12,
    alert: "green",
    message: "All clear"
  });
});

app.get("/api/sky-watcher/stargazing-spots", async (req, res) => {
  const q = String(req.query.q || "observatory").trim();
  const country = String(req.query.country || "").trim().toUpperCase();
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || "8"), 10) || 8, 1), 12);

  const fallbackSpots = [
    {
      id: "fallback-1",
      name: "Ladakh Sky Reserve",
      country: "India",
      state: "Ladakh",
      latitude: 34.1526,
      longitude: 77.5771,
      elevation: null,
      population: 30000,
      cloudCoverMean: 25,
      pollution: "Low",
      bestSeason: "Winter",
      rating: 4.8,
    },
    {
      id: "fallback-2",
      name: "Atacama Quiet Zone",
      country: "Chile",
      state: "Antofagasta",
      latitude: -23.6509,
      longitude: -70.3975,
      elevation: null,
      population: 35000,
      cloudCoverMean: 18,
      pollution: "Low",
      bestSeason: "Summer",
      rating: 4.9,
    },
  ];

  try {
    const geoParams = {
      name: q,
      count: limit,
      language: "en",
      format: "json",
    };

    if (country.length === 2) {
      geoParams.country = country;
    }

    const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
      params: geoParams,
      timeout: 7000,
    });

    const results = Array.isArray(geoRes.data?.results) ? geoRes.data.results : [];
    if (!results.length) {
      return res.json({ spots: [] });
    }

    const spots = await Promise.all(
      results.map(async (spot) => {
        let cloudCoverMean = null;

        try {
          const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
              latitude: spot.latitude,
              longitude: spot.longitude,
              daily: "cloud_cover_mean",
              forecast_days: 7,
              timezone: "auto",
            },
            timeout: 10000,
          });

          const cloudValues = weatherRes.data?.daily?.cloud_cover_mean;
          if (Array.isArray(cloudValues) && cloudValues.length) {
            const total = cloudValues.reduce((sum, val) => sum + Number(val || 0), 0);
            cloudCoverMean = total / cloudValues.length;
          }
        } catch {
          cloudCoverMean = null;
        }

        const population = Number(spot.population || 0);
        const cloud = cloudCoverMean == null ? 40 : cloudCoverMean;
        const pollution =
          population <= 100000 ? "Low" : population <= 500000 ? "Medium" : "High";
        const bestSeason = spot.latitude >= 0 ? "Winter" : "Summer";
        const rating = Math.max(3.8, Math.min(5, 5 - cloud / 30 - population / 5000000));

        return {
          id: `${spot.id}`,
          name: spot.name,
          country: spot.country,
          state: spot.admin1 || "",
          latitude: spot.latitude,
          longitude: spot.longitude,
          elevation: spot.elevation ?? null,
          population,
          cloudCoverMean: cloud == null ? null : Number(cloud.toFixed(1)),
          pollution,
          bestSeason,
          rating: Number(rating.toFixed(1)),
        };
      })
    );

    res.json({ spots });
  } catch (error) {
    res.json({ spots: fallbackSpots });
  }
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
