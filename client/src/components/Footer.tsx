import GlassCard from "./GlassCard";
import GlassButton from "./GlassButton";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 md:px-12 pb-16 pt-28">
      <div className="mx-auto max-w-6xl">
        <GlassCard title="Mission Control">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-xl font-semibold text-white">SpaceScope 360</div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                Unified space + Earth intelligence—alerts, education, and missions—built for everyone.
              </p>
              <div className="mt-5 flex gap-3 pointer-events-auto">
                <GlassButton variant="glow">Get Started</GlassButton>
                <GlassButton variant="outline">Contact</GlassButton>
              </div>
            </div>

            <div className="text-sm">
              <div className="text-white/80 font-medium">Modules</div>
              <ul className="mt-3 space-y-2 text-white/70">
                <li>Sky Watcher</li>
                <li>Earth Guardian</li>
                <li>Cosmic Classroom</li>
                <li>Missions</li>
              </ul>
            </div>

            <div className="text-sm">
              <div className="text-white/80 font-medium">Legal</div>
              <ul className="mt-3 space-y-2 text-white/70">
                <li>Privacy Policy</li>
                <li>Terms</li>
                <li>Status</li>
              </ul>
              <div className="mt-6 text-white/50 text-xs">
                © {new Date().getFullYear()} SpaceScope 360 - All rights reserved.
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
}
