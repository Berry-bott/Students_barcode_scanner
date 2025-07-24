// // export default function SideNBar() {
// //   return (
// //     <>
// //       {/* <h1 className="bg-white">
// //         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
// //         reiciendis tenetur unde amet, quisquam deleniti, iure perspiciatis
// //         quidem explicabo et vero minus quibusdam vel, sunt consequatur nisi
// //         atque blanditiis aspernatur.
// //       </h1> */}

// //     </>
// //   );
// // }

// // components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Users,
//   CalendarCheck,
//   BarChart3,
//   Settings as SettingsIcon,
// } from "lucide-react";

// const Sidebar = () => {
//   const links = [
//     { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
//     { to: "/dashboard/students", label: "Students", icon: <Users size={18} /> },
//     {
//       to: "/dashboard/attendance",
//       label: "Attendance",
//       icon: <CalendarCheck size={18} />,
//     },
//     {
//       to: "/dashboard/reports",
//       label: "Reports",
//       icon: <BarChart3 size={18} />,
//     },
//     {
//       to: "/dashboard/settings",
//       label: "Settings",
//       icon: <SettingsIcon size={18} />,
//     },
//   ];

//   return (
//     <aside className="w-64 bg-blue-900 text-white min-h-screen sticky top-0">
//       <div className="p-4 text-2xl font-bold border-b border-blue-700">
//         ATTENDANCE
//       </div>
//       <nav className="mt-6">
//         <ul className="space-y-2">
//           {links.map(({ to, label, icon }) => (
//             <li key={to}>
//               <NavLink
//                 to={to}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${
//                     isActive ? "bg-blue-800" : ""
//                   }`
//                 }
//               >
//                 {icon} {label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
