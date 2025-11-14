import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";

// this layout changes depending on devices
// this is layout for phone and tablet
export function BaseLayout() {
  return <>
    <header>
      
    </header>

    <main>

      <Outlet />

    </main>

    <nav>
      <NavBar />
    </nav>
  </>
}