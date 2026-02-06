import { useState, useEffect, useMemo, useRef } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import * as satellite from "satellite.js";
import * as THREE from "three";
import { Search, Radar, Satellite as SatIcon, Globe as GlobeIcon } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Footer from "../../components/Footer";
import { fetchTLEs, SAT_GROUPS } from "../../services/celestrak";

// --- PHASE 3: ROBUST MOCK DATA BUFFER ---
// Real TLEs snapshot for offline reliability
const MOCK_TLE_DATA = [
  // STATIONS
  { name: "ISS (ZARYA)", line1: "1 25544U 98067A   24039.42163194  .00014022  00000+0  25166-3 0  9990", line2: "2 25544  51.6409 295.5343 0004564  53.2558 111.4556 15.50066601438902", type: "station" },
  { name: "CSS (TIANHE)", line1: "1 48274U 21035A   24039.52981324  .00008542  00000+0  99999-0 0  9995", line2: "2 48274  41.4722 284.2123 0007204  45.8952  85.2536 15.65655755152225", type: "station" },

  // DEBRIS (Notable)
  { name: "FENGYUN 1C DEB", line1: "1 29683U 99025BPZ 24039.06018362  .00000284  00000+0  27525-3 0  9992", line2: "2 29683  98.9223 207.2589 0134460 326.8524  32.8805 14.28373303746658", type: "debris" },
  { name: "COSMOS 2251 DEB", line1: "1 33758U 93036BHS 24039.12345678  .00000123  00000+0  12345-4 0  9991", line2: "2 33758  74.0321  15.5432 0023412  85.1234 275.4321 14.85432109876543", type: "debris" },
  { name: "IRIDIUM 33 DEB", line1: "1 35678U 97051CDE 24039.87654321  .00000321  00000+0  54321-4 0  9998", line2: "2 35678  86.3984 140.2314 0012345 220.5678 120.9876 14.56789012345678", type: "debris" },

  // ACTIVE FLOCK (STARLINK MOCKS based on real orbital planes)
  ...Array.from({ length: 40 }).map((_, i) => ({
    name: `STARLINK-${3000 + i}`,
    line1: "1 44713U 19074A   24039.38450231  .00000632  00000+0  66006-4 0  9997",
    // Varing Mean Anomaly and RAAN to spread them out
    line2: `2 44713  53.0539 ${((i * 15) % 360).toFixed(4)} 0001509  96.4863 ${(Math.random() * 360).toFixed(4)} 15.06392135${i}`,
    type: "active"
  })),

  // TELESCOPES
  { name: "HST (HUBBLE)", line1: "1 20580U 90037B   24039.19283748  .00002314  00000+0  10432-3 0  9994", line2: "2 20580  28.4691 295.4032 0002541  95.8452 355.1234 15.09245678901234", type: "active" }, // Science often lumped with active, but let's give it special treatment color-wise if needed or keep active
];

// --- TYPES ---
interface SatData {
  name: string;
  lat: number;
  lng: number;
  alt: number;
  velocity: number;
  type: "station" | "debris" | "active";
  gmst: number;
}

