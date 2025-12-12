import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { memo } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";

const Sidebar = memo(() => (
  <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">
        Крипто Конвертер
      </h2>

      <nav className="space-y-2">
        <Link
          to="/converter"
          className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          activeProps={{
            className:
              "bg-blue-500 text-white hover:bg-blue-600 hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700",
          }}
        >
          💱 Конвертер валют
        </Link>

        <Link
          to="/percents"
          className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          activeProps={{
            className:
              "bg-blue-500 text-white hover:bg-blue-600 hover:text-white dark:bg-blue-600 dark:hover:bg-blue-700",
          }}
        >
          🧮 Обчислення
        </Link>
      </nav>
    </div>
  </aside>
));

function RootComponent() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    console.log("Current theme:", theme); // Для debug
    document.documentElement.setAttribute("data-theme", theme);
    // Також додаємо клас для dark: варіантів Tailwind
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    // ВИДАЛЯЄМО: bg-gray-50 dark:bg-gray-900
    <div className="flex min-h-screen text-gray-900 dark:text-white">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
export const Route = createRootRoute({
  component: RootComponent,
});
