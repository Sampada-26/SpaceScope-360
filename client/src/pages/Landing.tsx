import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EarthHero from "../components/EarthHero";
import spaceCta from "../assets/space.jpg";
import logoOne from "../assets/one.png";
import logoTwo from "../assets/two.png";
import logoThree from "../assets/three.png";
import skywatcherBg from "../assets/skywatcher.jpg";
import cosmicBg from "../assets/cosmic.jpg";
import earthBg from "../assets/earth.jpg";
import { useUi } from "../context/UiContext";

type Stat = { label: string; value: string; sub: string; icon: string };
type PricePlan = {
  name: string;
  price: string;
  unit: string;
  tag?: string;
  features: string[];
  highlighted?: boolean;
};
type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating?: number;
};


function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Glow() {
  return (
    <>
      <div className="pointer-events-none absolute -top-64 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-[-120px] h-[460px] w-[460px] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-[40%] left-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
    </>
  );
}

function PrimaryButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(34,211,238,0.25)]",
        "hover:bg-cyan-400 active:scale-[0.99] transition",
        className
      )}
    >
      {children}
    </button>
  );
}

function GhostButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white",
        "hover:bg-white/10 active:scale-[0.99] transition backdrop-blur",
        className
      )}
    >
      {children}
    </button>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
  align = "left",
}: {
  kicker?: string;
  title: string;
  desc: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center")}>
      {kicker ? (
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
        {title}
      </h2>
      <p
        className={cn(
          "text-sm md:text-base text-white/70",
          align === "center" && "mx-auto max-w-2xl"
        )}
      >
        {desc}
      </p>
    </div>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_20px_70px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function StarsBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0 1px, transparent 1px), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.12) 0 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.10) 0 1px, transparent 1px), radial-gradient(circle at 85% 65%, rgba(255,255,255,0.10) 0 1px, transparent 1px)",
        backgroundSize: "420px 420px, 520px 520px, 620px 620px, 720px 720px",
      }}
    />
  );
}

