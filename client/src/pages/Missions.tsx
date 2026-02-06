import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "../components/Footer";
import { useUi } from "../context/UiContext";

const missions = [
  {
    title: "Sputnik 1",
    year: "1957",
    description: "The first artificial satellite, marking the start of the space age and the space race.",
    agency: "Soviet Union",
    vehicle: "R-7 Sputnik",
    milestone: "First satellite",
    tags: ["LEO", "Radio beacon", "Space age"],
    stats: [
      { label: "Orbit", value: "96.2 min" },
      { label: "Mass", value: "83.6 kg" },
    ],
  },
  {
    title: "Luna 2",
    year: "1959",
    description: "First human-made object to reach the Moon, impacting its surface.",
    agency: "Soviet Union",
    vehicle: "Vostok-L",
    milestone: "First lunar impact",
    tags: ["Lunar", "Impact"],
    stats: [
      { label: "Distance", value: "384k km" },
      { label: "Flight", value: "33.5 hrs" },
    ],
  },
  {
    title: "Vostok 1",
    year: "1961",
    description: "Yuri Gagarin becomes the first human in space, completing one orbit of Earth.",
    agency: "Soviet Union",
    vehicle: "Vostok-K",
    milestone: "First human in space",
    tags: ["Crewed", "LEO"],
    stats: [
      { label: "Orbit", value: "108 min" },
      { label: "Apogee", value: "327 km" },
    ],
  },
  {
    title: "Apollo 11",
    year: "1969",
    description: "Humanity’s first crewed lunar landing; Armstrong and Aldrin walked on the Moon.",
    agency: "NASA",
    vehicle: "Saturn V",
    milestone: "First Moon landing",
    tags: ["Crewed", "Lunar"],
    stats: [
      { label: "Crew", value: "3" },
      { label: "Surface", value: "21 hrs" },
    ],
  },
  {
    title: "Apollo 13",
    year: "1970",
    description: "Explosive mid-flight failure led to a dramatic safe return and new safety protocols.",
    agency: "NASA",
    vehicle: "Saturn V",
    milestone: "Safe return",
    tags: ["Crewed", "Crisis"],
    stats: [
      { label: "Crew", value: "3" },
      { label: "Distance", value: "400k km" },
    ],
  },
  {
    title: "Pioneer 10",
    year: "1972",
    description: "First spacecraft to traverse the asteroid belt and make direct observations of Jupiter.",
    agency: "NASA",
    vehicle: "Atlas-Centaur",
    milestone: "First Jupiter flyby",
    tags: ["Deep space", "Jupiter"],
    stats: [
      { label: "Launch", value: "1972" },
      { label: "Signal", value: "Interstellar" },
    ],
  },
  {
    title: "Voyager 1",
    year: "1977",
    description: "Deep-space explorer now in interstellar space, sending data from beyond the solar system.",
    agency: "NASA",
    vehicle: "Titan IIIE",
    milestone: "Interstellar mission",
    tags: ["Grand Tour", "Interstellar"],
    stats: [
      { label: "Distance", value: "24B km" },
      { label: "Speed", value: "17 km/s" },
    ],
  },
  {
    title: "STS-1 Columbia",
    year: "1981",
    description: "The first Space Shuttle mission, testing a reusable spacecraft in orbit.",
    agency: "NASA",
    vehicle: "Space Shuttle",
    milestone: "Reusable spacecraft",
    tags: ["Crewed", "Reusable"],
    stats: [
      { label: "Duration", value: "54.5 hrs" },
      { label: "Crew", value: "2" },
    ],
  },
  {
    title: "Mir Space Station",
    year: "1986",
    description: "The first modular space station, hosting long-duration missions and international crews.",
    agency: "Soviet Union / Roscosmos",
    vehicle: "Proton",
    milestone: "Modular station",
    tags: ["LEO", "Long-duration"],
    stats: [
      { label: "Years", value: "15" },
      { label: "Modules", value: "7" },
    ],
  },
  {
    title: "Galileo",
    year: "1989",
    description: "Orbiter that studied Jupiter and its moons, revealing volcanic and icy worlds.",
    agency: "NASA / ESA",
    vehicle: "Space Shuttle / IUS",
    milestone: "Jupiter orbiter",
    tags: ["Jupiter", "Orbiter"],
    stats: [
      { label: "Orbit", value: "14 yrs" },
      { label: "Moons", value: "4 major" },
    ],
  },
  {
    title: "Hubble Space Telescope",
    year: "1990",
    description: "Revolutionized astronomy with deep-field imagery and precise measurements of the cosmos.",
    agency: "NASA / ESA",
    vehicle: "Space Shuttle",
    milestone: "Flagship telescope",
    tags: ["Astrophysics", "Imaging"],
    stats: [
      { label: "Aperture", value: "2.4 m" },
      { label: "Orbits", value: "LEO" },
    ],
  },
  {
    title: "International Space Station",
    year: "1998",
    description: "A continuously crewed orbital laboratory for science, Earth observation, and technology demos.",
    agency: "International Partnership",
    vehicle: "Proton / Soyuz / Shuttle",
    milestone: "Permanent outpost",
    tags: ["LEO", "Crewed"],
    stats: [
      { label: "Mass", value: "420t" },
      { label: "Altitude", value: "408 km" },
    ],
  },
  {
    title: "Mars Exploration Rovers",
    year: "2004",
    description: "Spirit and Opportunity rovers uncover evidence of ancient water on Mars.",
    agency: "NASA",
    vehicle: "Delta II",
    milestone: "Twin Mars rovers",
    tags: ["Mars", "Rovers"],
    stats: [
      { label: "Distance", value: "45 km" },
      { label: "Ops", value: "14 yrs" },
    ],
  },
  {
    title: "Cassini–Huygens",
    year: "2004",
    description: "Saturn orbiter and Titan lander revealing complex rings, storms, and methane lakes.",
    agency: "NASA / ESA / ASI",
    vehicle: "Titan IVB",
    milestone: "Saturn system tour",
    tags: ["Saturn", "Titan"],
    stats: [
      { label: "Moons", value: "4" },
      { label: "Mission", value: "13 yrs" },
    ],
  },
  {
    title: "Kepler",
    year: "2009",
    description: "Planet-hunting telescope that discovered thousands of exoplanet candidates.",
    agency: "NASA",
    vehicle: "Delta II",
    milestone: "Exoplanet survey",
    tags: ["Exoplanets", "Transit"],
    stats: [
      { label: "Candidates", value: "4,600+" },
      { label: "Field", value: "115 sq deg" },
    ],
  },
  {
    title: "Mars Curiosity Rover",
    year: "2012",
    description: "A car-sized rover exploring Gale Crater, analyzing Martian geology and habitability.",
    agency: "NASA",
    vehicle: "Atlas V",
    milestone: "Nuclear rover",
    tags: ["Mars", "Science lab"],
    stats: [
      { label: "Mass", value: "899 kg" },
      { label: "Landing", value: "Sky crane" },
    ],
  },
  {
    title: "Chang'e 4",
    year: "2019",
    description: "First mission to soft land on the far side of the Moon, deploying the Yutu-2 rover.",
    agency: "CNSA",
    vehicle: "Long March 3B",
    milestone: "Far-side landing",
    tags: ["Lunar", "Rover"],
    stats: [
      { label: "Landing", value: "Von Kármán" },
      { label: "Relay", value: "Queqiao" },
    ],
  },
  {
    title: "Crew Dragon Demo-2",
    year: "2020",
    description: "First crewed orbital flight of Crew Dragon, restoring U.S. crew launch capability.",
    agency: "NASA / SpaceX",
    vehicle: "Falcon 9",
    milestone: "Commercial crew",
    tags: ["Crewed", "ISS"],
    stats: [
      { label: "Crew", value: "2" },
      { label: "Docking", value: "ISS" },
    ],
  },
  {
    title: "Tianwen-1",
    year: "2020",
    description: "China’s first Mars mission delivering an orbiter, lander, and the Zhurong rover.",
    agency: "CNSA",
    vehicle: "Long March 5",
    milestone: "Mars triad",
    tags: ["Mars", "Orbiter"],
    stats: [
      { label: "Rover", value: "Zhurong" },
      { label: "Landing", value: "Utopia" },
    ],
  },
  {
    title: "Artemis I",
    year: "2022",
    description: "Uncrewed lunar test flight of NASA’s SLS and Orion, paving the way for crewed Moon missions.",
    agency: "NASA",
    vehicle: "SLS",
    milestone: "Lunar return",
    tags: ["Lunar", "Orion"],
    stats: [
      { label: "Distance", value: "2.2M km" },
      { label: "Duration", value: "25.5 days" },
    ],
  },
  {
    title: "Rosetta",
    year: "2014",
    description: "First mission to orbit a comet and deploy a lander on its surface.",
    agency: "ESA",
    vehicle: "Ariane 5",
    milestone: "Comet rendezvous",
    tags: ["Comet", "Lander"],
    stats: [
      { label: "Comet", value: "67P" },
      { label: "Journey", value: "10 yrs" },
    ],
  },
  {
    title: "New Horizons",
    year: "2015",
    description: "First close-up flyby of Pluto and the Kuiper Belt, reshaping our view of the outer solar system.",
    agency: "NASA",
    vehicle: "Atlas V",
    milestone: "Pluto flyby",
    tags: ["Kuiper Belt", "Flyby"],
    stats: [
      { label: "Speed", value: "14 km/s" },
      { label: "Distance", value: "6.6B km" },
    ],
  },
  {
    title: "Juno",
    year: "2016",
    description: "Polar orbiter studying Jupiter's atmosphere, magnetic field, and interior structure.",
    agency: "NASA",
    vehicle: "Atlas V",
    milestone: "Jupiter polar orbit",
    tags: ["Jupiter", "Polar orbit"],
    stats: [
      { label: "Orbit", value: "53 days" },
      { label: "Power", value: "Solar" },
    ],
  },
  {
    title: "Parker Solar Probe",
    year: "2018",
    description: "Closest-ever mission to the Sun, sampling the corona and solar wind.",
    agency: "NASA",
    vehicle: "Delta IV Heavy",
    milestone: "Closest to Sun",
    tags: ["Heliophysics", "Solar"],
    stats: [
      { label: "Speed", value: "635k km/h" },
      { label: "Perihelion", value: "6.2M km" },
    ],
  },
  {
    title: "Mars Perseverance Rover",
    year: "2021",
    description: "Collecting samples and testing technologies for future human exploration of Mars.",
    agency: "NASA",
    vehicle: "Atlas V",
    milestone: "Sample caching",
    tags: ["Mars", "Samples"],
    stats: [
      { label: "Drone", value: "Ingenuity" },
      { label: "Crater", value: "Jezero" },
    ],
  },
  {
    title: "James Webb Space Telescope",
    year: "2021",
    description: "Infrared flagship observatory revealing early galaxies, exoplanet atmospheres, and star nurseries.",
    agency: "NASA / ESA / CSA",
    vehicle: "Ariane 5",
    milestone: "Infrared observatory",
    tags: ["Infrared", "Deep field"],
    stats: [
      { label: "Mirror", value: "6.5 m" },
      { label: "Orbit", value: "L2" },
    ],
  },
  {
    title: "JUICE",
    year: "2023",
    description: "Mission to Jupiter's icy moons to study habitability beneath frozen surfaces.",
    agency: "ESA",
    vehicle: "Ariane 5",
    milestone: "Icy moons survey",
    tags: ["Jupiter", "Icy moons"],
    stats: [
      { label: "Arrival", value: "2031" },
      { label: "Moons", value: "Ganymede" },
    ],
  },
  {
    title: "Chandrayaan-3",
    year: "2023",
    description: "Soft landing near the Moon’s south pole with rover operations.",
    agency: "ISRO",
    vehicle: "LVM3",
    milestone: "South pole landing",
    tags: ["Lunar", "Rover"],
    stats: [
      { label: "Landing", value: "Aug 2023" },
      { label: "Site", value: "South Pole" },
    ],
  },
  {
    title: "OSIRIS-REx Return",
    year: "2023",
    description: "Sample return capsule delivered asteroid material from Bennu to Earth.",
    agency: "NASA",
    vehicle: "Atlas V",
    milestone: "Asteroid sample",
    tags: ["Asteroid", "Sample return"],
    stats: [
      { label: "Target", value: "Bennu" },
      { label: "Samples", value: "121 g" },
    ],
  },
  {
    title: "SLIM",
    year: "2024",
    description: "JAXA’s precision lunar lander achieved a pinpoint landing on the Moon.",
    agency: "JAXA",
    vehicle: "H-IIA",
    milestone: "Pinpoint landing",
    tags: ["Lunar", "Precision", "Lander"],
    stats: [
      { label: "Landing", value: "Jan 20, 2024" },
      { label: "Accuracy", value: "~10 m" },
    ],
  },
  {
    title: "IM-1 Odysseus",
    year: "2024",
    description:
      "Commercial lander Odysseus made the first U.S. Moon landing since Apollo and a landmark private landing.",
    agency: "Intuitive Machines / NASA",
    vehicle: "Falcon 9",
    milestone: "Commercial lunar landing",
    tags: ["Lunar", "Commercial", "South pole"],
    stats: [
      { label: "Landing", value: "Feb 22, 2024" },
      { label: "NASA payloads", value: "6" },
    ],
  },
  {
    title: "EarthCARE (Hakuryu)",
    year: "2024",
    description:
      "ESA/JAXA climate mission launched to study clouds, aerosols, and Earth’s radiation balance.",
    agency: "ESA / JAXA",
    vehicle: "Falcon 9",
    milestone: "Climate observatory",
    tags: ["Earth science", "Climate", "Radar + Lidar"],
    stats: [
      { label: "Launch", value: "May 29, 2024" },
      { label: "Site", value: "Vandenberg" },
    ],
  },
  {
    title: "Chang'e 6",
    year: "2024",
    description: "Returned the first-ever samples from the Moon’s far side to Earth.",
    agency: "CNSA",
    vehicle: "Long March 5",
    milestone: "Far-side samples",
    tags: ["Lunar", "Sample return"],
    stats: [
      { label: "Launch", value: "May 3, 2024" },
      { label: "Return", value: "Jun 25, 2024" },
    ],
  },
  {
    title: "Starliner Crew Flight Test",
    year: "2024",
    description: "Boeing’s Starliner completed its first crewed flight to the ISS.",
    agency: "NASA / Boeing",
    vehicle: "Atlas V",
    milestone: "Crewed Starliner",
    tags: ["Crewed", "ISS"],
    stats: [
      { label: "Launch", value: "Jun 5, 2024" },
      { label: "Crew", value: "2" },
    ],
  },
  {
    title: "Europa Clipper",
    year: "2024",
    description: "Launched to study Europa’s habitability and icy surface in the Jupiter system.",
    agency: "NASA",
    vehicle: "Falcon Heavy",
    milestone: "Europa surveyor",
    tags: ["Jupiter", "Icy moon"],
    stats: [
      { label: "Launch", value: "Oct 14, 2024" },
      { label: "Arrival", value: "2030" },
    ],
  },
  {
    title: "SPHEREx + PUNCH",
    year: "2025",
    description:
      "NASA’s SPHEREx and PUNCH launched together to map the sky and study the solar wind.",
    agency: "NASA",
    vehicle: "Falcon 9",
    milestone: "All-sky survey",
    tags: ["Astrophysics", "Heliophysics"],
    stats: [
      { label: "Launch", value: "Mar 11, 2025" },
      { label: "Orbit", value: "LEO" },
    ],
  },
];

