import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Overview", path: "/dashboard/dashboard/overview" },
  // { label: "Classes", path: "/dashboard/dashboard/classes" },
  { label: "Attendance", path: "/dashboard/dashboard/attendance" },
  { label: "Reports", path: "/dashboard/dashboard/reports" },
];

export default function TabSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-around px-2 ">
      {tabs.map(({ label, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`px-32 py-2 text-sm rounded-md transition-all duration-200 
          ${
            location.pathname === path
              ? "bg-white font-medium shadow font-poppins"
              : "text-gray-500 hover:text-black font-poppins"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
