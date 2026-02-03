import { useEffect, useRef, useState } from "react";

// Smooth scroll progress [0..1] using requestAnimationFrame + lerp
export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      targetRef.current = doc.scrollTop / max;
    };

    const tick = () => {
      const alpha = 0.08;

      currentRef.current += (targetRef.current - currentRef.current) * alpha;


      if (Math.abs(targetRef.current - currentRef.current) < 0.0005) {
        currentRef.current = targetRef.current;
      }

      setProgress(currentRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}
