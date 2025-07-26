import { useState } from "react";
import { Bell, CircleUser, Sun, QrCode } from "lucide-react";

export default function Topbar() {
  const [active, setActive] = useState(null);
  const [theme, setTheme] = useState("light");

  const handleClick = (name) => {
    if (name === active) {
      setActive(null); // close if clicking again
    } else {
      setActive(name);
    }

    if (name === "sun") {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const iconStyle = (name) =>
    `relative w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer
    ${
      active === name
        ? "border-blue-500 bg-blue-100 text-blue-600"
        : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md px-4 py-3 flex items-center justify-between sm:px-6 lg:px-8">
      {/* Left: QR Code */}
      <div className="flex items-center gap-2">
        <div className={iconStyle("qr")} onClick={() => alert("QR Clicked")}>
          <QrCode className="w-5 h-5" />
        </div>
        <span className="text-sm font-semibold hidden sm:inline font-poppins">
          Scan
        </span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        {/* Notifications */}
        <div className={iconStyle("bell")} onClick={() => handleClick("bell")}>
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
        <div className={iconStyle("user")} onClick={() => handleClick("user")}>
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
                onClick={() => alert("Logging out")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
