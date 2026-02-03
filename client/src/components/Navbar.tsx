import GlassButton from "./GlassButton";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className="glass mx-auto max-w-6xl rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 shadow-glow" />
          <div className="font-semibold tracking-wide">
            SpaceScope <span className="text-white/70">360</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a className="hover:text-white transition" href="#sky">Sky Watcher</a>
          <a className="hover:text-white transition" href="#guardian">Earth Guardian</a>
          <a className="hover:text-white transition" href="#classroom">Cosmic Classroom</a>
          <a className="hover:text-white transition" href="#missions">Missions</a>
          <a className="hover:text-white transition" href="#about">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <GlassButton variant="outline">Login</GlassButton>
          <GlassButton variant="glow">Sign Up</GlassButton>
        </div>
      </div>
    </div>
  );
}
