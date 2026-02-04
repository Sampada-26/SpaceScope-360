import GlassCard from "../components/GlassCard";
import Footer from "../components/Footer";

import aboutImage from "../assets/aboutus.jpg";

type Hotspot = { x: number; y: number; size?: "sm" | "md" | "lg" };

const hotspots: Hotspot[] = [
  { x: 18, y: 40, size: "md" },
  { x: 24, y: 56, size: "sm" },
  { x: 33, y: 45, size: "lg" },
  { x: 44, y: 32, size: "sm" },
  { x: 52, y: 48, size: "md" },
  { x: 61, y: 40, size: "sm" },
  { x: 68, y: 52, size: "md" },
  { x: 77, y: 38, size: "lg" },
  { x: 83, y: 58, size: "sm" },
  { x: 72, y: 68, size: "md" },
  { x: 40, y: 70, size: "sm" },
];

function Dot({ x, y, size = "md" }: Hotspot) {
  const s =
    size === "sm"
      ? "h-1.5 w-1.5"
      : size === "lg"
        ? "h-2.5 w-2.5"
        : "h-2 w-2";

  const ring =
    size === "sm" ? "h-5 w-5" : size === "lg" ? "h-8 w-8" : "h-6 w-6";

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        className={`absolute ${ring} rounded-full border border-cyan-300/35 animate-ping`}
      />
      <span className={`absolute ${ring} rounded-full border border-cyan-300/25`} />
      <span
        className={`${s} rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]`}
      />
    </div>
  );
}

function GlobalCoverage() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black px-6 md:px-8 py-8">
      <div className="text-center">
        <div className="text-white/60 text-xs tracking-[0.35em] uppercase">
          Global Coverage
        </div>

        <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
          Visibility across the Globe
        </h2>

        <p className="mt-3 text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
          Location-aware visibility for sky events and mission context, presented
          clearly without visual noise.
        </p>
      </div>

      <div className="mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
          <img
            src="/textures/earth_night.png"
            alt="Global coverage map"
            className="w-full h-auto opacity-90"
            loading="lazy"
          />

          <div className="absolute inset-0">
            {hotspots.map((h, i) => (
              <Dot key={i} {...h} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="relative z-10 px-6 md:px-12 pt-28 pb-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] items-start">
          <GlassCard title="About SpaceScope 360">
            <div className="space-y-5">
              <img
                src={aboutImage}
                alt="About SpaceScope 360"
                className="w-full h-auto rounded-2xl border border-white/10"
                loading="lazy"
              />

              <div>
                <h1 className="mt-3 text-lg md:text-xl font-medium text-white leading-tight">
                  From space data to real insight.
                </h1>



                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  SpaceScope 360 brings space events, missions, and Earth-focused satellite insights 
                  into one platform -
                  making complex information easy to understand and act on.
                </p>
              </div>

              <div className="text-xs text-white/50">
                Explore • Learn • Stay Connected
              </div>
            </div>
          </GlassCard>

          <GlobalCoverage />
        </section>

        <Footer />
      </div>
    </main>
  );
}
