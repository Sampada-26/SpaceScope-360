import { MapPin, Search } from "lucide-react";
import worldMap from "../../assets/world-map.svg";
import Footer from "../../components/Footer";
import { useUi } from "../../context/UiContext";

const spots = [
  {
    name: "Atacama Quiet Zone",
    country: "Chile",
    pollution: "Low",
    rating: "4.9",
  },
  {
    name: "Ladakh Sky Reserve",
    country: "India",
    pollution: "Low",
    rating: "4.8",
  },
  {
    name: "Big Bend Vista",
    country: "USA",
    pollution: "Medium",
    rating: "4.6",
  },
  {
    name: "Namib Night Dunes",
    country: "Namibia",
    pollution: "Low",
    rating: "4.7",
  },
];

export default function StargazingSpots() {
  const { t } = useUi();

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

          <button className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-white/10 hover:border-white/30 transition">
            <Search className="h-4 w-4 text-cyan-200/80" />
            {t("Run Search")}
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">
            <div>
              <label className="text-xs text-white/60">{t("Country")}</label>
              <select className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white">
                <option>Chile</option>
                <option>India</option>
                <option>USA</option>
                <option>Namibia</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/60">{t("State")}</label>
              <select className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white">
                <option>Antofagasta</option>
                <option>Ladakh</option>
                <option>Texas</option>
                <option>Erongo</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/60">{t("Taluka")}</label>
              <select className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white">
                <option>Calama</option>
                <option>Leh</option>
                <option>Presidio</option>
                <option>Swakopmund</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/60">{t("Light Pollution Level")}</label>
              <select className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white">
                <option>{t("Low")}</option>
                <option>{t("Medium")}</option>
                <option>{t("High")}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/60">{t("Best Season")}</label>
              <select className="mt-2 w-full rounded-xl bg-slate-900/80 border border-white/20 px-3 py-2 text-sm text-white">
                <option>{t("Winter")}</option>
                <option>{t("Summer")}</option>
                <option>{t("Monsoon")}</option>
              </select>
            </div>
            <button className="w-full mt-2 rounded-xl bg-gradient-to-r from-cyan-400/80 to-blue-500/80 py-2 text-sm font-semibold text-white hover:from-cyan-300/80 hover:to-blue-400/80 transition glow-ring">
              {t("Search Spots")}
            </button>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-4 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 starfield opacity-40" />
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                <img src={worldMap} alt="World map" className="w-full h-64 md:h-80 object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 glass rounded-full px-4 py-2 text-xs border border-white/10 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-200/80" />
                  {t("Global visibility zones (mock)")}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {spots.map((spot) => (
                <div key={spot.name} className="glass rounded-2xl p-4 border border-white/10 hover:border-white/30 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-white">{spot.name}</div>
                      <div className="text-xs text-white/60 mt-1">{spot.country}</div>
                    </div>
                    <div className="text-xs text-cyan-200/80">⭐ {spot.rating}</div>
                  </div>
                  <div className="mt-3 text-xs text-white/70">
                    {t("Light pollution")}: {t(spot.pollution)}
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