type MissionCardProps = {
  mission: {
    title: string;
    year: string;
    description: string;
    agency: string;
    vehicle: string;
    milestone: string;
    tags: string[];
    stats: { label: string; value: string }[];
    side: "left" | "right";
  };
};

function MissionCard({ mission }: MissionCardProps) {
  const { t } = useUi();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/90 p-5 shadow-[0_14px_32px_rgba(2,6,23,0.45)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/30 hover:shadow-[0_18px_36px_rgba(2,6,23,0.55)]"
    >
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl transition duration-300 group-hover:bg-cyan-300/15" />
      <div className="pointer-events-none absolute -bottom-12 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition duration-300 group-hover:bg-blue-400/15" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>
      <div className="relative z-10">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-cyan-100/90">
          {t(mission.year)}
        </span>
        <div className="text-xl font-semibold mt-3 text-white">{t(mission.title)}</div>
        <p className="text-sm text-white/80 mt-3">{t(mission.description)}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {mission.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100/80"
            >
              {t(tag)}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2 text-xs text-white/65">
          <div className="flex items-center justify-between gap-3">
            <span className="uppercase tracking-[0.18em] text-white/80">{t("Agency")}</span>
            <span className="text-white">{t(mission.agency)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="uppercase tracking-[0.18em] text-white/80">{t("Vehicle")}</span>
            <span className="text-white">{t(mission.vehicle)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="uppercase tracking-[0.18em] text-white/80">{t("Milestone")}</span>
            <span className="text-white">{t(mission.milestone)}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {mission.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-cyan-50"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/90">
                {t(stat.label)}
              </div>
              <div className="mt-1 text-sm font-semibold text-cyan-50">{t(stat.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Missions() {
  const { t } = useUi();
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const sliderThumbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const lineProgressRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineProgress = useSpring(lineProgressRaw, { stiffness: 120, damping: 30, mass: 0.2 });

  const cards = useMemo<MissionCardProps["mission"][]>(
    () =>
      missions.map((mission, index) => ({
        ...mission,
        side: index % 2 === 0 ? "left" : "right",
      })),
    []
  );
  const summary = useMemo(
    () => [
      { label: t("Missions Tracked"), value: `${missions.length}` },
      { label: t("Agencies"), value: "12+" },
      { label: t("Destination Types"), value: t("Orbital / Lunar / Deep") },
      { label: t("Timeline Span"), value: "1957 -> 2025" },
    ],
    [t]
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">{t("Missions")}</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,190,255,0.35)]">
              {t("Mission Timeline")}
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              {t("Trace humanity's boldest missions as the timeline scrolls through time. Scroll to explore.")}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.label}
              className="glass rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 shadow-[0_0_25px_rgba(72,140,255,0.15)]"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-200/70">
                {item.label}
              </div>
              <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div
          ref={timelineRef}
          className="relative mt-10 rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 starfield opacity-60" />
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 px-4 md:px-10 py-12 md:py-16">
            <div className="relative grid gap-7 md:gap-10">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block" />
              <motion.div
                style={{ scaleY: lineProgress }}
                className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-cyan-200/90 via-blue-300/60 to-transparent md:block"
              />

              <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:block">
                <div className="relative h-40 w-3 rounded-full bg-white/20 shadow-[0_0_24px_rgba(120,200,255,0.35)]">
                  <motion.div
                    style={{ y: sliderThumbY }}
                    className="absolute -left-2 top-0 h-7 w-7 rounded-full border border-white/70 bg-gradient-to-br from-cyan-100 via-white to-blue-200 shadow-[0_0_25px_rgba(160,235,255,0.9)]"
                  />
                </div>
              </div>

              {cards.map((mission, index) => (
                <div
                  key={mission.title}
                  className="grid items-start gap-6 md:grid-cols-[1fr_auto_1fr]"
                >
                  <div className={mission.side === "left" ? "md:pr-10" : "md:pr-10 md:opacity-0"}>
                    {mission.side === "left" && (
                      <MissionCard mission={mission} />
                    )}
                  </div>

                  <div className="hidden md:flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(120,200,255,0.8)]" />
                  </div>

                  <div className={mission.side === "right" ? "md:pl-10" : "md:pl-10 md:opacity-0"}>
                    {mission.side === "right" && (
                      <MissionCard mission={mission} />
                    )}
                  </div>

                  <div className="md:hidden">
                    <MissionCard mission={mission} />
                  </div>
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
