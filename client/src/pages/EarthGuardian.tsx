import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import Footer from "../components/Footer";
import GlassButton from "../components/GlassButton";

const monitorStats = [
  { label: "Climate Risk", value: "High", percent: 82, tone: "from-rose-400 to-red-500" },
  { label: "Temperature Rise", value: "+1.2°C", percent: 68, tone: "from-amber-300 to-orange-500" },
  { label: "Forest Loss", value: "10M ha/year", percent: 58, tone: "from-emerald-300 to-teal-500" },
  { label: "Biodiversity Risk", value: "Critical", percent: 76, tone: "from-violet-300 to-fuchsia-500" },
];

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

export default function EarthGuardian() {
  const actionButtons = useMemo(
    () => [
      { label: "Join Guardian Squad", variant: "glow" as const },
      { label: "Take Eco Pledge", variant: "outline" as const },
      { label: "Track Green Habits", variant: "outline" as const },
    ],
    []
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Earth Guardian</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-emerald-200 via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,220,190,0.35)]">
              Earth Guardian
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Protecting Earth starts with perspective. Watch our living planet, monitor its health,
              and join missions that safeguard the only home we have.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr_1fr] items-start">
          <div className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 starfield opacity-30" />
            <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                Why Protect Earth?
              </div>
              <h2 className="text-2xl font-semibold mt-4">Our Planet, Our Promise</h2>
              <p className="text-sm text-white/70 mt-3 leading-relaxed">
                From orbit, Earth glows like a fragile oasis. Climate resilience, forest regeneration,
                and sustainable innovation are our shared mission. Space-based data helps us see change
                early, act faster, and protect life for future generations.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(120,230,190,0.9)]" />
                  Climate intelligence for local action.
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(120,210,255,0.9)]" />
                  Satellite monitoring of forests and oceans.
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(120,170,255,0.9)]" />
                  Community-led sustainability missions.
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
                Planet Health Monitor
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
                Live signals integrate satellite imagery, ground sensors, and AI forecasts to highlight
                critical action zones.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
