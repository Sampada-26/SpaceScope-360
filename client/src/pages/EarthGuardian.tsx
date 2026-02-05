import GlassCard from "../components/GlassCard";

export default function EarthGuardian({ visible }: { visible: boolean }) {
  return (
    <div
      id="guardian"
      className={`absolute inset-0 flex items-center justify-start px-6 md:px-12 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-xl w-full space-y-4">
        <GlassCard title="The Earth Guardian" className="hud-grid">
          <div className="text-2xl font-semibold leading-tight">
            Disaster intelligence, localized.
          </div>
          <p className="mt-2 text-white/75 text-sm">
            Compare crops vs wildfires, monitor floods/fires, and get region-ready insights.
            Supports <span className="text-white">Hindi</span> + <span className="text-white">Marathi</span>.
          </p>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-white/60 mb-2">Twin View Slider</div>
              <div className="text-sm font-medium">Crops ↔ Wildfires</div>
              <div className="mt-2 h-20 rounded-lg bg-white/5 border border-white/10" />
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-xs text-white/60 mb-2">Hotspot Map</div>
              <div className="flex gap-2 items-center text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Active alerts
              </div>
              <div className="mt-2 h-20 rounded-lg bg-white/5 border border-white/10" />
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60">
            Satellite overlays • Glowing hotspots • Real-time tiles • Local language UX
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
