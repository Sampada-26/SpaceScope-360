import GlassCard from "../components/GlassCard";

export default function CosmicClassroom({ visible }: { visible: boolean }) {
  return (
    <div
      id="classroom"
      className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-2xl w-full space-y-4">
        <GlassCard title="The Cosmic Classroom" className="hud-grid">
          <div className="text-2xl font-semibold leading-tight">
            Learn space like a mission specialist.
          </div>
          <p className="mt-2 text-white/75 text-sm">
            Scrollable Apollo → Artemis timeline, interactive facts, and quizzes with rank badges.
          </p>

          <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-white/60">Timeline</div>
              <div className="mt-1 font-semibold">Apollo → Artemis</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-white/60">Badge</div>
              <div className="mt-1 font-semibold">Cadet → Commander</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-white/60">Facts</div>
              <div className="mt-1 font-semibold">Tap to reveal</div>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60">
            Gamified UI • Time tunnel • Clickable satellite facts • Premium learning layer
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
