import GlassCard from "../components/GlassCard";

export default function SkyWatcher({ visible }: { visible: boolean }) {
  return (
    <div
      id="sky"
      className={`absolute inset-0 flex items-center justify-end px-6 md:px-12 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-md w-full space-y-4">
        <GlassCard title="The Sky Watcher" className="hud-grid">
          <div className="text-2xl font-semibold leading-tight">
            Orbital awareness, in real time.
          </div>
          <p className="mt-2 text-white/75 text-sm">
            Track satellites, station passes, and risk zones with HUD overlays and smart alerts.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <div className="glass rounded-xl p-3">
              <div className="text-white/60">ISS</div>
              <div className="mt-1 font-semibold">Visible</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-white/60">Satellites</div>
              <div className="mt-1 font-semibold">12 nearby</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-white/60">Alert</div>
              <div className="mt-1 font-semibold">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Green
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60">
            Smart notifications based on location • Radar • Orbit rings • HUD
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
