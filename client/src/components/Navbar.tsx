import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GlassButton from "./GlassButton";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 shadow-glow group-hover:scale-105 transition duration-500" />
          <div className="font-semibold tracking-wide">
            SpaceScope <span className="text-white/70">360</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/sky-watcher" className="hover:text-white transition">
            Sky Watcher
          </Link>

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
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-white/70">
                {user.displayName}
              </span>
              <img
                src={user.avatar}
                alt="User"
                className="h-8 w-8 rounded-full border border-neon-cyan/50 shadow-glow"
              />
              <button
                onClick={logout}
                className="text-xs text-white/50 hover:text-white ml-2 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <GlassButton variant="outline">Access Console</GlassButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
