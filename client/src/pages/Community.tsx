import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import Footer from "../components/Footer";
import { useUi } from "../context/UiContext";

export default function Community() {
  const { t } = useUi();

  return (
    <>
      <div
        className="relative min-h-screen pt-24 bg-black"
      >
        <div className="pointer-events-none absolute inset-0 starfield opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        <div className="relative overflow-hidden border-y border-white/10">
          <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-12 md:py-16">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.35em] text-white/60">
                {t("COMMUNITY")}
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
                {t("Join the Singularity community")}
              </h1>
              <p className="mt-4 text-sm md:text-base text-white/75">
                {t(
                  "Share live sky sightings, swap tips, and learn together. This is the hub for real-time events, local groups, and mission discussions."
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 pointer-events-auto">
                <a
                  href="https://discord.gg/man39d2z"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GlassButton variant="glow">{t("Join Discord")}</GlassButton>
                </a>
                <Link to="/community/sky-events">
                  <GlassButton variant="outline">{t("View Discussions")}</GlassButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-12 md:py-16">
          <GlassCard title={t("Community")}>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: t("Live sky events"),
                  desc: t("Track ISS passes, meteors, aurora, and launches."),
                },
                {
                  title: t("Local groups"),
                  desc: t("Find nearby meetups, stargazing spots, and clubs."),
                },
                {
                  title: t("Mission talk"),
                  desc: t("Q&A, explainers, and classroom-friendly threads."),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <div className="text-white/85 font-medium">{item.title}</div>
                  <p className="mt-2 text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </>
  );
}
