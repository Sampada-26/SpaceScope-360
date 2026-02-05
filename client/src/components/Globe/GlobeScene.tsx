import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import Earth from "./Earth";
import Stars from "./Stars";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

function Rig({ progress }: { progress: number }) {
  const params = useMemo(() => {
    // Cinematic ease-out (smooth, premium)
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const t = easeOutCubic(Math.min(1, Math.max(0, progress)));

    // Camera push-in (zoom)
    const z = THREE.MathUtils.lerp(9.8, 2.9, t);

    // Slight vertical lift
    const y = THREE.MathUtils.lerp(0.65, 1.05, t);

    // Slight horizontal pan (big Earth on side, like your reference)
    const x = THREE.MathUtils.lerp(1.35, 0.25, t);

    return { x, y, z };
  }, [progress]);

  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;

    cam.position.x = THREE.MathUtils.damp(cam.position.x, params.x, 3.8, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, params.y, 3.8, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, params.z, 3.8, delta);

    cam.lookAt(0, 0, 0);
  });

  return null;
}

export default function GlobeScene({ progress }: { progress: number }) {
  // Earth starts bigger and slightly low, then rises into view gently
  const earthRise = useMemo(() => {
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    // Only rise during early scroll for cinematic "enter orbit" feeling
    const t = ease(clamp(progress / 0.30)); // 0..0.30
    return THREE.MathUtils.lerp(-0.25, 0.12, t);
  }, [progress]);

  // Earth is slightly larger overall (so it fills screen like ref)
  const earthScale = useMemo(() => {
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    const t = ease(clamp(progress)); // 0..1
    return THREE.MathUtils.lerp(1.25, 1.55, t);
  }, [progress]);

  return (
    <div className="fixed inset-0">
      <Canvas
        camera={{ position: [1.35, 0.65, 9.8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        {/* Lighting for realistic Earth */}
        <ambientLight intensity={0.28} />
        <directionalLight position={[7, 4, 6]} intensity={2.2} />

        {/* Starfield */}
        <Stars />

        {/* Earth (off-center + large) */}
        <group position={[-1.05, earthRise, 0]} scale={earthScale}>
          <Earth earthScale={1} rotationSpeed={0.06} />
        </group>

        {/* Camera rig driven by scroll */}
        <Rig progress={progress} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Cinematic post FX */}
        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.25} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.22} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
