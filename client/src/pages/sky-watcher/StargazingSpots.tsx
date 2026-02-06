import { useEffect, useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import worldMap from "../../assets/world-map.svg";
import Footer from "../../components/Footer";
import { useUi } from "../../context/UiContext";

type Spot = {
  id: string;
  name: string;
  country: string;
  state: string;
  taluka: string;
  latitude: number;
  longitude: number;
  population: number;
  cloudCoverMean: number | null;
  pollution: "Low" | "Medium" | "High";
  bestSeason: "Winter" | "Summer";
  rating: number;
};

const DUMMY_SPOTS: Spot[] = [
  {
    id: "spot-1",
    name: "Ladakh Sky Reserve",
    country: "India",
    state: "Ladakh",
    taluka: "Leh",
    latitude: 34.1526,
    longitude: 77.5771,
    population: 30000,
    cloudCoverMean: 19.2,
    pollution: "Low",
    bestSeason: "Winter",
    rating: 4.8,
  },
  {
    id: "spot-2",
    name: "Atacama Quiet Zone",
    country: "Chile",
    state: "Antofagasta",
    taluka: "Calama",
    latitude: -22.46,
    longitude: -68.93,
    population: 40000,
    cloudCoverMean: 14.1,
    pollution: "Low",
    bestSeason: "Summer",
    rating: 4.9,
  },
  {
    id: "spot-3",
    name: "Big Bend Vista",
    country: "USA",
    state: "Texas",
    taluka: "Presidio",
    latitude: 29.25,
    longitude: -103.25,
    population: 135000,
    cloudCoverMean: 32.5,
    pollution: "Medium",
    bestSeason: "Winter",
    rating: 4.5,
  },
  {
    id: "spot-4",
    name: "Namib Night Dunes",
    country: "Namibia",
    state: "Erongo",
    taluka: "Swakopmund",
    latitude: -22.68,
    longitude: 14.53,
    population: 50000,
    cloudCoverMean: 20.4,
    pollution: "Low",
    bestSeason: "Summer",
    rating: 4.7,
  },
  {
    id: "spot-5",
    name: "Nullarbor Dark Plain",
    country: "Australia",
    state: "South Australia",
    taluka: "Ceduna",
    latitude: -31.0,
    longitude: 131.0,
    population: 70000,
    cloudCoverMean: 24.7,
    pollution: "Low",
    bestSeason: "Summer",
    rating: 4.6,
  },
  {
    id: "spot-6",
    name: "Andes Ridge Watch",
    country: "Argentina",
    state: "Mendoza",
    taluka: "Malargue",
    latitude: -35.47,
    longitude: -69.58,
    population: 220000,
    cloudCoverMean: 28.9,
    pollution: "Medium",
    bestSeason: "Summer",
    rating: 4.4,
  },
];

export default function StargazingSpots() {
  const { t } = useUi();
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [taluka, setTaluka] = useState("");
  const [pollution, setPollution] = useState<"All" | "Low" | "Medium" | "High">("All");
  const [season, setSeason] = useState<"All" | "Winter" | "Summer">("All");
  const [spots, setSpots] = useState<Spot[]>(DUMMY_SPOTS);
  const [activeCountry, setActiveCountry] = useState("");
  const [activeState, setActiveState] = useState("");
  const [activeTaluka, setActiveTaluka] = useState("");
  const [activePollution, setActivePollution] = useState<"All" | "Low" | "Medium" | "High">("All");
  const [activeSeason, setActiveSeason] = useState<"All" | "Winter" | "Summer">("All");
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  const normalizedCountryInput = useMemo(() => {
    const raw = activeCountry.trim().toLowerCase();
    if (!raw) return "";
    const countryCodeMap: Record<string, string> = {
      us: "usa",
      in: "india",
      cl: "chile",
      au: "australia",
      ar: "argentina",
      na: "namibia",
    };
    return countryCodeMap[raw] || raw;
  }, [activeCountry]);

  const filteredSpots = useMemo(
    () =>
      spots.filter((spot) => {
        const pollutionMatch = activePollution === "All" || spot.pollution === activePollution;
        const seasonMatch = activeSeason === "All" || spot.bestSeason === activeSeason;
        const countryMatch =
          !normalizedCountryInput ||
          spot.country.toLowerCase().includes(normalizedCountryInput);
        const stateMatch =
          !activeState ||
          spot.state.toLowerCase().includes(activeState.toLowerCase());
        const talukaMatch =
          !activeTaluka ||
          spot.taluka.toLowerCase().includes(activeTaluka.toLowerCase());
        return pollutionMatch && seasonMatch && countryMatch && stateMatch && talukaMatch;
      }),
    [spots, normalizedCountryInput, activeState, activeTaluka, activePollution, activeSeason]
  );

  const avgCloudCover = useMemo(() => {
    if (!filteredSpots.length) return 0;
    const total = filteredSpots.reduce((sum, spot) => sum + (spot.cloudCoverMean ?? 0), 0);
    return total / filteredSpots.length;
  }, [filteredSpots]);

  const cloudOverlayOpacity = useMemo(() => {
    const normalized = Math.max(0.12, Math.min(0.5, avgCloudCover / 130));
    return Number(normalized.toFixed(2));
  }, [avgCloudCover]);

  const cloudDriftDuration = useMemo(() => {
    const seconds = Math.max(6, 16 - avgCloudCover / 8);
    return `${seconds.toFixed(1)}s`;
  }, [avgCloudCover]);

  const applyFilters = () => {
    setActiveCountry(country.trim());
    setActiveState(stateName.trim());
    setActiveTaluka(taluka.trim());
    setActivePollution(pollution);
    setActiveSeason(season);
  };

  const handleEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      applyFilters();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSpots((prev) =>
        prev.map((spot) => {
          const jitter = (Math.random() - 0.5) * 4;
          const nextCloud = Math.max(5, Math.min(90, (spot.cloudCoverMean ?? 30) + jitter));
          const nextRating = Math.max(3.8, Math.min(5, 5 - nextCloud / 45));
          return {
            ...spot,
            cloudCoverMean: Number(nextCloud.toFixed(1)),
            rating: Number(nextRating.toFixed(1)),
          };
        })
      );
      setLastUpdated(new Date());
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="nebula" />
      <div className="grain" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
              {t("Sky Watcher")}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(120,190,255,0.35)]">
              {t("Stargazing Spots")}
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              {t(
                "Filter by region, season, and light pollution to discover pristine observation zones."
              )}
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">
            <div>
              <label className="text-xs text-white/60">{t("Country")}</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder={t("IN, US, CL")}
                className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-white/60">{t("State")}</label>
              <input
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder={t("Ladakh")}
                className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-white/60">{t("Taluka")}</label>
              <input
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                onKeyDown={handleEnterSearch}
                placeholder={t("Leh")}
                className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-white/60">{t("Light Pollution Level")}</label>
              <select
                value={pollution}
                onChange={(e) => setPollution(e.target.value as "All" | "Low" | "Medium" | "High")}
                className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white"
              >
                <option value="All">{t("All")}</option>
                <option value="Low">{t("Low")}</option>
                <option value="Medium">{t("Medium")}</option>
                <option value="High">{t("High")}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/60">{t("Best Season")}</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as "All" | "Winter" | "Summer")}
                className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white"
              >
                <option value="All">{t("All")}</option>
                <option value="Winter">{t("Winter")}</option>
                <option value="Summer">{t("Summer")}</option>
              </select>
            </div>
            <button
              onClick={applyFilters}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-cyan-400/80 to-blue-500/80 py-2 text-sm font-semibold text-white hover:from-cyan-300/80 hover:to-blue-400/80 transition glow-ring"
            >
              {t("Search Spots")}
            </button>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-4 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 starfield opacity-40" />
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                <img src={worldMap} alt="World map" className="w-full h-64 md:h-80 object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div
                  className="absolute inset-0 cloud-drift transition-opacity duration-300"
                  style={{
                    opacity: cloudOverlayOpacity,
                    animationDuration: cloudDriftDuration,
                    background:
                      "radial-gradient(220px 130px at 26% 45%, rgba(120,170,255,0.4), transparent 70%), radial-gradient(180px 110px at 53% 30%, rgba(120,170,255,0.36), transparent 72%), radial-gradient(210px 140px at 77% 44%, rgba(120,170,255,0.38), transparent 70%)",
                  }}
                />
                <div
                  className="absolute inset-0 cloud-drift-reverse transition-opacity duration-300"
                  style={{
                    opacity: Math.max(0.08, cloudOverlayOpacity - 0.08),
                    animationDuration: `${(Number.parseFloat(cloudDriftDuration) * 1.35).toFixed(1)}s`,
                    background:
                      "radial-gradient(240px 150px at 18% 34%, rgba(170,210,255,0.24), transparent 72%), radial-gradient(200px 120px at 66% 38%, rgba(170,210,255,0.22), transparent 70%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 glass rounded-full px-4 py-2 text-xs border border-white/10 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-200/80" />
                  {t("Global visibility zones")}
                </div>
                <div className="absolute bottom-4 right-4 glass rounded-full px-4 py-2 text-xs border border-white/10 text-white/75">
                  {t("Live update")}: {lastUpdated.toLocaleTimeString()}
                </div>
                <div className="absolute top-4 right-4 glass rounded-full px-4 py-2 text-xs border border-white/10 text-white/75">
                  {t("Avg cloud cover")}: {avgCloudCover.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredSpots.length === 0 && (
                <div className="md:col-span-2 glass rounded-2xl p-4 border border-white/10 text-sm text-white/70">
                  {t("No spots found for these filters.")}
                </div>
              )}
              {filteredSpots.map((spot) => (
                <div key={spot.id} className="glass rounded-2xl p-4 border border-white/10 hover:border-white/30 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-white">{spot.name}</div>
                      <div className="text-xs text-white/60 mt-1">
                        {spot.state ? `${spot.state}, ` : ""}{spot.country}
                      </div>
                    </div>
                    <div className="text-xs text-cyan-200/80">⭐ {spot.rating}</div>
                  </div>
                  <div className="mt-3 text-xs text-white/70">
                    {t("Light pollution")}: {t(spot.pollution)}
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    {t("Cloud cover")}: {spot.cloudCoverMean == null ? "--" : `${spot.cloudCoverMean}%`}
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    {t("Coordinates")}: {spot.latitude.toFixed(2)}, {spot.longitude.toFixed(2)}
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    {t("Best Season")}: {t(spot.bestSeason)}
                  </div>
                  <button className="mt-4 text-xs px-3 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition">
                    {t("View Details")}
                  </button>
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
