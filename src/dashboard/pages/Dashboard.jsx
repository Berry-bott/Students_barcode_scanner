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
        <div className="px-6 pt-20 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">
            Dashboard
          </h1>
          <h2 className="text-xl font-semibold text-blue-700 mb-1 font-poppins">
            Hi, Admin 👋
          </h2>
          <p className="text-sm text-gray-500 font-poppins">Welcome back</p>
        </div>
        {/* Tabs */}
        <div className="my-8 p-1 bg-blue-100 rounded-lg">
          <Tabswitcher />
        </div>

        {/* Tab content will render here */}
        <div className="px-4 border-4 h-[90vh]">
          <Outlet />
        </div>

        {/* Stats Cards */}
        {/* <div className="p-4 grid gap-4 grid-cols-2">
          <Card className="bg-blue-100 text-blue-800">
            <CardContent className="p-4">
              <CardTitle className="text-sm">Students Present</CardTitle>
              <CardDescription className="text-2xl font-bold">
                45
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-green-100 text-green-800">
            <CardContent className="p-4">
              <CardTitle className="text-sm">On Leave</CardTitle>
              <CardDescription className="text-2xl font-bold">
                5
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100 text-yellow-800">
            <CardContent className="p-4">
              <CardTitle className="text-sm">Absent</CardTitle>
              <CardDescription className="text-2xl font-bold">
                8
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-purple-100 text-purple-800">
            <CardContent className="p-4">
              <CardTitle className="text-sm">Total Students</CardTitle>
              <CardDescription className="text-2xl font-bold">
                58
              </CardDescription>
            </CardContent>
          </Card>
        </div> */}

        {/* Recent Attendance */}
        {/* <div className="p-4">
          <h3 className="font-semibold mb-2">Recent Attendance</h3>
          <div className="space-y-2">
            {["John Doe", "Jane Smith", "Ali Musa"].map((name, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex justify-between">
                  <span>{name}</span>
                  <span className="text-green-600 font-medium">Present</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

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
