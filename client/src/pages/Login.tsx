import { motion } from "framer-motion";
// GlassButton import removed

const Login = () => {
    const handleGoogleLogin = () => {
        // Redirect to Backend Auth via Proxy
        window.location.href = "/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white">
            {/* Background elements (matching the main theme) */}
            <div className="absolute inset-0 bg-[#0B0E14] -z-20" />
            <div className="nebula opacity-60" />
            <div className="grain" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass p-12 rounded-3xl w-full max-w-md text-center border border-white/10 shadow-2xl relative z-10"
            >
                <div className="mb-8">
                    <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-glow mb-4" />
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>
                    <p className="text-white/60">Access the SpaceScope Command Center</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        {/* Google Icon SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0B0E14] px-2 text-white/40">Secure Access</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
