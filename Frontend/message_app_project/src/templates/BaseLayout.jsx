import { Outlet } from "react-router";

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

    </nav>
  </>
}