export default function Landing() {
  const { t } = useUi();

  const stats: Stat[] = [
    {
      label: t("Unified modules"),
      value: "3",
      sub: t("Sky Watcher • Classroom • Guardian"),
      icon: logoOne,
    },
    {
      label: t("Proof of Impact"),
      value: t("Ledger"),
      sub: t("Verifiable actions logged"),
      icon: logoTwo,
    },
    {
      label: t("Vernacular access"),
      value: "2",
      sub: t("Hindi • Marathi (Bhasha Mode)"),
      icon: logoThree,
    },
  ];

  const plans: PricePlan[] = [
    {
      name: t("Public Access"),
      price: "0",
      unit: t("/ forever"),
      features: [
        t("Localized insights (Hindi/Marathi)"),
        t("Sky-event visibility notifications"),
        t("Basic learning tracks"),
        t("Community disaster view"),
        t("Proof of Impact Ledger (personal)"),
      ],
    },
    {
      name: t("Education Pro"),
      price: "89",
      unit: t("/ month"),
      tag: t("Most Scalable"),
      highlighted: true,
      features: [
        t("Premium STEM certifications"),
        t("Classroom quizzes + badges"),
        t("School dashboards (class cohorts)"),
        t("Curriculum-ready missions timeline"),
        t("Impact reports for schools"),
      ],
    },
    {
      name: t("GovTech / B2B Data"),
      price: t("Custom"),
      unit: t("/ contract"),
      features: [
        t("SaaS/API licensing for agencies"),
        t("Disaster maps + alert feeds"),
        t("Agriculture & environment layers"),
        t("Audit-ready Proof of Impact exports"),
        t("Partnership onboarding & SLA"),
      ],
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: t("Students & Hobbyists"),
      role: t("Gamified space education"),
      text: t(
        "Learn space missions through a timeline, earn Cadet-to-Commander badges, and explore real-world satellite purposes with interactive facts."
      ),
      rating: 5,
    },
    {
      name: t("Educational Institutions"),
      role: t("Interactive STEM labs"),
      text: t(
        "Bring a mission-control style experience to classrooms with quizzes, timelines, and certification paths that keep students engaged."
      ),
      rating: 5,
    },
    {
      name: t("Local Authorities & NGOs"),
      role: t("Disaster + agriculture operations"),
      text: t(
        "Use satellite-driven flood/fire views, volunteer-friendly maps, and localized access to support faster coordination and field decisions."
      ),
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24">
        {/* Page background + Hero */}
        <div className="relative overflow-hidden">
          <StarsBg />
          <Glow />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

          {/* HERO */}
          <section className="relative z-10">
            <div className="relative min-h-[75vh] pt-24 pb-10 md:pt-24">
              <EarthHero />
              <div className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-10">
                <div className="text-center space-y-4 md:space-y-5">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-white/60">
                    {t("Unified space data ")}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-semibold tracking-wide text-white drop-shadow-[0_0_28px_rgba(34,211,238,0.35)]">
                    {t("Singularity")}
                  </h1>
                  <p className="mx-auto max-w-xl text-xs md:text-sm text-white/70">
                    {t(
                      "Singularity unifies scattered space data into a single, interactive ecosystem. We turn raw satellite telemetry into actionable insights for students, hobbyists, farmers, schools, NGOs, and government teams."
                    )}
                  </p>
                  <div className="flex items-center justify-center gap-3 pointer-events-auto">
                    <a href="#modules">
                      <GhostButton>{t("Explore Modules")}</GhostButton>
                    </a>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/45">
                    {t("Scroll to descend • Orbit → Earth → Learning layer")}
                  </p>
                </div>
              </div>

              <div className="relative z-30 mx-auto max-w-7xl px-6 md:px-10" />
            </div>

            {/* STATS */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((s) => (
                  <Card key={s.label} className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                          {s.label}
                        </p>
                        <div className="mt-2 flex items-end gap-2">
                          <p className="text-3xl font-semibold">{s.value}</p>
                          <p className="pb-1 text-xs text-white/60">{s.sub}</p>
                        </div>
                      </div>
                      <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <img
                          src={s.icon}
                          alt={`${s.label} icon`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION: Modules */}
        <section id="modules" className="relative">
          <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <Link to="/sky-watcher" className="group">
              <Card className="relative overflow-hidden p-8 md:p-10 flex flex-col justify-center transition hover:border-cyan-400/40 hover:bg-cyan-500/5">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25"
                  style={{ backgroundImage: `url(${skywatcherBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
                <div className="relative z-10">
                  <SectionTitle
                    kicker={t("MODULE 01")}
                    title={t("Sky Watcher")}
                    desc={t(
                      "A unified 3D globe dashboard for stars, satellites, and ISS in real-time, with Traffic Light alerts that decode solar storms and smart notifications based on your location."
                    )}
                  />

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    {[
                      { k: t("Dashboard"), v: t("3D globe view") },
                      { k: t("Alerts"), v: t("Green / Red") },
                      { k: t("Visibility"), v: t("Location-based") },
                      { k: t("Noise"), v: t("Reduced") },
                    ].map((x) => (
                      <div
                        key={x.k}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <p className="text-xs text-white/60">{x.k}</p>
                        <p className="mt-1 text-sm font-semibold">{x.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/cosmic-classroom" className="group">
              <Card className="relative overflow-hidden p-8 md:p-10 flex flex-col justify-center transition hover:border-cyan-400/40 hover:bg-cyan-500/5">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25"
                  style={{ backgroundImage: `url(${cosmicBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
                <div className="relative z-10">
                  <SectionTitle
                    kicker={t("MODULE 02")}
                    title={t("Cosmic Classroom")}
                    desc={t(
                      "A time capsule timeline from Apollo history to Artemis future, gamified learning with Cadet-to-Commander badges, and interactive facts that connect satellites to real-world purpose."
                    )}
                  />

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    {[
                      { k: t("Timeline"), v: t("Apollo → Artemis") },
                      { k: t("Badges"), v: t("Cadet → Commander") },
                      { k: t("Quizzes"), v: t("Gamified") },
                      { k: t("Facts"), v: t("Clickable satellites") },
                    ].map((x) => (
                      <div
                        key={x.k}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <p className="text-xs text-white/60">{x.k}</p>
                        <p className="mt-1 text-sm font-semibold">{x.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 md:px-10 pb-16 md:pb-20">
            <Link to="/earth-guardian" className="group">
              <Card className="relative overflow-hidden p-8 md:p-10 transition hover:border-cyan-400/40 hover:bg-cyan-500/5">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25"
                  style={{ backgroundImage: `url(${earthBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
                <div className="relative z-10">
                  <SectionTitle
                    kicker={t("MODULE 03")}
                    title={t("Earth Guardian")}
                    desc={t(
                      "A twin-view slider that shows how satellites track crops and wildfires, plus real-time flood/fire maps designed for volunteers, local authorities, and rural communities with Bhasha Mode."
                    )}
                  />

                  <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { k: t("Twin-View"), v: t("Crops / Wildfires") },
                      { k: t("Disaster maps"), v: t("Floods / Fires") },
                      { k: t("Users"), v: t("NGOs / Authorities") },
                      { k: t("Languages"), v: t("Hindi / Marathi") },
                    ].map((x) => (
                      <div
                        key={x.k}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                      >
                        <p className="text-xs text-white/60">{x.k}</p>
                        <p className="mt-1 text-sm font-semibold">{x.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* PRICING -> Revenue Streams (same UI, edited content) */}
        <section id="pricing" className="relative">
          <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20">
            <SectionTitle
              align="center"
              kicker={t("REVENUE STREAMS")}
              title={t("How Singularity sustains and scales")}
              desc={t(
                "A simple set of offerings aligned to public access, education, and institutional utility."
              )}
            />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {plans.map((p) => (
                <Card
                  key={p.name}
                  className={cn(
                    "p-7 md:p-8 relative",
                    p.highlighted && "border-cyan-400/40 bg-cyan-500/10"
                  )}
                >
                  {p.tag ? (
                    <div className="absolute -top-3 left-6 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-black">
                      {p.tag}
                    </div>
                  ) : null}

                  <p className="text-sm font-semibold">{p.name}</p>
                  <div className="mt-4 flex items-end gap-2">
                    <p className="text-4xl font-semibold">
                      {p.price === t("Custom") ? p.price : `₹${p.price}`}
                    </p>
                    <p className="pb-1 text-sm text-white/60">{p.unit}</p>
                  </div>

                  <button
                    className={cn(
                      "mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
                      p.highlighted
                        ? "bg-cyan-400 text-black hover:bg-cyan-300"
                        : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                    )}
                  >
                    {t("Select")}
                  </button>

                  <div className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 text-sm text-white/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS -> Customer Segments (same UI, edited content) */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-20">
            <SectionTitle
              align="center"
              kicker={t("CUSTOMER SEGMENTS")}
              title={t("Who Singularity serves")}
              desc={t("Designed for learning, public utility, and operational decision support.")}
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-white/60">{t.role}</p>
                    </div>
                    <div className="flex gap-1 text-white/40">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "text-sm",
                            t.rating && i < t.rating ? "text-cyan-300" : "text-white/20"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/75 leading-relaxed">{t.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
          <div className="relative mx-auto max-w-7xl px-6 md:px-10 pb-16 md:pb-20">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10"
              style={{
                backgroundImage: `url(${spaceCta})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
              <div className="relative px-6 py-16 md:px-12 md:py-20">
                <div className="max-w-2xl space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                    {t("Join the mission")}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-semibold">
                    {t("Ready to join Singularity?")}
                  </h3>
                  <p className="text-sm md:text-base text-white/70">
                    {t(
                      "Step into a cinematic space dashboard and explore missions, visibility alerts, and Earth impact insights."
                    )}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="https://discord.gg/man39d2z"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PrimaryButton>{t("Join Now")}</PrimaryButton>
                    </a>
                    <a href="#modules">
                      <GhostButton>{t("Explore Modules")}</GhostButton>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
