import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";

export default function Contact() {
  return (
    <div className="relative z-10 px-6 md:px-12 pt-28 pb-16">
      <div className="mx-auto max-w-6xl">
        <GlassCard title="Contact">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-2xl font-semibold text-white">
                Let’s connect
              </div>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">
                Send feedback, partnership requests, or feature ideas. We reply
                as soon as possible.
              </p>

              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div>
                  <span className="text-white/80 font-medium">Email: </span>
                  <a className="underline underline-offset-4" href="mailto:contact@spacescope360.com">
                    contact@spacescope360.com
                  </a>
                </div>
                <div>
                  <span className="text-white/80 font-medium">Status: </span>
                  <span>Active development</span>
                </div>
              </div>
            </div>

            <form
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl space-y-4 pointer-events-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-xs text-white/60">Name</label>
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60">Email</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60">Message</label>
                <textarea
                  className="mt-2 w-full min-h-[120px] rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  placeholder="How can we help?"
                />
              </div>

              <div className="flex gap-3">
                <GlassButton variant="glow">Send</GlassButton>
                <GlassButton variant="outline">Clear</GlassButton>
              </div>

              <div className="text-xs text-white/50">
                This form is UI only. Connect it to your backend later.
              </div>
            </form>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
