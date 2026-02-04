import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";
import App from "./App";
import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Community from "./pages/Community";

import "./styles.css";
import About from "./pages/about";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
