import { Outlet } from "react-router";
import Header from "../header";

export function Layout() {
  return (
    <main className="container mx-auto pt-16">
      <Header />
      <Outlet />
    </main>
  );
}
