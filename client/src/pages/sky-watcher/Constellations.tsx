import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { Search } from "lucide-react";
import Footer from "../../components/Footer";

const constellations = [
  {
    name: "Orion",
    story: "A mighty hunter placed among the stars, guiding travelers across winter skies.",
    mythology:
      "Orion appears in many cultures as a great hunter or warrior. The three belt stars make it easy to identify, and the bright stars at his shoulders and feet anchor the shape.",
    keyStars: "Betelgeuse (red supergiant), Rigel (blue supergiant), Alnitak–Alnilam–Mintaka (belt)",
    highlights:
      "Home to the Orion Nebula (M42), a nearby stellar nursery visible with binoculars. Look for the sword hanging below the belt.",
    best: "December to February",
    hemisphere: "Northern Hemisphere",
    stars: [
      { id: "or-1", name: "Alnitak", brightness: "1.7", distance: "736 ly", description: "Blue supergiant with a radiant glow.", position: [1.2, 0.6, 0] as [number, number, number] },
      { id: "or-2", name: "Alnilam", brightness: "1.6", distance: "1,340 ly", description: "The central beacon in Orion's belt.", position: [0.2, 0.1, 0.3] as [number, number, number] },
      { id: "or-3", name: "Mintaka", brightness: "2.2", distance: "1,200 ly", description: "A luminous star pair shimmering together.", position: [-0.9, -0.4, 0.2] as [number, number, number] },
      { id: "or-4", name: "Betelgeuse", brightness: "0.4", distance: "548 ly", description: "A red supergiant nearing its finale.", position: [0.8, 1.2, -0.4] as [number, number, number] },
      { id: "or-5", name: "Rigel", brightness: "0.1", distance: "863 ly", description: "The brilliant blue-white anchor of Orion.", position: [-0.6, -1.1, -0.3] as [number, number, number] },
    ],
    links: [
      [0, 1],
      [1, 2],
      [0, 3],
      [2, 4],
      [3, 4],
    ] as Array<[number, number]>,
  },
  {
    name: "Ursa Major",
    story: "The great bear whose shape anchors the Big Dipper, a celestial compass.",
    mythology:
      "A legendary bear in Greek myth, often linked to Callisto. The Big Dipper asterism within Ursa Major is used worldwide for navigation.",
    keyStars: "Dubhe and Merak (the 'pointers' to Polaris), Alioth, Mizar",
    highlights:
      "Follow the two pointer stars at the bowl’s edge to find Polaris in Ursa Minor. Mizar has a famous optical companion, Alcor.",
    best: "March to May",
    hemisphere: "Northern Hemisphere",
    stars: [
      { id: "um-1", name: "Dubhe", brightness: "1.8", distance: "123 ly", description: "A golden giant at the bear's shoulder.", position: [-1.1, 0.8, 0] as [number, number, number] },
      { id: "um-2", name: "Merak", brightness: "2.4", distance: "79 ly", description: "A guiding star pointing to Polaris.", position: [-0.4, 0.2, 0.3] as [number, number, number] },
      { id: "um-3", name: "Phecda", brightness: "2.4", distance: "83 ly", description: "The base of the dipper's bowl.", position: [0.4, -0.2, 0.1] as [number, number, number] },
      { id: "um-4", name: "Megrez", brightness: "3.3", distance: "81 ly", description: "A soft glow linking bowl and handle.", position: [1.0, 0.1, -0.2] as [number, number, number] },
      { id: "um-5", name: "Alioth", brightness: "1.7", distance: "81 ly", description: "The brightest star in the dipper's handle.", position: [1.4, 0.6, 0.1] as [number, number, number] },
      { id: "um-6", name: "Mizar", brightness: "2.2", distance: "86 ly", description: "A famed double star in the handle.", position: [1.8, 1.0, 0.2] as [number, number, number] },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ] as Array<[number, number]>,
  },
  {
    name: "Scorpius",
    story: "A radiant scorpion glowing in the summer sky, rich with red supergiants.",
    mythology:
      "In Greek lore, Scorpius is the scorpion that brought down Orion. The constellation is prominent in southern skies and traces a hooked tail.",
    keyStars: "Antares (red supergiant), Shaula, Sargas",
    highlights:
      "Antares shines with a deep red hue near the galactic center. The curved tail is a signature shape for summer stargazing.",
    best: "June to August",
    hemisphere: "Southern Hemisphere",
    stars: [
      { id: "sc-1", name: "Antares", brightness: "1.1", distance: "550 ly", description: "A red heart blazing at the scorpion's core.", position: [0.2, 0.9, -0.2] as [number, number, number] },
      { id: "sc-2", name: "Dschubba", brightness: "2.3", distance: "500 ly", description: "A bright crown above the scorpion.", position: [-0.6, 1.2, 0.1] as [number, number, number] },
      { id: "sc-3", name: "Sargas", brightness: "1.9", distance: "270 ly", description: "A glowing shoulder star.", position: [-0.9, 0.3, 0.4] as [number, number, number] },
      { id: "sc-4", name: "Shaula", brightness: "1.6", distance: "700 ly", description: "The scorpion's stinger, bright and sharp.", position: [0.6, -0.5, 0.2] as [number, number, number] },
      { id: "sc-5", name: "Lesath", brightness: "2.6", distance: "520 ly", description: "Twin star near the stinger.", position: [1.2, -0.8, 0.1] as [number, number, number] },
    ],
    links: [
      [1, 0],
      [0, 3],
      [3, 4],
      [0, 2],
    ] as Array<[number, number]>,
  },
  {
    name: "Cassiopeia",
    story: "A queen's throne of stars forming a shimmering W in autumn nights.",
    mythology:
      "Cassiopeia is the vain queen in Greek myth, placed in the sky near her daughter Andromeda. The W shape is easy to spot.",
    keyStars: "Schedar, Caph, Gamma Cassiopeiae",
    highlights:
      "Opposite the Big Dipper across Polaris, it helps locate the Andromeda Galaxy region in autumn.",
    best: "September to November",
    hemisphere: "Northern Hemisphere",
    stars: [
      { id: "ca-1", name: "Schedar", brightness: "2.2", distance: "228 ly", description: "A warm orange giant marking the throne.", position: [-1.1, 0.4, 0.1] as [number, number, number] },
      { id: "ca-2", name: "Caph", brightness: "2.3", distance: "55 ly", description: "A bright white star at the W tip.", position: [-0.5, 0.9, -0.2] as [number, number, number] },
      { id: "ca-3", name: "Gamma Cas", brightness: "2.1", distance: "550 ly", description: "A shimmering blue star in the arc.", position: [0.1, 0.4, 0.2] as [number, number, number] },
      { id: "ca-4", name: "Ruchbah", brightness: "2.7", distance: "99 ly", description: "A steady glow completing the W.", position: [0.7, 0.9, -0.1] as [number, number, number] },
      { id: "ca-5", name: "Segin", brightness: "3.4", distance: "440 ly", description: "The far end of Cassiopeia's throne.", position: [1.2, 0.4, 0.1] as [number, number, number] },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ] as Array<[number, number]>,
  },
  {
    name: "Leo",
    story: "The lion of the zodiac, roaring across spring evenings.",
    mythology:
      "Leo represents the Nemean Lion from Greek myth. Its sickle-shaped head asterism resembles a backward question mark.",
    keyStars: "Regulus (heart of the lion), Denebola",
    highlights:
      "Look for the Sickle asterism to outline the head and mane. Leo marks the transition into spring skies.",
    best: "March to April",
    hemisphere: "Northern Hemisphere",
    stars: [
      { id: "le-1", name: "Regulus", brightness: "1.3", distance: "79 ly", description: "The lion's heart, bold and bright.", position: [-0.6, 0.3, -0.1] as [number, number, number] },
      { id: "le-2", name: "Algieba", brightness: "2.0", distance: "130 ly", description: "A golden twin-star in Leo's mane.", position: [0.0, 0.8, 0.2] as [number, number, number] },
      { id: "le-3", name: "Denebola", brightness: "2.1", distance: "36 ly", description: "A swift tail star glowing white.", position: [1.2, 0.1, 0.0] as [number, number, number] },
      { id: "le-4", name: "Zosma", brightness: "2.6", distance: "58 ly", description: "A gleaming shoulder star.", position: [0.7, -0.4, 0.3] as [number, number, number] },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
    ] as Array<[number, number]>,
  },
];

