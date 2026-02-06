import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { Mesh } from "three";
import Footer from "../components/Footer";
import GlassButton from "../components/GlassButton";
import { useUi } from "../context/UiContext";

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: `particle-${index}`,
  size: 2 + (index % 4),
  left: `${6 + index * 6}%`,
  top: `${10 + (index % 6) * 12}%`,
  delay: index * 0.4,
}));

function OrbitingSatellite({ radius, speed, offset }: { radius: number; speed: number; offset: number }) {
  const satellite = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (satellite.current) {
      satellite.current.position.x = Math.cos(t) * radius;
      satellite.current.position.z = Math.sin(t) * radius;
      satellite.current.position.y = Math.sin(t * 0.6) * 0.2;
      satellite.current.rotation.y = t * 1.4;
    }
  });

  return (
    <mesh ref={satellite}>
      <boxGeometry args={[0.08, 0.05, 0.12]} />
      <meshStandardMaterial color="#cfe6ff" emissive="#79b7ff" emissiveIntensity={0.9} />
    </mesh>
  );
}

function EarthSphere() {
  const [dayMap, nightMap, clouds] = useTexture([
    "/textures/earth_day.jpg",
    "/textures/earth_night.png",
    "/textures/earth_clouds.png",
  ]);

  return (
    <group>
      <mesh rotation={[0, Math.PI * 0.6, 0]}>
        <sphereGeometry args={[1.08, 72, 72]} />
        <meshStandardMaterial
          map={dayMap}
          emissiveMap={nightMap}
          emissive="#2c66ff"
          emissiveIntensity={0.85}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.105, 72, 72]} />
        <meshStandardMaterial
          map={clouds}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.18, 72, 72]} />
        <meshBasicMaterial color="#54a8ff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

<<<<<<< HEAD
type CosmicDefaults = {
  solarActivity: string;
  solarWindSpeed: string;
  geomagneticLevel: string;
  solarFlareRisk: string;
  cosmicRadiation: string;
};

type ImpactDefaults = {
  satelliteDisruption: string;
  gpsAccuracy: string;
  powerGridRisk: string;
  auroraChance: string;
};

type DisasterDefaults = {
  floodWatch: string;
  activeFireLines: string;
  evacuationRoutes: string;
};

const COSMIC_DEFAULTS: CosmicDefaults = {
  solarActivity: "High",
  solarWindSpeed: "520 km/s",
  geomagneticLevel: "KP 6",
  solarFlareRisk: "Elevated",
  cosmicRadiation: "Moderate",
};

const IMPACT_DEFAULTS: ImpactDefaults = {
  satelliteDisruption: "Medium",
  gpsAccuracy: "Slightly Affected",
  powerGridRisk: "Low",
  auroraChance: "High",
};

const DISASTER_DEFAULTS: DisasterDefaults = {
  floodWatch: "Rivers rising near town centers",
  activeFireLines: "Hotspots detected near forest edge",
  evacuationRoutes: "Safer roads highlighted by terrain models",
};

const riskToneMap: Record<string, string> = {
  Low: "from-emerald-300/25 to-teal-500/25",
  Moderate: "from-amber-300/25 to-orange-500/25",
  Medium: "from-amber-300/25 to-orange-500/25",
  "Slightly Affected": "from-amber-300/25 to-orange-500/25",
  Elevated: "from-rose-300/25 to-pink-500/25",
  High: "from-rose-400/30 to-red-500/30",
  "Very High": "from-rose-400/30 to-red-500/30",
};

function SolarWindParticles() {
  const particlesRef = useRef<Mesh[]>([]);
  const particleData = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: `wind-${index}`,
        offset: index * 0.28,
        radius: 0.015 + (index % 5) * 0.004,
        lane: (index % 6) * 0.05 - 0.12,
      })),
    []
