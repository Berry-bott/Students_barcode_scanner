import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

// pages/Dashboard.jsx
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Home, CalendarCheck, Settings } from "lucide-react";
import Tabswitcher from "../components/Tabswitcher";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Topbar />
        <div className="px-16 pt-20 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">
            Dashboard
          </h1>
          <h2 className="text-xl font-semibold text-blue-700 mb-1 px-4 font-poppins">
            Hi, Admin 👋
          </h2>
          <p className="text-sm text-gray-500 font-poppins px-6">
            Welcome back
          </p>
        </div>

        {/* Tabs */}
        <div className="my-8 mx-12 p-1 bg-blue-100 rounded-lg">
          <Tabswitcher />
        </div>

        {/* Tab content will render here */}
        <div className="px-4 border h-[vh]">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        {/* <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t flex justify-around py-2">
          <div className="flex flex-col items-center text-blue-600">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <CalendarCheck size={20} />
            <span className="text-xs">Attendance</span>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </div>
        </div> */}
      </div>
    </>
  );
}
