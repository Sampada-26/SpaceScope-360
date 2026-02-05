import { Link } from "react-router-dom";
import { useUi } from "../context/UiContext";

export default function Footer() {
  const { t } = useUi();

  return (
    <footer className="relative border-t border-white/10 bg-black mt-32">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/textures/logo.png"
                alt="SpaceScope 360 logo"
                className="h-9 w-9 object-contain"
              />
              <div className="font-semibold">
                SpaceScope <span className="text-white/70">360</span>
              </div>
            </div>

            <p className="text-sm text-white/60">
              {t(
                "Explore space events, missions, and Earth insights through satellite data — all in one place."
              )}
            </p>

            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} SpaceScope 360
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-xs text-white/60 font-semibold tracking-widest">
              {t("PLATFORM")}
            </p>

            <Link to="/sky-watcher" className="block text-sm text-white/70 hover:text-white">
              {t("Sky Watcher")}
            </Link>
            <Link to="/earth-guardian" className="block text-sm text-white/70 hover:text-white">
              {t("Earth Guardian")}
            </Link>
            <Link to="/cosmic-classroom" className="block text-sm text-white/70 hover:text-white">
              {t("Cosmic Classroom")}
            </Link>
            <Link to="/missions" className="block text-sm text-white/70 hover:text-white">
              {t("Missions")}
            </Link>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="text-xs text-white/60 font-semibold tracking-widest">
              {t("COMPANY")}
            </p>

            <Link to="/about" className="block text-sm text-white/70 hover:text-white">
              {t("About")}
            </Link>
            <Link to="/contact" className="block text-sm text-white/70 hover:text-white">
              {t("Contact")}
            </Link>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-xs text-white/60 font-semibold tracking-widest">
              {t("GET STARTED")}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
