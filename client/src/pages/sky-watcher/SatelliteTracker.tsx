import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { Mesh } from "three";
import Footer from "../../components/Footer";
import { useUi } from "../../context/UiContext";

const satellites = [
  {
    name: "ISS",
    type: "Research",
    launchYear: "1998",
    orbit: "Low Earth Orbit",
    speed: "7.66 km/s",
    image: "/iss.jpg",
    shortDescription: "Crewed orbital lab for microgravity science and Earth observation.",
    description:
      "A modular research outpost hosting long-duration missions and Earth observation experiments.",
    details:
      "Crewed continuously since 2000. Hosts international science labs, solar arrays, and docking ports for visiting spacecraft. Conducts microgravity research, Earth imaging, and technology demos.",
  },
  {
    name: "Hubble",
    type: "Research",
    launchYear: "1990",
    orbit: "Low Earth Orbit",
    speed: "7.5 km/s",
    image: "/hubble.webp",
    shortDescription: "Iconic space telescope capturing deep-field imagery.",
    description:
      "A legendary space telescope capturing deep-field images and distant galaxies.",
    details:
      "Observes in ultraviolet, visible, and near-infrared. Delivered iconic deep-field imagery and refined the Hubble constant. Serviced multiple times by astronauts.",
  },
  {
    name: "Starlink-4021",
    type: "Communication",
    launchYear: "2023",
    orbit: "Low Earth Orbit",
    speed: "7.8 km/s",
    image: "/Starlink.webp",
    shortDescription: "Broadband relay node in a global internet constellation.",
    description:
      "A broadband relay satellite supporting global connectivity and low-latency networks.",
    details:
      "Part of a large constellation providing global internet coverage. Uses phased array antennas, ion thrusters for station keeping, and inter-satellite laser links.",
  },
];

function OrbitingSatellite() {
  const satellite = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (satellite.current) {
      satellite.current.position.x = Math.cos(t * 0.6) * 1.8;
      satellite.current.position.z = Math.sin(t * 0.6) * 1.8;
      satellite.current.position.y = Math.sin(t * 0.4) * 0.4;
      satellite.current.rotation.y = t * 1.2;
    }
  });

  return (
    <mesh ref={satellite}>
      <boxGeometry args={[0.16, 0.1, 0.24]} />
      <meshStandardMaterial color="#b7d7ff" emissive="#7fb3ff" emissiveIntensity={1.1} />
    </mesh>
  );
}

function EarthSphere() {
  const [colorMap, nightMap] = useTexture([
    "/textures/earth_day.jpg",
    "/textures/earth_night.png",
  ]);

  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        emissiveMap={nightMap}
        emissive="#1e5cff"
        emissiveIntensity={1.35}
        roughness={0.35}
        metalness={0.15}
      />
    </mesh>
  );
}

export default function SatelliteTracker() {
  const { t } = useUi();

  const [query, setQuery] = useState("");

  const activeSatellite = useMemo(() => {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return null;
    return satellites.find((sat) => sat.name.toLowerCase().includes(cleaned)) || null;
  }, [query]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
              {t("Sky Watcher")}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,190,255,0.35)]">
              {t("Live Satellite Tracker")}
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              {t(
                "Monitor satellites orbiting Earth with a sleek, real-time styled tracking interface."
              )}
            </p>
          </div>

          <div className="glass rounded-full px-4 py-2 flex items-center gap-2 w-full md:w-[320px]">
            <Search className="h-4 w-4 text-cyan-200/80" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("Search satellite (e.g., ISS, Hubble)")}
              className="bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="glass rounded-3xl p-4 md:p-6 relative overflow-hidden min-h-[420px]">
            <div className="absolute inset-0 starfield opacity-60" />
            <div className="absolute -top-20 -left-10 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative z-10 h-[360px] md:h-[460px] rounded-2xl overflow-hidden border border-white/10">
              <Canvas camera={{ position: [0, 1.1, 3], fov: 50 }}>
                <ambientLight intensity={1.15} />
                <pointLight position={[2, 2, 2]} intensity={2.3} />
                <directionalLight position={[-3, 1.5, 2]} intensity={1.6} />
                <Stars radius={60} depth={30} count={1400} factor={2.5} fade />

                <EarthSphere />

                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[1.6, 0.02, 16, 120]} />
                  <meshStandardMaterial color="#4cc9ff" emissive="#4cc9ff" emissiveIntensity={0.8} />
                </mesh>

                <OrbitingSatellite />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
              {t("Telemetry")}
            </div>
            {activeSatellite ? (
              <>
                <div className="text-xl font-semibold mt-3">{activeSatellite.name}</div>
                <div className="mt-4 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/60">{t("Type")}</span>
                    <span>{activeSatellite.type}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/60">{t("Launch Year")}</span>
                    <span>{activeSatellite.launchYear}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/60">{t("Orbit")}</span>
                    <span>{activeSatellite.orbit}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/60">{t("Speed")}</span>
                    <span>{activeSatellite.speed}</span>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-4">{activeSatellite.shortDescription}</p>
              </>
            ) : (
              <>
                <div className="text-xl font-semibold mt-3">{t("Awaiting Signal")}</div>
                <p className="text-sm text-white/60 mt-3">
                  {t("Search for a satellite to reveal its mission type, orbit, and velocity.")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {satellites.map((sat) => (
                    <button
                      key={sat.name}
                      type="button"
                      className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition"
                      onClick={() => setQuery(sat.name)}
                    >
                      {sat.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {activeSatellite && (
          <div className="mt-10 glass rounded-3xl p-6 border border-white/10">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Satellite Profile</div>
            <div className="mt-5 grid gap-6 md:grid-cols-[1.1fr_1.4fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <img
                  src={activeSatellite.image}
                  alt={`${activeSatellite.name} satellite`}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{activeSatellite.name}</div>
                <div className="text-sm text-white/60 mt-1">{activeSatellite.type}</div>
                <p className="text-base md:text-lg text-white/80 mt-4">{activeSatellite.description}</p>
                <p className="text-base md:text-lg text-white/80 mt-4">{activeSatellite.details}</p>
                <div className="mt-4 grid gap-2 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/60">Launch Year</span>
                    <span>{activeSatellite.launchYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Orbit</span>
                    <span>{activeSatellite.orbit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Speed</span>
                    <span>{activeSatellite.speed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
