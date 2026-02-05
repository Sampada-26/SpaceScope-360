import AppShell from "./layouts/AppShell";
import GlobeScene from "./components/Globe/GlobeScene";
import SceneOverlay from "./components/SceneOverlay";
import useScrollProgress from "./hooks/useScrollProgress";
import SkyWatcher from "./pages/SkyWatcher";
import EarthGuardian from "./pages/EarthGuardian";
import CosmicClassroomSection from "./pages/CosmicClassroomSection";
import Footer from "./components/Footer";


export default function App() {
  const progress = useScrollProgress();


  // Define ranges. Tip: For testing, you can change showClassroom to 'true'
  const showSky = progress >= 0.28 && progress <= 0.60;
  const showGuardian = progress > 0.60 && progress <= 0.84;

  // Classroom shows at the end (0.84 to bottom)
  const showClassroom = progress > 0.84;


  return (
    <AppShell>
      {/* Visual background layers */}
      <div className="nebula" />
      <div className="grain" />


      {/* 3D background controlled by scroll */}
      <GlobeScene progress={progress} />
      <SceneOverlay progress={progress} />


      {/* Fixed UI Layer - Pages sit inside here */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <SkyWatcher visible={showSky} />
        <EarthGuardian visible={showGuardian} />

        {/* Pass visibility prop. SpaceAcademy has z-index 100 to stay on top */}
        <CosmicClassroomSection visible={showClassroom} />
      </div>


      <main className="relative z-10">
        {/* These provide the scroll "distance" */}
        <section className="h-[120vh]" />
        <section className="h-[140vh]" />
        <section className="h-[140vh]" />

        {/* This ID usually matches navigation buttons */}
        <section id="missions" className="h-[120vh]" />
        <section id="about" className="h-[120vh]" />


        <Footer />
      </main>
    </AppShell>
  );
}


