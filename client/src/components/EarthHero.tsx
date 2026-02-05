import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Put these in: public/textures/earth_day.jpg and public/textures/earth_clouds.png
  const [earthMap, cloudsMap] = useTexture([
    "/textures/earth_day.jpg",
    "/textures/earth_clouds.png",
  ]);

  useMemo(() => {
    earthMap.colorSpace = THREE.SRGBColorSpace;
    earthMap.anisotropy = 8;

    cloudsMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.anisotropy = 8;
  }, [earthMap, cloudsMap]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          emissive="#1b4b7a"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Clouds */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.38, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.35}
          depthWrite={false}
          emissive="#66ccff"
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

export default function EarthHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 2, 6]} intensity={1.35} />
        <pointLight position={[-6, -2, -2]} intensity={0.6} />

        <Stars radius={100} depth={50} count={4200} factor={3.8} fade speed={0.25} />

        <group position={[0, -0.1, 0]}>
          <Earth />
        </group>
      </Canvas>

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
    </div>
  );
}
