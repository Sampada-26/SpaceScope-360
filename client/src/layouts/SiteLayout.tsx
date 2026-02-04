import { Outlet } from "react-router-dom";
import AppShell from "./AppShell";

export default function SiteLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
