import { Link } from "react-router-dom";
import { MapPin, Satellite, Sparkles } from "lucide-react";
import Footer from "../../components/Footer";

const cards = [
  {
    title: "3D Constellations",
    description: "Explore glowing star patterns in an immersive, interactive 3D view.",
    to: "/sky-watcher/constellations",
    Icon: Sparkles,
  },
  {
    title: "Stargazing Spots",
    description: "Filter locations by light pollution, season, and region.",
    to: "/sky-watcher/stargazing-spots",
    Icon: MapPin,
  },
  {
    title: "Live Satellite Tracker",
    description: "Track satellites with stylized orbit paths and telemetry panels.",
    to: "/sky-watcher/satellite-tracker",
    Icon: Satellite,
  },
];

export default function SkyWatcherLanding() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: "url(/textures/earth_night.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Sky Watcher</p>
          <h1 className="text-4xl md:text-5xl font-semibold mt-4 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(120,190,255,0.35)]">
            Explore the Night Sky in 3D
          </h1>
          <p className="text-white/70 mt-4">
            Navigate constellations, discover pristine stargazing locations, and monitor satellites in a
            futuristic command center.
          </p>
        </div>

        <div className="mt-10 glass rounded-[32px] p-6 md:p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 starfield opacity-60" />
          <div className="absolute -top-24 -right-16 h-52 w-52 rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative z-10 grid gap-6 md:grid-cols-3">
            {cards.map(({ title, description, to, Icon }) => (
              <Link
                key={title}
                to={to}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 md:p-7 hover:-translate-y-1 hover:border-white/40 transition min-h-[220px]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_20%_20%,rgba(120,160,255,0.25),transparent_55%)]" />
                <div className="relative z-10 h-14 w-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white shadow-glow glow-ring">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="relative z-10 mt-5 text-xl font-semibold text-white">{title}</div>
                <p className="relative z-10 text-sm text-white/70 mt-3">{description}</p>
                <div className="relative z-10 mt-6 text-xs text-cyan-200/80">Open module →</div>
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
