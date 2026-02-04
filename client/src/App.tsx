import AppShell from "./layouts/AppShell";
import GlobeScene from "./components/Globe/GlobeScene";
import SceneOverlay from "./components/SceneOverlay";
import useScrollProgress from "./hooks/useScrollProgress";
import SkyWatcher from "./pages/SkyWatcher";
import EarthGuardian from "./pages/EarthGuardian";
import CosmicClassroom from "./pages/CosmicClassroom";
import Footer from "./components/Footer";

export default function App() {
  const progress = useScrollProgress();

  const showSky = progress >= 0.28 && progress <= 0.60;
  const showGuardian = progress > 0.60 && progress <= 0.84;
  const showClassroom = progress > 0.84 && progress < 0.90;


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
