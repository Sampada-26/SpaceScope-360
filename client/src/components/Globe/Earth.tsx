import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

export default function Earth({
  earthScale = 1,
  rotationSpeed = 0.08
}: {
  earthScale?: number;
  rotationSpeed?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const day = useLoader(THREE.TextureLoader, "/textures/earth_day.jpg");
  const night = useLoader(THREE.TextureLoader, "/textures/earth_night.png");
  const clouds = useLoader(THREE.TextureLoader, "/textures/earth_clouds.png");

  day.colorSpace = THREE.SRGBColorSpace;
  night.colorSpace = THREE.SRGBColorSpace;
  clouds.colorSpace = THREE.SRGBColorSpace;


  useMemo(() => {
    clouds.wrapS = clouds.wrapT = THREE.RepeatWrapping;
    clouds.repeat.set(1, 1);
    clouds.anisotropy = 8;
  }, [clouds]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * rotationSpeed;

    // clouds rotate slightly faster
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * (rotationSpeed * 1.25);
  });

  return (
    <group ref={group} scale={earthScale}>
      {/* Earth surface */}
      <mesh>
        <sphereGeometry args={[1.15, 128, 128]} />
        <meshStandardMaterial
          map={day}
          roughness={0.95}
          metalness={0.02}
          emissiveMap={night}
          emissive={new THREE.Color("#9bd3ff")}
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* Clouds (transparent) */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.175, 128, 128]} />
        <meshStandardMaterial
          map={clouds}
          transparent
          opacity={0.35}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere glow (cheap, effective) */}
      <mesh>
        <sphereGeometry args={[1.22, 96, 96]} />
        <meshBasicMaterial color="#4fa9ff" transparent opacity={0.10} />
      </mesh>
    </group>
  );
}
