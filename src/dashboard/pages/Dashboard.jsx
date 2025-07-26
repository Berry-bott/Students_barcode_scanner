import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import Tabswitcher from "../components/Tabswitcher";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Topbar />

      {/* Welcome Section */}
      <div className="px-4 sm:px-6 lg:px-10 pt-24">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-poppins mb-1">
          Dashboard
        </h1>
        <h2 className="text-sm text-gray-500 font-poppins">
          Welcome back,{" "}
          <span className="text-lg sm:text-2xl text-blue-700 font-semibold">
            Admin 👋
          </span>
        </h2>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-10 mt-6">
        <div className="bg-blue-100 p-2 sm:p-3 rounded-lg shadow-sm">
          <Tabswitcher />
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-grow px-4 sm:px-6 lg:px-10 py-6">
        <Outlet />
      </div>
    </div>
  );
}
