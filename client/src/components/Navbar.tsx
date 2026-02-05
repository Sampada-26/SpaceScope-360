import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, MapPin, Satellite, Sparkles } from "lucide-react";
import GlassButton from "./GlassButton";

export default function Navbar() {
  const location = useLocation();
  const [skyOpen, setSkyOpen] = useState(false);
  const showSkyPanel = location.pathname.startsWith("/sky-watcher");

  useEffect(() => {
    setSkyOpen(false);
  }, [location.pathname]);

  const skyItems = [
    {
      title: "3D Constellations",
      description: "Explore glowing star patterns in immersive 3D space.",
      to: "/sky-watcher/constellations",
      Icon: Sparkles,
    },
    {
      title: "Stargazing Spots",
      description: "Find low-light locations with sky clarity ratings.",
      to: "/sky-watcher/stargazing-spots",
      Icon: MapPin,
    },
    {
      title: "Live Satellite Tracker",
      description: "Track satellites with orbit paths and telemetry data.",
      to: "/sky-watcher/satellite-tracker",
      Icon: Satellite,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 shadow-glow" />
          <div className="font-semibold tracking-wide">
            SpaceScope <span className="text-white/70">360</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setSkyOpen(true)}
            onMouseLeave={() => setSkyOpen(false)}
          >
            <Link
              to="/sky-watcher"
              className="flex items-center gap-1 hover:text-white transition"
              aria-expanded={skyOpen}
            >
              Sky Watcher
              <ChevronDown className={`h-4 w-4 transition ${skyOpen ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <Link to="/earth-guardian" className="hover:text-white transition">
            Earth Guardian
          </Link>

          <Link to="/cosmic-classroom" className="hover:text-white transition">
            Cosmic Classroom
          </Link>

          <Link to="/missions" className="hover:text-white transition">
            Missions
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden px-3 py-2 text-xs rounded-full border border-white/10 text-white/80 hover:text-white transition"
            onClick={() => setSkyOpen((prev) => !prev)}
            aria-expanded={skyOpen}
          >
            Sky Watcher
          </button>

          <Link to="/login">
            <GlassButton variant="outline">Login</GlassButton>
          </Link>

          <Link to="/sign-up">
            <GlassButton variant="glow">Sign-up</GlassButton>
          </Link>
        </div>

        {showSkyPanel && (
          <div
            className={`absolute left-0 right-0 top-full pt-4 transition duration-300 ${
              skyOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            onMouseEnter={() => setSkyOpen(true)}
            onMouseLeave={() => setSkyOpen(false)}
          >
            <div className="glass rounded-2xl p-4 md:p-5 shadow-[0_0_35px_rgba(90,140,255,0.25)]">
              <div className="grid gap-4 md:grid-cols-3">
                {skyItems.map(({ title, description, to, Icon }) => (
                  <Link
                    key={title}
                    to={to}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-5 transition hover:-translate-y-1 hover:border-white/30"
                  >
                    <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(120,160,255,0.25),transparent_55%)]" />
                    <div className="relative z-10 flex items-start gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white shadow-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{title}</div>
                        <p className="text-xs text-white/70 mt-1">{description}</p>
                        <div className="text-xs text-cyan-200/80 mt-3">Enter view →</div>
                      </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-blue-400/20 blur-2xl" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
