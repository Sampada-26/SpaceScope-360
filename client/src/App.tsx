<<<<<<< HEAD
import AppShell from "./layouts/AppShell";
import GlobeScene from "./components/Globe/GlobeScene";
import SceneOverlay from "./components/SceneOverlay";
import useScrollProgress from "./hooks/useScrollProgress";
import SkyWatcher from "./pages/SkyWatcher";
import EarthGuardianOverlay from "./pages/EarthGuardianOverlay";
import CosmicClassroomSection from "./pages/CosmicClassroomSection";
import Footer from "./components/Footer";

=======
import Landing from "./pages/Landing";
>>>>>>> b1eca064a67de893756543eae0609fda03f9d212

export default function App() {
  return (
<<<<<<< HEAD
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
        <EarthGuardianOverlay visible={showGuardian} />

        {/* Pass visibility prop. SpaceAcademy has z-index 100 to stay on top */}
        <CosmicClassroomSection visible={showClassroom} />
=======
    <div className="relative min-h-screen bg-black text-white">
      <div className="relative z-10">
        <Landing />
>>>>>>> b1eca064a67de893756543eae0609fda03f9d212
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> b1eca064a67de893756543eae0609fda03f9d212
