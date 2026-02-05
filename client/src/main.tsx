import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import SiteLayout from "./layouts/SiteLayout";
import App from "./App";
import Login from "./pages/Login";

import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import CosmicClassroom from "./pages/CosmicClassroom";
import Constellations from "./pages/sky-watcher/Constellations";
import StargazingSpots from "./pages/sky-watcher/StargazingSpots";
import SatelliteTracker from "./pages/sky-watcher/SatelliteTracker";
import SkyWatcherLanding from "./pages/sky-watcher/SkyWatcherLanding";
import About from "./pages/about";

import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />

            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/cosmic-classroom" element={<CosmicClassroom />} />

            <Route path="/sky-watcher" element={<SkyWatcherLanding />} />
            <Route path="/sky-watcher/constellations" element={<Constellations />} />
            <Route path="/sky-watcher/stargazing-spots" element={<StargazingSpots />} />
            <Route path="/sky-watcher/satellite-tracker" element={<SatelliteTracker />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);