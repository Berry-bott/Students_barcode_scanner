// import { useLocation, useNavigate } from "react-router-dom";

// const tabs = [
//   { label: "Overview", path: "/dashboard/overview" },
//   // { label: "Classes", path: "/dashboard/dashboard/classes" },
//   { label: "Attendance", path: "/dashboard/attendance" },
//   { label: "Students", path: "/dashboard/students" },
//   { label: "Reports", path: "/dashboard/reports" },
// ];

// export default function TabSwitcher() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <div className="flex justify-around px-2 ">
//       {tabs.map(({ label, path }) => (
//         <button
//           key={path}
//           onClick={() => navigate(path)}
//           className={`px-32 py-2 text-sm rounded-md transition-all duration-200
//           ${
//             location.pathname === path
//               ? "bg-white font-medium shadow font-poppins"
//               : "text-gray-500 hover:text-black font-poppins"
//           }`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, BarChart2 } from "lucide-react";

const tabs = [
  { label: "Overview", path: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Attendance", path: "/dashboard/attendance", icon: CalendarCheck },
  { label: "Students", path: "/dashboard/students", icon: Users },
  { label: "Reports", path: "/dashboard/reports", icon: BarChart2 },
];

export default function TabSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3 w-full">
      {tabs.map(({ label, path, icon: Icon }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-poppins text-sm transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "bg-white shadow-lg text-black scale-105"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black"
              }
            `}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
