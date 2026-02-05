import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import satelliteImg from "../assets/satellite.jpg";
import spaceImg from "../assets/space.jpg";

function ImagePanel({
  label,
  src,
  alt,
}: {
  label: string;
  src: string;
  alt: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="relative aspect-[16/9] w-full">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/25 px-4 py-2 text-[11px] tracking-[0.25em] uppercase text-white/70 backdrop-blur-md">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function GetStarted() {
  return (
    <div className="relative z-10 px-6 md:px-12 pt-28 pb-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <GlassCard title="Get Started">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-2xl font-semibold text-white">
                Launch SpaceScope 360
              </div>

              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                Choose a module to begin exploring real-time sky events, Earth
                intelligence, and mission learning.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 pointer-events-auto">
                <Link to="/sky-watcher">
                  <GlassButton variant="glow">Open Sky Watcher</GlassButton>
                </Link>

                <Link to="/earth-guardian">
                  <GlassButton variant="outline">Open Earth Guardian</GlassButton>
                </Link>

                <Link to="/cosmic-classroom">
                  <GlassButton variant="outline">
                    Open Cosmic Classroom
                  </GlassButton>
                </Link>
              </div>

              <div className="mt-6 text-xs text-white/50">
                Tip: Use the navbar to jump between modules anytime.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="text-white/80 font-medium">Quick Setup</div>

              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>Enable notifications for event alerts</li>
                <li>Set your location for visibility windows</li>
                <li>Explore missions and save timelines</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <GlassCard title="Our Mission">
              <div className="text-2xl font-semibold text-white leading-tight">
                Explore space as a guided experience
              </div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                We transform scattered space information into a single,
                interactive ecosystem—built for students, enthusiasts, and
                real-world relevance.
              </p>

              <div className="mt-6 flex gap-3 pointer-events-auto">
                <GlassButton variant="glow">Explore Modules</GlassButton>
                <GlassButton variant="outline">Read More</GlassButton>
              </div>
            </GlassCard>

            <ImagePanel
              label="Mission Visual"
              src={spaceImg}
              alt="Mission visual"
            />
          </div>

          <div className="space-y-6">
            <ImagePanel
              label="Innovation Visual"
              src={satelliteImg}
              alt="Innovation visual"
            />

            <GlassCard title="Our Capabilities">
              <div className="text-2xl font-semibold text-white leading-tight">
                Innovation that feels usable
              </div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                Alerts, visibility windows, mission timelines, and learning
                tools—wrapped in a premium UI that makes complex data easy to act
                on.
              </p>

              <div className="mt-6 flex gap-3 pointer-events-auto">
                <GlassButton variant="glow">Learn More</GlassButton>
                <GlassButton variant="outline">See Features</GlassButton>
              </div>
            </GlassCard>
          </div>
        </section>

        <GlassCard title="What makes it different">
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-white/80 font-medium">Clear visibility</div>
              <p className="mt-2 text-white/65 leading-relaxed">
                Location-aware sky events and clean timelines that reduce
                scattered browsing.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-white/80 font-medium">Actionable insights</div>
              <p className="mt-2 text-white/65 leading-relaxed">
                Convert raw updates into alerts and summaries that are fast to
                understand.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-white/80 font-medium">Learning-first</div>
              <p className="mt-2 text-white/65 leading-relaxed">
                Built-in learning layers, quizzes, and mission context so users
                learn while exploring.
              </p>
            </div>
          </div>
        </GlassCard>

        <Footer />
      </div>
    </div>
  );
}
