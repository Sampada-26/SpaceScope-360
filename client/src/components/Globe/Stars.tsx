import { Stars as DreiStars } from "@react-three/drei";

export default function Stars() {
  return (
    <>
      <DreiStars radius={160} depth={90} count={12000} factor={3.2} saturation={0} fade speed={0.35} />
      <DreiStars radius={70} depth={40} count={3500} factor={1.25} saturation={0} fade speed={0.7} />
    </>
  );
}
