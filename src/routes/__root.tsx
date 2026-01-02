import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { memo } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";
import { sideBarStyles } from "../stylesTail/SideBarStyles";

const Sidebar = memo(() => (
  <aside className={sideBarStyles.headerLinks}>
    <div className="p-6">
      <h2 className={sideBarStyles.h2Text}>Крипто Конвертер</h2>

      <nav className="space-y-2">
        <Link
          to="/converter"
          className={sideBarStyles.links}
          activeProps={{
            className: sideBarStyles.activeLinks,
          }}
        >
          Конвертер валют
        </Link>

        <Link
          to="/percents"
          className={sideBarStyles.links}
          activeProps={{
            className: sideBarStyles.activeLinks,
          }}
        >
          Обчислення
        </Link>

        <Link
          to="/news"
          className={sideBarStyles.links}
          activeProps={{
            className: sideBarStyles.activeLinks,
          }}
        >
          Новини
        </Link>
        <Link
          to="/article"
          className={sideBarStyles.links}
          activeProps={{
            className: sideBarStyles.activeLinks,
          }}
        >
          Статті
        </Link>
      </nav>
    </div>
  </aside>
));

function RootComponent() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // console.log("Current theme:", theme); //  debug
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen text-gray-900 dark:text-white">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Sidebar />
      <main className="flex-1">
        {/* Коли користувач переходить на `/converter` або `/percents`, вміст цих сторінок відображається саме тут CHILDREN МАРШРУТИ*/}
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
export const Route = createRootRoute({
  component: RootComponent,
});
