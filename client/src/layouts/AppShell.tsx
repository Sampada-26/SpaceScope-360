import React from "react";
import Navbar from "../components/Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      {children}
    </div>
  );
}
