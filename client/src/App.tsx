import Landing from "./pages/Landing";
import useScrollProgress from "./hooks/useScrollProgress";

export default function App() {
  const progress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-black text-white">

      <div className="relative z-10">
        <Landing />
      </div>
    </div>
  );
}
