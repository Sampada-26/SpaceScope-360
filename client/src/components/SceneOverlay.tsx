import { motion } from "framer-motion";
import GlassButton from "./GlassButton";

export default function SceneOverlay({ progress }: { progress: number }) {
  const heroOpacity =
    progress < 0.22 ? 1 : progress < 0.32 ? 1 - (progress - 0.22) / 0.10 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* soft nebula haze */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center">
          <div className="text-xs tracking-[0.35em] text-white/60 uppercase">
            Unified Space Data → Actionable Insights
          </div>
          <h1 className="mt-5 text-5xl md:text-7xl font-semibold tracking-tight">
            SpaceScope <span className="text-white/70">360</span>
          </h1>
          <p className="mt-5 text-white/70 text-base md:text-lg">
            A cinematic mission dashboard—from space down to Earth—powered by premium, NASA-style interfaces.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 pointer-events-auto">
            <GlassButton variant="glow">Get Started</GlassButton>
            <GlassButton variant="outline">Explore Modules</GlassButton>
          </div>

          <div className="mt-10 text-xs text-white/50">
            Scroll to descend • Orbit → Earth → Learning layer
          </div>
        </div>
      </motion.div>
    </div>
  );
}