=======
export default function EarthGuardian() {
  const { t } = useUi();
  const monitorStats = useMemo(
    () => [
      { label: t("Climate Risk"), value: t("High"), percent: 82, tone: "from-rose-400 to-red-500" },
      { label: t("Temperature Rise"), value: "+1.2°C", percent: 68, tone: "from-amber-300 to-orange-500" },
      { label: t("Forest Loss"), value: t("10M ha/year"), percent: 58, tone: "from-emerald-300 to-teal-500" },
      { label: t("Biodiversity Risk"), value: t("Critical"), percent: 76, tone: "from-violet-300 to-fuchsia-500" },
    ],
    [t]
  );

  const actionButtons = useMemo(
    () => [
      { label: t("Join Guardian Squad"), variant: "glow" as const },
      { label: t("Take Eco Pledge"), variant: "outline" as const },
      { label: t("Track Green Habits"), variant: "outline" as const },
    ],
    [t]
>>>>>>> a6bc9fc (fix)
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particlesRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const data = particleData[index];
      const progress = (t * 0.5 + data.offset) % 1;
      mesh.position.x = -1.6 + progress * 3.2;
      mesh.position.y = data.lane + Math.sin((t + data.offset) * 1.2) * 0.03;
      mesh.position.z = Math.cos((t + data.offset) * 0.8) * 0.08;
      mesh.scale.setScalar(0.8 + Math.sin((t + data.offset) * 2) * 0.2);
    });
  });

  return (
    <group>
      {particleData.map((particle, index) => (
        <mesh
          key={particle.id}
          ref={(el) => {
            if (el) particlesRef.current[index] = el;
          }}
        >
          <sphereGeometry args={[particle.radius, 12, 12]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function SunEarthSystem() {
  const earthRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group>
      <mesh position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f97316" emissiveIntensity={1.3} />
      </mesh>
      <mesh ref={earthRef} position={[0.7, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.7, 0, 0]}>
        <torusGeometry args={[0.55, 0.015, 16, 120]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0.7, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.012, 16, 120]} />
        <meshStandardMaterial color="#a5f3fc" emissive="#67e8f9" emissiveIntensity={0.6} />
      </mesh>
      <SolarWindParticles />
    </group>
  );
}

function RiskIcon({ tone }: { tone: string }) {
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br ${tone}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 20h20L12 2z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M12 9v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.2" fill="white" />
      </svg>
    </span>
  );
}

export default function EarthGuardian() {
  const { t } = useUi();
  const monitorStats = useMemo(
    () => [
      { label: t("Climate Risk"), value: t("High"), percent: 82, tone: "from-rose-400 to-red-500" },
      { label: t("Temperature Rise"), value: "+1.2°C", percent: 68, tone: "from-amber-300 to-orange-500" },
      { label: t("Forest Loss"), value: t("10M ha/year"), percent: 58, tone: "from-emerald-300 to-teal-500" },
      { label: t("Biodiversity Risk"), value: t("Critical"), percent: 76, tone: "from-violet-300 to-fuchsia-500" },
    ],
    [t]
  );

  const actionButtons = useMemo(
    () => [
      { label: t("Join Guardian Squad"), variant: "glow" as const },
      { label: t("Take Eco Pledge"), variant: "outline" as const },
      { label: t("Track Green Habits"), variant: "outline" as const },
    ],
    [t]
  );

  const cosmicSectionRef = useRef<HTMLDivElement | null>(null);
  const [cosmicData] = useState<CosmicDefaults>(COSMIC_DEFAULTS);
  const [impactData] = useState<ImpactDefaults>(IMPACT_DEFAULTS);
  const [disasterData] = useState<DisasterDefaults>(DISASTER_DEFAULTS);
  const [sliderValue, setSliderValue] = useState(55);
  const { scrollYProgress } = useScroll({
    target: cosmicSectionRef,
    offset: ["start end", "end start"],
  });
  const leftParallax = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const centerParallax = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rightParallax = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const isHighRisk = cosmicData.geomagneticLevel.toLowerCase().includes("kp 6");
  const sliderCaption =
    sliderValue < 45
      ? "Crop health looks stable with strong vegetation signals."
      : sliderValue > 65
        ? "Thermal alerts highlight active fire growth zones."
        : "Balanced view: crops and fire monitoring side-by-side.";

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">{t("Earth Guardian")}</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-emerald-200 via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,220,190,0.35)]">
              {t("Earth Guardian")}
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              {t(
                "Protecting Earth starts with perspective. Watch our living planet, monitor its health, and join missions that safeguard the only home we have."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr_1fr] items-start">
          <div className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 starfield opacity-30" />
            <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                {t("Why Protect Earth?")}
              </div>
              <h2 className="text-2xl font-semibold mt-4">{t("Our Planet, Our Promise")}</h2>
              <p className="text-sm text-white/70 mt-3 leading-relaxed">
                {t(
                  "From orbit, Earth glows like a fragile oasis. Climate resilience, forest regeneration, and sustainable innovation are our shared mission. Space-based data helps us see change early, act faster, and protect life for future generations."
                )}
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(120,230,190,0.9)]" />
                  {t("Climate intelligence for local action.")}
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(120,210,255,0.9)]" />
                  {t("Satellite monitoring of forests and oceans.")}
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(120,170,255,0.9)]" />
                  {t("Community-led sustainability missions.")}
                </div>
              </div>
            </div>
          </div>

          <div className="relative glass rounded-3xl p-6 border border-white/10 overflow-hidden min-h-[420px]">
            <div className="absolute inset-0 starfield opacity-50" />
            <div className="absolute -top-20 right-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-24 left-6 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute rounded-full bg-white/40"
                style={{ width: particle.size, height: particle.size, left: particle.left, top: particle.top }}
                animate={{ y: [0, -12, 0], opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, delay: particle.delay }}
              />
            ))}

            <div className="relative z-10 h-[360px] md:h-[440px] rounded-2xl border border-white/10 overflow-hidden">
              <Canvas camera={{ position: [0, 0.6, 3.2], fov: 48 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[2, 2, 2]} intensity={1.6} />
                <pointLight position={[-2, -1, 2]} intensity={0.8} />
                <Stars radius={40} depth={20} count={1200} factor={2.2} fade />
                <group rotation={[0, 0.6, 0]}>
                  <EarthSphere />
                  <OrbitingSatellite radius={1.55} speed={0.7} offset={0.2} />
                  <OrbitingSatellite radius={1.75} speed={0.5} offset={1.4} />
                  <OrbitingSatellite radius={1.9} speed={0.4} offset={2.1} />
                </group>
                <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.3} />
              </Canvas>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {actionButtons.map((button) => (
                <GlassButton key={button.label} variant={button.variant}>
                  {button.label}
                </GlassButton>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 starfield opacity-30" />
            <div className="absolute -top-16 -right-12 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                {t("Planet Health Monitor")}
              </div>
              <div className="mt-5 space-y-4">
                {monitorStats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{stat.label}</span>
                      <span className="text-white/90 font-semibold">{stat.value}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percent}%` }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${stat.tone} shadow-[0_0_12px_rgba(120,200,255,0.6)]`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                {t(
                  "Live signals integrate satellite imagery, ground sensors, and AI forecasts to highlight critical action zones."
                )}
<<<<<<< HEAD
              </div>
            </div>
          </div>
        </div>

        <div ref={cosmicSectionRef} className="mt-16">
          {isHighRisk && (
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100 shadow-[0_10px_30px_rgba(15,23,42,0.35)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-300/60 bg-rose-500/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 20h20L12 2z"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M12 9v5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="12" cy="17" r="1.2" fill="white" />
                </svg>
              </span>
              <span className="uppercase tracking-[0.25em] text-[10px] text-rose-200/80">
                Space Storm Alert
              </span>
              <span className="text-white font-semibold">Geomagnetic Storm Level G3</span>
            </motion.div>
          )}

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Cosmic Weather</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent">
                Cosmic Weather
              </h2>
              <p className="text-white/70 mt-2 max-w-xl">
                Think of this like a space forecast. It tells us how the Sun’s activity can affect
                satellites, GPS, and power lines on Earth.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.45fr_1fr] items-start">
            <motion.div
              style={{ y: leftParallax }}
              className="glass rounded-3xl border border-white/10 p-6 relative overflow-hidden shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:perspective(900px)_translateY(-6px)_rotateX(2deg)_rotateY(-2deg)]"
            >
              <div className="absolute inset-0 starfield opacity-30" />
              <div className="absolute -top-14 -left-14 h-36 w-36 rounded-full bg-cyan-400/8 blur-3xl" />
              <div className="relative z-10 space-y-5">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Cosmic Weather Dashboard
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Solar Activity Index</span>
                      <span className="text-white font-semibold">{cosmicData.solarActivity}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full border border-white/15">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-1 rounded-full border border-cyan-300/30"
                        />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-300/25 to-orange-500/25" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            animate={{ width: ["72%", "78%", "72%"] }}
                            transition={{ duration: 3.2, repeat: Infinity }}
                            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-500"
                          />
                        </div>
                        <p className="text-xs text-white/60 mt-2">Elevated solar flare potential.</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Solar Wind Speed</span>
                      <span className="text-white font-semibold">{cosmicData.solarWindSpeed}</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        animate={{ width: ["55%", "68%", "55%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Geomagnetic Storm Level</span>
                      <span className="text-white font-semibold">{cosmicData.geomagneticLevel}</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        animate={{ width: ["48%", "60%", "48%"] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-500"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Solar Flare Risk</span>
                      <span className="text-white font-semibold">{cosmicData.solarFlareRisk}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <motion.div
                        animate={{ boxShadow: ["0 0 0 rgba(248,113,113,0)", "0 0 12px rgba(248,113,113,0.35)", "0 0 0 rgba(248,113,113,0)"] }}
                        transition={{ duration: 2.8, repeat: Infinity }}
                        className="h-10 w-10 rounded-full border border-rose-200/50"
                      />
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            animate={{ width: ["40%", "55%", "40%"] }}
                            transition={{ duration: 3.8, repeat: Infinity }}
                            className="h-full rounded-full bg-gradient-to-r from-rose-300 to-pink-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Cosmic Radiation Level</span>
                      <span className="text-white font-semibold">{cosmicData.cosmicRadiation}</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        animate={{ width: ["45%", "52%", "45%"] }}
                        transition={{ duration: 4.5, repeat: Infinity }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-300 to-fuchsia-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: centerParallax }}
              className="relative glass rounded-3xl border border-white/10 p-6 overflow-hidden min-h-[420px] shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:perspective(900px)_translateY(-6px)_rotateX(2deg)_rotateY(2deg)]"
            >
              <div className="absolute inset-0 starfield opacity-50" />
              <div className="absolute -top-16 right-6 h-40 w-40 rounded-full bg-amber-400/12 blur-3xl" />
              <div className="absolute -bottom-20 left-6 h-44 w-44 rounded-full bg-blue-500/12 blur-3xl" />
              <div className="relative z-10 h-[360px] md:h-[440px] rounded-2xl border border-white/10 overflow-hidden">
                <Canvas camera={{ position: [0, 0.2, 3.2], fov: 50 }}>
                  <ambientLight intensity={0.7} />
                  <pointLight position={[2, 2, 2]} intensity={1.2} />
                  <pointLight position={[-2, -1, 2]} intensity={0.8} />
                  <Stars radius={40} depth={20} count={1000} factor={2.4} fade />
                  <SunEarthSystem />
                  <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
                </Canvas>
              </div>
            </motion.div>

            <motion.div
              style={{ y: rightParallax }}
              className="glass rounded-3xl border border-white/10 p-6 relative overflow-hidden shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:perspective(900px)_translateY(-6px)_rotateX(2deg)_rotateY(-2deg)]"
            >
              <div className="absolute inset-0 starfield opacity-30" />
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-400/12 blur-3xl" />
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                  Impact on Earth
                </div>
                <div className="mt-5 grid gap-4">
                  {[
                    {
                      label: "Satellite Disruption",
                      risk: impactData.satelliteDisruption,
                    },
                    {
                      label: "GPS Accuracy",
                      risk: impactData.gpsAccuracy,
                    },
                    {
                      label: "Power Grid Risk",
                      risk: impactData.powerGridRisk,
                    },
                    {
                      label: "Aurora Visibility",
                      risk: impactData.auroraChance,
                    },
                  ].map((card) => {
                    const tone = riskToneMap[card.risk] ?? "from-slate-400/20 to-slate-500/20";
                    return (
                      <motion.div
                        key={card.label}
                        whileHover={{ y: -3, boxShadow: "0 16px 26px rgba(15,23,42,0.4)" }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-2xl border border-white/10 bg-gradient-to-br ${tone} p-4 backdrop-blur-xl transition-transform duration-300 hover:[transform:perspective(700px)_translateY(-4px)_rotateX(1deg)_rotateY(-1deg)]`}
                      >
                        <div className="flex items-center gap-3">
                          <RiskIcon tone={tone} />
                          <div>
                            <div className="text-sm text-white/80">{card.label}</div>
                            <div className="text-lg font-semibold text-white">{card.risk}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-emerald-400/10 to-cyan-500/10 px-6 py-5 relative overflow-hidden shadow-[0_16px_40px_rgba(2,6,23,0.35)]">
            <motion.div
              animate={{ x: ["-10%", "10%", "-10%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[linear-gradient(120deg,rgba(16,185,129,0.08),rgba(34,197,94,0.18),rgba(16,185,129,0.08))] blur-2xl"
            />
            <div className="relative z-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">
                Aurora Preview
              </div>
              <div className="text-white/85">
                High chance of Aurora in: Norway, Iceland, Alaska, Canada
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="glass rounded-3xl border border-white/10 p-6 relative overflow-hidden shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:perspective(900px)_translateY(-6px)_rotateX(2deg)_rotateY(-2deg)]">
              <div className="absolute inset-0 starfield opacity-20" />
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Twin-View Slider
                </div>
                <h3 className="text-2xl font-semibold mt-3 text-white">
                  See how satellites help on the ground
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Slide to compare how satellites track healthy crops and detect wildfires early.
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>Crops</span>
                    <span>Wildfires</span>
                  </div>
                  <div className="mt-4 relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-emerald-400/15 via-cyan-400/10 to-blue-500/15">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <motion.div
                      animate={{ y: ["-20%", "120%", "-20%"] }}
                      transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-10 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.12),rgba(255,255,255,0))]"
                    />
                    <div className="absolute inset-y-0 left-0" style={{ width: `${sliderValue}%` }}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(52,211,153,0.35),transparent_55%)]" />
                      <div className="absolute left-4 top-4 rounded-full bg-emerald-300/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-100/80">
                        Satellite NDVI Data — Crop Health
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0" style={{ width: `${100 - sliderValue}%` }}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(248,113,113,0.35),transparent_55%)]" />
                      <div className="absolute right-4 top-4 rounded-full bg-rose-300/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-rose-100/80">
                        Thermal Detection — Wildfires
                      </div>
                    </div>

                    <motion.div
                      animate={{ x: [`${sliderValue - 2}%`, `${sliderValue + 2}%`, `${sliderValue - 2}%`] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 w-1 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                    />
                    <motion.div
                      animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-cyan-200/40 bg-cyan-300/10"
                      style={{ left: `calc(${sliderValue}% - 16px)` }}
                    />
                    <div className="absolute left-4 bottom-4 text-xs text-white/75">
                      Greener areas = healthy crops
                    </div>
                    <div className="absolute right-4 bottom-4 text-xs text-white/75 text-right">
                      Hot spots = active fires
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={sliderValue}
                      onChange={(event) => setSliderValue(Number(event.target.value))}
                      className="w-full accent-cyan-300"
                    />
                    <span className="text-xs text-white/60">Slide</span>
                  </div>
                  <div className="mt-3 text-xs text-white/70">{sliderCaption}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl border border-white/10 p-6 relative overflow-hidden shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:perspective(900px)_translateY(-6px)_rotateX(2deg)_rotateY(2deg)]">
              <div className="absolute inset-0 starfield opacity-20" />
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                  Disaster Maps
                </div>
                <h3 className="text-2xl font-semibold mt-3 text-white">
                  Real-time floods & fires (preview)
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Live maps help volunteers find safe routes and areas that need help fast.
                </p>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-300/20 to-cyan-500/20 p-4 relative overflow-hidden">
                    <motion.div
                      animate={{ y: ["60%", "10%", "60%"] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-x-0 bottom-0 h-10 bg-blue-400/25 blur-md"
                    />
                    <div className="relative z-10">
                      <div className="text-sm font-semibold text-white">Flood Watch</div>
                      <div className="text-xs text-white/70 mt-1">{disasterData.floodWatch}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-rose-300/20 to-orange-500/20 p-4 relative overflow-hidden">
                    <motion.div
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      className="absolute right-6 top-6 h-3 w-3 rounded-full bg-rose-300 shadow-[0_0_12px_rgba(248,113,113,0.6)]"
                    />
                    <motion.div
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 3.2, repeat: Infinity }}
                      className="absolute left-10 bottom-8 h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.6)]"
                    />
                    <div className="relative z-10">
                      <div className="text-sm font-semibold text-white">Active Fire Lines</div>
                      <div className="text-xs text-white/70 mt-1">{disasterData.activeFireLines}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-300/20 to-teal-500/20 p-4 relative overflow-hidden">
                    <motion.div
                      animate={{ x: ["-10%", "110%", "-10%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 h-0.5 w-20 bg-emerald-200/70 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
                    />
                    <div className="relative z-10">
                      <div className="text-sm font-semibold text-white">Evacuation Routes</div>
                      <div className="text-xs text-white/70 mt-1">{disasterData.evacuationRoutes}</div>
                    </div>
                  </div>
                </div>
=======
>>>>>>> a6bc9fc (fix)
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
