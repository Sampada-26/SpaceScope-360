import GlassCard from "./GlassCard";
import GlassButton from "./GlassButton";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="relative z-10">
      <div className="px-6 md:px-12 pb-16 pt-12">
        <div className="mx-auto max-w-6xl">
          <GlassCard title="Mission Control">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <div className="text-xl font-semibold text-white">
                  SpaceScope 360
                </div>

                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  SpaceScope 360 centralizes space events, mission timelines, and
                  Earth intelligence into one interactive experience for everyone.
                </p>

                <div className="mt-5 flex gap-3 pointer-events-auto">
                  <Link to="/get-started">
                    <GlassButton variant="glow">Get Started</GlassButton>
                  </Link>

                  <Link to="/contact">
                    <GlassButton variant="outline">Contact</GlassButton>
                  </Link>
                </div>
              </div>

              <div className="text-sm">
                <div className="text-white/80 font-medium">Modules</div>
                <ul className="mt-3 space-y-2 text-white/70">
                  <li className="hover:text-white transition">
                    <Link to="/sky-watcher">Sky Watcher</Link>
                  </li>

                  <li className="hover:text-white transition">
                    <Link to="/earth-guardian">Earth Guardian</Link>
                  </li>

                  <li className="hover:text-white transition">
                    <Link to="/cosmic-classroom">Cosmic Classroom</Link>
                  </li>

                  <li className="hover:text-white transition">
                    <Link to="/community">Community</Link>
                  </li>
                </ul>
              </div>

              <div className="text-sm">
                <div className="text-white/80 font-medium">Legal</div>
                <ul className="mt-3 space-y-2 text-white/70">
                  <li className="hover:text-white transition">
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>

                  <li className="hover:text-white transition">
                    <Link to="/terms">Terms</Link>
                  </li>

                  <li className="hover:text-white transition">
                    <Link to="/status">Status</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
              <p>© {new Date().getFullYear()} SpaceScope 360. All rights reserved.</p>

              <p className="tracking-wide">
                Explore • Learn • Stay Connected with the Universe
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </footer>
  );
}