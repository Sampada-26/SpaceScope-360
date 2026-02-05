import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import { useUi } from "../context/UiContext";

export default function Community() {
  const { t } = useUi();

  return (
    <div className="relative z-10 px-6 md:px-12 pt-28 pb-16">
      <div className="mx-auto max-w-6xl">
        <GlassCard title={t("Community")}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-2xl font-semibold text-white">
                {t("Join the SpaceScope community")}
              </div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                {t(
                  "Share skywatching photos, discuss missions, and learn together. Updates and events will be posted here."
                )}
              </p>

              <div className="mt-6 flex gap-3 pointer-events-auto">
                <GlassButton variant="glow">{t("Join Updates")}</GlassButton>
                <GlassButton variant="outline">{t("View Discussions")}</GlassButton>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="text-white/80 font-medium">{t("Coming soon")}</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>{t("Mission discussions and Q&A")}</li>
                <li>{t("Event reminders and local groups")}</li>
                <li>{t("Community challenges and badges")}</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
