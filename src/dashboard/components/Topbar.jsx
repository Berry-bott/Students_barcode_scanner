// import { useState } from "react";
// import { Bell, CircleUser, Sun, QrCode } from "lucide-react";

// export default function Topbar() {
//   const [active, setActive] = useState(null);
//   const [theme, setTheme] = useState("light");

//   const handleClick = (name) => {
//     if (name === active) {
//       setActive(null); // close if clicking again
//     } else {
//       setActive(name);
//     }

//     if (name === "sun") {
//       const newTheme = theme === "light" ? "dark" : "light";
//       setTheme(newTheme);
//       document.documentElement.classList.toggle("dark", newTheme === "dark");
//     }
//   };

//   const iconStyle = (name) =>
//     `relative w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer
//     ${
//       active === name
//         ? "border-blue-500 bg-blue-100 text-blue-600"
//         : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
//     }`;

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md px-4 py-3 flex items-center justify-between sm:px-6 lg:px-8">
//       {/* Left: QR Code */}
//       <div className="flex items-center gap-2">
//         <div className={iconStyle("qr")} onClick={() => alert("QR Clicked")}>
//           <QrCode className="w-5 h-5" />
//         </div>
//         <span className="text-sm font-semibold hidden sm:inline font-poppins">
//           Scan
//         </span>
//       </div>

//       {/* Right: Icons */}
//       <div className="flex items-center gap-3 sm:gap-4 relative">
//         {/* Notifications */}
//         <div className={iconStyle("bell")} onClick={() => handleClick("bell")}>
//           <Bell className="w-5 h-5" />
//           {active === "bell" && (
//             <div className="absolute right-0 top-12 w-64 bg-white dark:bg-zinc-900 text-sm shadow-md rounded-md p-4">
//               <p className="font-semibold mb-2">Notifications</p>
//               <ul className="space-y-2">
//                 <li>• Student John Doe just checked in.</li>
//                 <li>• Attendance summary updated.</li>
//                 <li>• System maintenance at 9PM.</li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Theme Toggle */}
//         <div className={iconStyle("sun")} onClick={() => handleClick("sun")}>
//           <Sun className="w-5 h-5" />
//         </div>

//         {/* Profile Dropdown */}
//         <div className={iconStyle("user")} onClick={() => handleClick("user")}>
//           <CircleUser className="w-5 h-5" />
//           {active === "user" && (
//             <div className="absolute right-0 top-12 w-40 bg-white dark:bg-zinc-900 text-sm shadow-md rounded-md overflow-hidden">
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
//                 onClick={() => alert("Profile Page")}
//               >
//                 Profile
//               </button>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
//                 onClick={() => alert("Settings Page")}
//               >
//                 Settings
//               </button>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
//                 onClick={() => alert("Logging out")}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

import Barcodescanner from "../../Barcodescanner/Scanner";
import { supabase } from "../../lib/supabaseClient"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Bell, CircleUser, Sun, QrCode, X, Download } from "lucide-react";

export default function Topbar() {
  const [active, setActive] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showScanner, setShowScanner] = useState(false); // 👈 for scanner modal

  // Inside your Topbar component
  const navigate = useNavigate();

  const handleClick = (name) => {
    if (name === active) {
      setActive(null);
    } else {
      setActive(name);
    }

    if (name === "sun") {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }

    if (name === "qr") {
      setShowScanner(true); // 👈 show scanner
    }
  };

  const iconStyle = (name) =>
    `relative w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer
    ${
      active === name
        ? "border-blue-500 bg-blue-100 text-blue-600"
        : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
    }`;
  const handleExport = async () => {
    const { data: records, error } = await supabase
      .from("attendance")
      .select("id, reg_num, time, date, status, students(name)");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    const headers = ["Reg. Number", "Name", "Date", "Time", "Status"];
    const csvRows = [
      headers.join(","),
      ...records.map((record) =>
        [
          record.reg_num,
          record.students?.name || "",
          record.date,
          record.time,
          record.status,
        ].join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md px-4 py-3
       flex items-center justify-between sm:px-6 lg:px-8"
      >
        {/* Left: QR Code */}
        <div className="flex items-center gap-2">
          <div className={iconStyle("qr")} onClick={() => handleClick("qr")}>
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold hidden sm:inline font-poppins">
            Scan
          </span>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Notifications */}
          <div
            className={iconStyle("bell")}
            onClick={() => handleClick("bell")}
          >
            <Bell className="w-5 h-5" />
            {active === "bell" && (
              <div className="absolute right-0 top-12 w-64 bg-white dark:bg-zinc-900 text-sm shadow-md rounded-md p-4">
                <p className="font-semibold mb-2">Notifications</p>
                <ul className="space-y-2">
                  <li>• Student John Doe just checked in.</li>
                  <li>• Attendance summary updated.</li>
                  <li>• System maintenance at 9PM.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <div className={iconStyle("sun")} onClick={() => handleClick("sun")}>
            <Sun className="w-5 h-5" />
          </div>

          {/* Profile Dropdown */}
          <div
            className={iconStyle("user")}
            onClick={() => handleClick("user")}
          >
            <CircleUser className="w-5 h-5" />
            {active === "user" && (
              <div className="absolute right-0 top-12 w-40 bg-white dark:bg-zinc-900 text-sm shadow-md rounded-md overflow-hidden">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  onClick={() => alert("Profile Page")}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  onClick={() => alert("Settings Page")}
                >
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate("/"); // 👈 redirect to landing page
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div>
            <Button onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Scanner Overlay (simulate scanner popup) */}
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl text-center w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowScanner(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-2">QR Scanner</h2>
            <p className="text-sm text-gray-500 mb-4">
              Scanning in progress...
            </p>

            {/* Replace this with actual QR scanner */}
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
              <Barcodescanner />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
