// components/Layout.jsx
import React from "react";
import Tabswitcher from "../components/Tabswitcher";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
      <Tabswitcher />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
