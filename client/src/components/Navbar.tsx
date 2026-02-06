import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUi } from "../context/UiContext";
import GlassButton from "./GlassButton";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, theme, toggleTheme, t } = useUi();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between relative">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/textures/logo.png"
            alt="SpaceScope 360 logo"
            className="h-9 w-9 object-contain"
          />
          <div className="font-semibold tracking-wide">
            SpaceScope <span className="text-white/70">360</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link to="/about" className="hover:text-white transition">{t("About")}</Link>
          <Link to="/sky-watcher" className="hover:text-white transition">{t("Sky Watcher")}</Link>
          <Link to="/earth-guardian" className="hover:text-white transition">{t("Earth Guardian")}</Link>
          <Link to="/cosmic-classroom" className="hover:text-white transition">{t("Cosmic Classroom")}</Link>
          <Link to="/missions" className="hover:text-white transition">{t("Missions")}</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">{t("Language")}</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "mr")}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-white/70">
                {user.displayName}
              </span>

              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="User"
                className="h-8 w-8 rounded-full border border-neon-cyan/50 shadow-glow"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/default-avatar.png";
                }}
              />


              <button
                onClick={logout}
                className="text-xs text-white/50 hover:text-white ml-2 transition uppercase tracking-tighter"
              >
                {t("Logout")}
              </button>
            </div>
          ) : (
            <Link to="/login">
              <GlassButton variant="outline">{t("Login")}</GlassButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