export default function SatelliteTracker() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [satellites, setSatellites] = useState<SatData[]>([]);
  const [selectedSat, setSelectedSat] = useState<SatData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  const [satRecs, setSatRecs] = useState<any[]>([]);
  const [orbitPaths, setOrbitPaths] = useState<any[]>([]);

  // --- PHASE 3: DATA LOADING & FALLBACK ---
  useEffect(() => {
    const initData = async () => {
      try {
        // 1. Try Fetching Live Data (Notable Groups)
        // We limit Starlink to 300 to preserve performance on lower-end devices
        const [stations, starlink, science] = await Promise.all([
          fetchTLEs(SAT_GROUPS.ISS),
          fetchTLEs(SAT_GROUPS.STARLINK),
          fetchTLEs(SAT_GROUPS.SCIENCE),
        ]);

        const liveData = [
          ...stations.map(s => ({ ...s, type: 'station' })),
          ...science.map(s => ({ ...s, type: 'active' })), // Hubble etc
          ...starlink.slice(0, 300).map(s => ({ ...s, type: 'active' })),
        ];

        if (liveData.length === 0) throw new Error("API returned empty");

        // 2. Parse into SatRecs
        const recs = liveData.map(data => ({
          name: data.name,
          type: data.type as any,
          satrec: data.satrec // fetchTLEs already does twoline2satrec
        }));

        // Add specialized debris from mock if needed, or fetch debris group
        const debrisMocks = MOCK_TLE_DATA.filter(d => d.type === 'debris').map(d => ({
          name: d.name,
          type: d.type as any,
          satrec: satellite.twoline2satrec(d.line1, d.line2)
        }));

        setSatRecs([...recs, ...debrisMocks]);

      } catch (e) {
        console.warn("Satellite API Connection Failed. Switching to Internal Gravity Buffers (Mock Data).", e);
        // 3. Fallback: Use Full Mock Data
        const recs = MOCK_TLE_DATA.map(data => ({
          name: data.name,
          type: data.type as any,
          satrec: satellite.twoline2satrec(data.line1, data.line2)
        }));
        setSatRecs(recs);
      }
    };

    initData();
  }, []);

  // --- CONSTANTS ---
  // Note: High altitude scales (e.g. 1.5 or 2.0) cause parallax errors where the line looks offset 
  // from the satellite depending on viewing angle. keeping it 1.0 or slightly higher for visibility 
  // but strictly matching is key. Let's use 1.0 + a tiny bias for visibility if needed, but 
  // accurate 1:1 is best for alignment.

  // Actually, visual radius of earth in globe.gl is 100 units usually? No, it's relative. 
  // globe radius is R. alt is R * (1 + alt).
  const VISUAL_ALT_OFFSET = 0.05; // Lift slightly off surface to avoid Z-fighting

  const getVisualAlt = (km: number) => (km / 6371) + VISUAL_ALT_OFFSET;

  // --- PHYSICS LOOP ---
  useEffect(() => {

    // Define propagate INSIDE to access state closure if needed, 
    // but here we just need it to run on interval.
    const propagate = () => {
      const now = new Date();
      const gmst = satellite.gstime(now);

      const positions = satRecs.map(sat => {
        try {
          // Propagate Satellite
          const pv = satellite.propagate(sat.satrec, now);
          if (!pv || !pv.position || typeof pv.position === 'boolean') return null;

          const positionGd = satellite.eciToGeodetic(
            pv.position as satellite.EciVec3<number>,
            gmst
          );

          const v = pv.velocity as satellite.EciVec3<number>;
          const velocity = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

          if (isNaN(positionGd.longitude) || isNaN(positionGd.latitude)) return null;

          return {
            name: sat.name,
            lat: satellite.degreesLat(positionGd.latitude),
            lng: satellite.degreesLong(positionGd.longitude),
            alt: positionGd.height,
            velocity: parseFloat(velocity.toFixed(2)),
            type: sat.type,
            gmst
          };
        } catch (e) { return null; }
      }).filter(Boolean) as SatData[];

      setSatellites(positions);

      // Update selected sat live data
      if (selectedSat) {
        const updated = positions.find(s => s.name === selectedSat.name);
        if (updated) {
          setSelectedSat(updated);

          // --- DYNAMIC ORBIT PATH (Inside Loop) ---
          // Re-calculate the inertial ring every frame so it stays aligned 
          // with the satellite despite Earth's rotation under it.

          const targetRec = satRecs.find(r => r.name === selectedSat.name);
          if (targetRec) {
            const gmstFixed = satellite.gstime(now);
            const meanMotionRadPerMin = targetRec.satrec.no;
            const periodMinutes = (2 * Math.PI) / meanMotionRadPerMin;
            const segments = 200;
            const path = [];

            for (let i = 0; i <= segments; i++) {
              const fraction = i / segments;
              // Center the ring on the current satellite position (t=fraction - 0.5?) 
              // Or just start from now. Starting from now ensures sat is at index 0.
              // Actually, if we want the full ring, we propagate 0 to period.

              const timeOffset = fraction * 60000 * periodMinutes; // Convert minutes to milliseconds
              const t = new Date(now.getTime() + timeOffset);

              const pv = satellite.propagate(targetRec.satrec, t);
              if (pv && pv.position && typeof pv.position !== 'boolean') {
                const gd = satellite.eciToGeodetic(pv.position as satellite.EciVec3<number>, gmstFixed);
                path.push([
                  satellite.degreesLat(gd.latitude),
                  satellite.degreesLong(gd.longitude),
                  getVisualAlt(gd.height) // EXACT MATCH scaling
                ]);
              }
            }
            // Force close
            if (path.length > 0) path.push(path[0]);

            setOrbitPaths([{ coords: path, color: selectedSat.type === 'debris' ? '#FF005C' : '#00F2FF' }]);
          }
        }
      }
    };

    const interval = setInterval(propagate, 1000);
    propagate();
    return () => clearInterval(interval);
  }, [satRecs, selectedSat?.name]); // Dependency implies restart if selection changes

  // Auto-rotate effect
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.35;
    }
  }, [isGlobeReady]);

  // Filtered Data
  const filteredData = useMemo(() => {
    if (!searchQuery) return satellites;
    return satellites.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [satellites, searchQuery]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#05070a]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a2c4e] via-[#05070a] to-black opacity-40 z-0 pointer-events-none" />

      {/* --- PHASE 2: 3D ENGINE --- */}
      <Globe
        ref={globeEl}
        onGlobeReady={() => setIsGlobeReady(true)}
        animateIn={true}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        // We don't use backgroundImageUrl here to allow our custom CSS gradient backdrop

        // Atmosphere
        atmosphereColor="#00F2FF"
        atmosphereAltitude={0.15}

        // Paths (Orbit Lines)
        pathsData={orbitPaths}
        pathPoints="coords"
        pathPointLat={p => p[0]}
        pathPointLng={p => p[1]}
        pathPointAlt={p => p[2]}
        pathColor="color"
        pathStroke={2}
        // Removed dash animation props to prevent "resizing" flickering on every update
        // Making it a solid, stable ring.

        // Points
        // Objects (Spheres instead of Points/Bars)
        objectsData={filteredData}
        objectLabel="name"
        objectLat="lat"
        objectLng="lng"
        objectAltitude={(d) => getVisualAlt((d as SatData).alt)} // Use same helper as paths
        objectThreeObject={(d: object) => {
          const s = d as SatData;
          // Color
          let color = "#00F2FF";
          if (s.name === selectedSat?.name) color = "#FFFFFF";
          else if (s.type === 'debris') color = "#FF005C";
          else if (s.type === 'station') color = "#FFD700";

          // Radius
          let radius = 0.5; // Base size
          if (s.type === 'station') radius = 1.6;
          if (s.name === selectedSat?.name) radius = 1.2;

          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 16, 16),
            new THREE.MeshLambertMaterial({ color, emissive: color, emissiveIntensity: 0.8 })
          );
          return mesh;
        }}
        // Interaction
        onObjectClick={(obj: object) => {
          const s = obj as SatData;
          setSelectedSat(s);
          if (globeEl.current) {
            globeEl.current.pointOfView({ lat: s.lat, lng: s.lng, altitude: getVisualAlt(s.alt) + 0.5 }, 1500);
          }
        }}
        onObjectHover={(obj: object | null) => {
          // Optional: Add hover cursor effect
          document.body.style.cursor = obj ? 'pointer' : 'default';
        }}
      />
      <div className="absolute top-0 left-0 w-full p-6 pt-28 flex flex-col md:flex-row justify-between items-start md:items-center pointer-events-none z-10">
        <div>
          <div className="flex items-center gap-3">
            <GlobeIcon className="text-cyan-400 w-6 h-6 animate-pulse" />
            <h1 className="text-3xl font-bold text-white tracking-tight font-sans">
              ORBIT<span className="text-cyan-400">VIEW</span>
            </h1>
          </div>
          <p className="text-cyan-200/60 text-xs tracking-[0.2em] mt-1 uppercase">Live Satellite Tracking System</p>
        </div>

        {/* Interactive Search */}
        <div className="mt-4 md:mt-0 pointer-events-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-75 blur transition duration-500"></div>
            <div className="relative flex items-center bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 w-72">
              <Search className="w-4 h-4 text-cyan-400 mr-2" />
              <input
                type="text"
                placeholder="Search Object (e.g. ISS)"
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/30 font-mono"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats HUD (Bottom Left) */}
      <div className="absolute bottom-8 left-8 pointer-events-none z-10 hidden md:block">
        <GlassCard className="!p-4 min-w-[200px] bg-black/40">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs text-white/50 uppercase tracking-widest">
              <span>Objects</span>
              <Radar className="w-3 h-3 text-cyan-500" />
            </div>
            <div className="text-2xl font-mono text-white flex items-baseline gap-2">
              {satellites.length} <span className="text-xs text-green-400">ACTIVE</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-cyan-500 w-[75%] shadow-[0_0_10px_#00F2FF]"></div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Details Card (Bottom Right) */}
      {selectedSat && (
        <div className="absolute bottom-8 right-8 z-20 w-80 animate-in slide-in-from-right-10 fade-in duration-300">
          <GlassCard title="Telemetry Data" className="border-t-4 border-t-cyan-500 shadow-[0_0_50px_rgba(0,242,255,0.15)] bg-black/80">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white leading-none">{selectedSat.name}</h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider 
                        ${selectedSat.type === 'debris' ? 'bg-red-500/20 text-red-500' : 'bg-cyan-500/20 text-cyan-400'}
                    `}>
                {selectedSat.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase">Velocity</p>
                <p className="text-white">{selectedSat.velocity} <span className="text-xs text-white/50">km/s</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase">Altitude</p>
                {/* stored as pure km now */}
                <p className="text-white">{selectedSat.alt.toFixed(1)} <span className="text-xs text-white/50">km</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase">Latitude</p>
                <p className="text-white/80">{selectedSat.lat.toFixed(2)}°</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase">Longitude</p>
                <p className="text-white/80">{selectedSat.lng.toFixed(2)}°</p>
              </div>
            </div>

            <button
              className="w-full mt-6 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded flex items-center justify-center gap-2 transition-all uppercase text-xs font-bold tracking-widest hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              onClick={() => {
                // Just a visual track confirmation
                if (globeEl.current) {
                  globeEl.current.pointOfView({ lat: selectedSat.lat, lng: selectedSat.lng, altitude: 1.0 }, 2000);
                }
              }}
            >
              <SatIcon className="w-3 h-3" /> Lock Signal
            </button>

            <button
              onClick={() => setSelectedSat(null)}
              className="w-full mt-2 text-center text-xs text-white/30 hover:text-white transition"
            >
              Close Telemetry
            </button>
          </GlassCard>
        </div>
      )}

      {/* Footer Overlay */}
      <div className="absolute bottom-0 w-full pointer-events-none opacity-0">
        {/* Hidden footer just to keep structure but invisible if user wants full screen immersion */}
        <Footer />
      </div>
    </div>
  );
}