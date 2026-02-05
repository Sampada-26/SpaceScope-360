import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "../components/Footer";

const missions = [
  {
    title: "Sputnik 1",
    year: "1957",
    description: "The first artificial satellite, marking the start of the space age and the space race.",
  },
  {
    title: "Vostok 1",
    year: "1961",
    description: "Yuri Gagarin becomes the first human in space, completing one orbit of Earth.",
  },
  {
    title: "Apollo 11",
    year: "1969",
    description: "Humanity’s first crewed lunar landing; Armstrong and Aldrin walked on the Moon.",
  },
  {
    title: "Pioneer 10",
    year: "1972",
    description: "First spacecraft to traverse the asteroid belt and make direct observations of Jupiter.",
  },
  {
    title: "Voyager 1",
    year: "1977",
    description: "Deep-space explorer now in interstellar space, sending data from beyond the solar system.",
  },
  {
    title: "STS-1 Columbia",
    year: "1981",
    description: "The first Space Shuttle mission, testing a reusable spacecraft in orbit.",
  },
  {
    title: "Mir Space Station",
    year: "1986",
    description: "The first modular space station, hosting long-duration missions and international crews.",
  },
  {
    title: "Galileo",
    year: "1989",
    description: "Orbiter that studied Jupiter and its moons, revealing volcanic and icy worlds.",
  },
  {
    title: "Hubble Space Telescope",
    year: "1990",
    description: "Revolutionized astronomy with deep-field imagery and precise measurements of the cosmos.",
  },
  {
    title: "International Space Station",
    year: "1998",
    description: "A continuously crewed orbital laboratory for science, Earth observation, and technology demos.",
  },
  {
    title: "Mars Exploration Rovers",
    year: "2004",
    description: "Spirit and Opportunity rovers uncover evidence of ancient water on Mars.",
  },
  {
    title: "Cassini–Huygens",
    year: "2004",
    description: "Saturn orbiter and Titan lander revealing complex rings, storms, and methane lakes.",
  },
  {
    title: "Kepler",
    year: "2009",
    description: "Planet-hunting telescope that discovered thousands of exoplanet candidates.",
  },
  {
    title: "Mars Curiosity Rover",
    year: "2012",
    description: "A car-sized rover exploring Gale Crater, analyzing Martian geology and habitability.",
  },
  {
    title: "New Horizons",
    year: "2015",
    description: "First close-up flyby of Pluto and the Kuiper Belt, reshaping our view of the outer solar system.",
  },
  {
    title: "Mars Perseverance Rover",
    year: "2021",
    description: "Collecting samples and testing technologies for future human exploration of Mars.",
  },
  {
    title: "James Webb Space Telescope",
    year: "2021",
    description: "Infrared flagship observatory revealing early galaxies, exoplanet atmospheres, and star nurseries.",
  },
  {
    title: "Artemis I",
    year: "2022",
    description: "Uncrewed lunar test flight of NASA’s SLS and Orion, paving the way for crewed Moon missions.",
  },
];

export default function Missions() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const rocketTravel = missions.length * 140;
  const rocketYRaw = useTransform(scrollYProgress, [0, 1], [0, rocketTravel]);
  const rocketY = useSpring(rocketYRaw, { stiffness: 120, damping: 30, mass: 0.2 });
  const lineProgressRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineProgress = useSpring(lineProgressRaw, { stiffness: 120, damping: 30, mass: 0.2 });

  const cards = useMemo(
    () =>
      missions.map((mission, index) => ({
        ...mission,
        side: index % 2 === 0 ? "left" : "right",
      })),
    []
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Missions</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,190,255,0.35)]">
              Mission Timeline
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Trace humanity’s boldest missions as the rocket descends through time. Scroll to watch it travel.
            </p>
          </div>
        </div>

        <div
          ref={timelineRef}
          className="relative mt-10 rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 starfield opacity-60" />
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 px-4 md:px-10 py-12 md:py-16">
            <div className="relative grid gap-10 md:gap-14">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />
              <motion.div
                style={{ scaleY: lineProgress }}
                className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-cyan-200/90 via-blue-300/60 to-transparent md:block"
              />

              <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:block">
                <motion.div style={{ y: rocketY }} className="relative">
                  <div className="relative h-20 w-12 rounded-full bg-gradient-to-b from-white via-cyan-100 to-blue-200 shadow-[0_0_35px_rgba(120,200,255,0.65)] border border-white/40">
                    <div className="absolute -top-4 left-1/2 h-6 w-8 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-white to-cyan-100 border border-white/40" />
                    <div className="absolute left-1/2 top-7 h-4 w-4 -translate-x-1/2 rounded-full border border-blue-200/70 bg-blue-900/70 shadow-[0_0_10px_rgba(120,200,255,0.6)]" />
                    <div className="absolute left-1/2 top-12 h-2 w-2 -translate-x-1/2 rounded-full border border-blue-200/60 bg-blue-900/60" />
                    <div className="absolute -left-2 top-11 h-5 w-3 -skew-y-6 rounded-l-full bg-gradient-to-b from-cyan-200 to-blue-300/70 border border-cyan-100/70" />
                    <div className="absolute -right-2 top-11 h-5 w-3 skew-y-6 rounded-r-full bg-gradient-to-b from-cyan-200 to-blue-300/70 border border-cyan-100/70" />
                  </div>
                  <motion.div
                    animate={{ scaleY: [1, 1.15, 0.95, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 left-1/2 h-8 w-4 -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-300 via-blue-400 to-transparent blur-[0.5px]"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 0.9, 0.4, 0.7] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-12 left-1/2 h-8 w-10 -translate-x-1/2 rounded-full bg-blue-400/30 blur-2xl"
                  />
                </motion.div>
              </div>

              {cards.map((mission, index) => (
                <div
                  key={mission.title}
                  className="grid items-start gap-6 md:grid-cols-[1fr_auto_1fr]"
                >
                  <div className={mission.side === "left" ? "md:pr-10" : "md:pr-10 md:opacity-0"}>
                    {mission.side === "left" && (
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="glass rounded-2xl p-5 border border-white/10 shadow-[0_0_25px_rgba(72,140,255,0.2)]"
                      >
                        <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                          {mission.year}
                        </div>
                        <div className="text-lg font-semibold mt-2">{mission.title}</div>
                        <p className="text-sm text-white/70 mt-3">{mission.description}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="hidden md:flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(120,200,255,0.8)]" />
                  </div>

                  <div className={mission.side === "right" ? "md:pl-10" : "md:pl-10 md:opacity-0"}>
                    {mission.side === "right" && (
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="glass rounded-2xl p-5 border border-white/10 shadow-[0_0_25px_rgba(72,140,255,0.2)]"
                      >
                        <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                          {mission.year}
                        </div>
                        <div className="text-lg font-semibold mt-2">{mission.title}</div>
                        <p className="text-sm text-white/70 mt-3">{mission.description}</p>
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="md:hidden glass rounded-2xl p-5 border border-white/10 shadow-[0_0_25px_rgba(72,140,255,0.2)]"
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                      {mission.year}
                    </div>
                    <div className="text-lg font-semibold mt-2">{mission.title}</div>
                    <p className="text-sm text-white/70 mt-3">{mission.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