function ConstellationModel({
  stars,
  links,
  onSelect,
}: {
  stars: Array<{
    id: string;
    name: string;
    brightness: string;
    distance: string;
    description: string;
    position: [number, number, number];
  }>;
  links: Array<[number, number]>;
  onSelect: (id: string) => void;
}) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.08;
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.25) * 0.08;
    }
  });

  return (
    <group ref={group}>
      {links.map(([a, b], index) => (
        <Line
          key={`link-${index}`}
          points={[stars[a].position, stars[b].position]}
          color="#8fd3ff"
          lineWidth={1}
          transparent
          opacity={0.6}
        />
      ))}

      {stars.map((star) => (
        <mesh key={star.id} position={star.position} onClick={() => onSelect(star.id)}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial color="#f7fbff" emissive="#7fd0ff" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function Constellations() {
  const [query, setQuery] = useState("");
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [selectedConstellation, setSelectedConstellation] = useState<string | null>(null);

  const activeConstellation = useMemo(
    () => constellations.find((item) => item.name === selectedConstellation) || null,
    [selectedConstellation]
  );

  const matchedConstellation = useMemo(() => {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return null;
    return constellations.find((item) => item.name.toLowerCase().includes(cleaned)) || null;
  }, [query]);

  const detail = matchedConstellation || null;

  useEffect(() => {
    if (matchedConstellation) {
      setSelectedConstellation(matchedConstellation.name);
      setSelectedStarId(null);
    }
  }, [matchedConstellation]);

  const activeStar = useMemo(
    () =>
      activeConstellation
        ? activeConstellation.stars.find((star) => star.id === selectedStarId) || null
        : null,
    [activeConstellation, selectedStarId]
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Sky Watcher</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,190,255,0.35)]">
              3D Constellations
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Browse luminous constellations in an immersive 3D viewer. Tap any star to reveal its story.
            </p>
          </div>

          <div className="glass rounded-full px-4 py-2 flex items-center gap-2 w-full md:w-[320px]">
            <Search className="h-4 w-4 text-cyan-200/80" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && matchedConstellation) {
                  setSelectedConstellation(matchedConstellation.name);
                  setSelectedStarId(null);
                }
              }}
              list="constellation-list"
              placeholder="Search constellation…"
              className="bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none w-full"
            />
            <datalist id="constellation-list">
              {constellations.map((item) => (
                <option key={item.name} value={item.name} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="glass rounded-3xl p-4 md:p-6 relative overflow-hidden min-h-[420px]">
            <div className="absolute inset-0 starfield opacity-60" />
            <div className="absolute -top-16 -right-24 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative z-10 h-[360px] md:h-[460px] rounded-2xl overflow-hidden border border-white/10">
              <Canvas camera={{ position: [0, 0.8, 2.5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[2, 2, 2]} intensity={1.2} />
                <Stars radius={50} depth={30} count={1200} factor={2.5} fade />
                {activeConstellation && (
                  <ConstellationModel
                    stars={activeConstellation.stars}
                    links={activeConstellation.links}
                    onSelect={setSelectedStarId}
                  />
                )}
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>

            {activeStar && (
              <div className="absolute right-6 bottom-6 glass rounded-2xl p-4 w-[220px] border border-white/10">
                <div className="text-sm font-semibold">{activeStar.name}</div>
                <div className="text-xs text-white/70 mt-2">Brightness: {activeStar.brightness}</div>
                <div className="text-xs text-white/70">Distance: {activeStar.distance}</div>
                <p className="text-xs text-white/60 mt-2">{activeStar.description}</p>
              </div>
            )}
          </div>

          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Constellation Intel</div>
            {detail && (
              <>
                <div className="text-xl font-semibold mt-4">{detail.name}</div>
                <p className="text-sm text-white/70 mt-3">{detail.story}</p>
                <div className="mt-4 text-sm">
                  <div className="text-white/60">Mythology</div>
                  <div className="text-white/90">{detail.mythology}</div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="text-white/60">Key Stars</div>
                  <div className="text-white/90">{detail.keyStars}</div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="text-white/60">Highlights</div>
                  <div className="text-white/90">{detail.highlights}</div>
                </div>
                <div className="mt-4 text-sm">
                  <div className="text-white/60">Best time to view</div>
                  <div className="text-white/90">{detail.best}</div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="text-white/60">Hemisphere</div>
                  <div className="text-white/90">{detail.hemisphere}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
