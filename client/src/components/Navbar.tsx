import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GlassButton from "./GlassButton";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Unified scroll handler
  const scrollToSection = (sectionId: string, percentage: number) => {
    // If user is on a different page (like Login), go home first
    if (location.pathname !== "/") {
      navigate("/");
      // Small timeout to allow home page to load before scrolling
      setTimeout(() => executeScroll(percentage), 100);
    } else {
      executeScroll(percentage);
    }
  };

  const executeScroll = (percentage: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollHeight * percentage,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between relative">

        {/* Logo - Scrolls to Top */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 shadow-glow" />
          <div className="font-semibold tracking-wide">
            SpaceScope <span className="text-white/70">360</span>
          </div>
        </Link>

        {/* Navigation - Converted to Scroll Triggers */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <button onClick={() => scrollToSection('about', 1.0)} className="hover:text-white transition">About</button>

          {/* Matches showSky (0.28 - 0.60) */}
          <button onClick={() => scrollToSection('sky-watcher', 0.45)} className="hover:text-white transition">Sky Watcher</button>

          {/* Matches showGuardian (0.60 - 0.84) */}
          <button onClick={() => scrollToSection('earth-guardian', 0.72)} className="hover:text-white transition">Earth Guardian</button>

          <Link to="/cosmic-classroom"> Cosmic Classroom </Link>

          <button onClick={() => scrollToSection('missions', 0.85)} className="hover:text-white transition">Missions</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-white/70">
                {user.displayName}
              </span>
              <img
                src={user.avatar}
                alt="User"
                className="h-8 w-8 rounded-full border border-emerald-500/50 shadow-glow"
              />
              <button
                onClick={logout}
                className="text-xs text-white/50 hover:text-white ml-2 transition uppercase tracking-tighter"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <GlassButton variant="outline">Login</GlassButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}