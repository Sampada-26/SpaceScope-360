import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  const showSky = progress >= 0.28 && progress <= 0.60;
  const showGuardian = progress > 0.60 && progress <= 0.84;
  const showClassroom = progress > 0.84 && progress < 0.90;

  if (loading) return null; // Or a loading spinner

  return (
    <AppShell>
      <div className="nebula" />
      <div className="grain" />

      <GlobeScene progress={progress} />
      <SceneOverlay progress={progress} />

      <div className="fixed inset-0 pointer-events-none z-20">
        <SkyWatcher visible={showSky} />
        <EarthGuardian visible={showGuardian} />
        <CosmicClassroom visible={showClassroom} />
      </div>

      <main className="relative z-10">
        <section className="h-[120vh]" />
        <section className="h-[140vh]" />
        <section className="h-[140vh]" />
        <section id="missions" className="h-[120vh]" />
        <section id="about" className="h-[120vh]" />

        <Footer />
      </main>
    </AppShell>
  );
}
