import GlassCard from "../components/GlassCard";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function CosmicClassroomSection({ visible }: { visible: boolean }) {
    return (
        <div
            id="classroom"
            className={`absolute inset-0 flex items-center justify-end px-6 md:px-12 pb-48 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className={`max-w-xl w-full space-y-4 ${visible ? "pointer-events-auto" : ""}`}>
                <GlassCard title="The Cosmic Classroom" className="hud-grid">
                    <div className="text-2xl font-semibold leading-tight flex items-center gap-3">
                        <GraduationCap className="text-cyan-400" size={28} />
                        <span>Academy Uplink</span>
                    </div>
                    <p className="mt-2 text-white/75 text-sm">
                        Learn space like a mission specialist. Master orbital mechanics, flight systems, and earn your certification.
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                        <div className="glass rounded-xl p-3 border-cyan-500/10">
                            <div className="text-white/60">Modules</div>
                            <div className="mt-1 font-semibold text-cyan-300">4 Active</div>
                        </div>
                        <div className="glass rounded-xl p-3 border-purple-500/10">
                            <div className="text-white/60">Rank</div>
                            <div className="mt-1 font-semibold text-purple-300">Cadet</div>
                        </div>
                        <div className="glass rounded-xl p-3 border-blue-500/10">
                            <div className="text-white/60">Status</div>
                            <div className="mt-1 font-semibold flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                Open
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/cosmic-classroom"
                            className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-bold transition-all active:scale-[0.98] bg-emerald-500/10 border border-emerald-500/20 shadow-glow hover:bg-emerald-500/20 hover:border-emerald-500/40 text-emerald-100 uppercase tracking-widest backdrop-blur-md"
                        >
                            Launch Academy
                        </Link>
                    </div>

                    <div className="mt-4 text-[10px] text-white/40 uppercase tracking-wider text-center">
                        Restricted Access • Authorized Personnel Only
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
