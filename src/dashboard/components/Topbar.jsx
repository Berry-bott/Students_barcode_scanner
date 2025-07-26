import Barcodescanner from "../../Barcodescanner/Scanner";
import { supabase } from "../../lib/supabaseClient"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { Bell, CircleUser, Sun, QrCode, X, Download } from "lucide-react";
import { motion } from "framer-motion";

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

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("id, time, date, students(name)")
        .order("date", { ascending: false })
        .limit(5);

      if (!error && data) {
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (name === "sun") toggleTheme();

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
            {active === "bell" && (
              <div
                onClick={() => setActive(null)}
                className="fixed inset-0 bg-black/20 z-40 sm:hidden"
              />
            )}
            <Bell className="w-5 h-5" />
            {active === "bell" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-14 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 w-[90vw] sm:w-72 max-h-80 overflow-y-auto bg-white dark:bg-zinc-900 text-sm shadow-lg rounded-md p-4 z-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    Notifications
                  </p>
                  <button
                    onClick={() => setActive(null)}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {notifications.length === 0 ? (
                    <li className="text-gray-500 dark:text-gray-400">
                      No recent check-ins
                    </li>
                  ) : (
                    notifications.map((item) => (
                      <li key={item.id}>
                        •{" "}
                        <span className="font-medium">
                          {item.students?.name || "Unknown"}
                        </span>{" "}
                        checked in at{" "}
                        <span className="font-mono text-xs">{item.time}</span>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
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
