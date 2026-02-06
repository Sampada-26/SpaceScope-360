import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import { useUi } from "../context/UiContext";
import Footer from "../components/Footer";

export default function Contact() {
  const { t } = useUi();

  return (
    <div className="relative z-10 px-6 md:px-12 pt-28 pb-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
            {t("Contact")}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            {t("Let’s connect")}
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-white/70">
            {t(
              "Send feedback, partnership requests, or feature ideas. We reply as soon as possible."
            )}
          </p>
        </div>

        <GlassCard title={t("Contact")}>
          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] items-stretch">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
              <div className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {t("Support")}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {t("We’re here to help")}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {t(
                      "Reach out for collaborations, data partnerships, or community pilots."
                    )}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-white/60">{t("Email")}</p>
                    <a
                      className="mt-2 block text-sm font-semibold text-white hover:text-cyan-200 transition"
                      href="mailto:contact@singularity.com"
                    >
                      contact@singularity.com
                    </a>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-white/60">{t("Status")}</p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {t("Active development")}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {t("Typical response")}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {t("Within 24–48 hours")}
                  </p>
                </div>
              </div>
            </div>

            <form
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 backdrop-blur-xl space-y-4 pointer-events-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-xs text-white/60">{t("Name")}</label>
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  placeholder={t("Your name")}
                />
              </div>

              <div>
                <label className="block text-xs text-white/60">{t("Email")}</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  placeholder={t("you@example.com")}
                />
              </div>

              <div>
                <label className="block text-xs text-white/60">{t("Message")}</label>
                <textarea
                  className="mt-2 w-full min-h-[150px] rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  placeholder={t("How can we help?")}
                />
              </div>

              <div className="flex gap-3">
                <GlassButton variant="glow">{t("Send")}</GlassButton>
                <GlassButton variant="outline">{t("Clear")}</GlassButton>
              </div>

              <div className="text-xs text-white/50">
                {t("This form is UI only. Connect it to your backend later.")}
              </div>
            </form>
          </div>
        </GlassCard>
        <Footer />
      </div>
    </div>
  );
}
