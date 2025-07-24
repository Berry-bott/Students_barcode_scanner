import { useState } from "react";
import { Bell, CircleUser, Sun, QrCode } from "lucide-react";

export default function Topbar() {
  const [active, setActive] = useState(null);

  const handleClick = (name) => {
    setActive(name);
    // You can replace these with real actions
    switch (name) {
      case "qr":
        alert("QR clicked!");
        break;
      case "bell":
        alert("Notifications clicked!");
        break;
      case "sun":
        alert("Theme toggled!");
        break;
      case "user":
        alert("Profile clicked!");
        break;
    }
  };

  const iconStyle = (name) =>
    `w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer
    ${
      active === name
        ? "border-blue-500 bg-blue-100 text-blue-600"
        : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md px-4 py-3 flex items-center justify-between sm:px-6 lg:px-8">
      {/* Left: QR Code */}
      <div className="flex items-center gap-2">
        <div className={iconStyle("qr")} onClick={() => handleClick("qr")}>
          <QrCode className="w-5 h-5" />
        </div>
        <span className="text-sm font-semibold hidden sm:inline font-poppins  ">
          Scan
        </span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={iconStyle("bell")} onClick={() => handleClick("bell")}>
          <Bell className="w-5 h-5" />
        </div>
        <div className={iconStyle("sun")} onClick={() => handleClick("sun")}>
          <Sun className="w-5 h-5" />
        </div>
        <div className={iconStyle("user")} onClick={() => handleClick("user")}>
          <CircleUser className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
