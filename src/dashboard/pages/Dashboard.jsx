import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import Tabswitcher from "../components/Tabswitcher";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[hsl(222_47%_11%)] dark:text-white font-poppins transition-colors duration-300">
      {/* Header */}
      <Topbar />

      {/* Welcome Section */}
      <section className="px-4 sm:px-6 lg:px-10 pt-24 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
          Welcome back,{" "}
          <span className="text-blue-700 dark:text-blue-400 font-semibold text-base sm:text-lg">
            Admin 👋
          </span>
        </p>
      </section>

      {/* Tabswitcher */}
      <section className="px-4 sm:px-6 lg:px-10 mt-6">
        <div className="bg-blue-100 dark:bg-blue-950/20 p-3 sm:p-4 rounded-xl shadow-md border border-blue-200 dark:border-blue-900">
          <Tabswitcher />
        </div>
      </section>

      {/* Tab Content */}
      <main className="flex-grow px-4 sm:px-6 lg:px-10 py-6">
        <Outlet />
      </main>
    </div>
  );
}
