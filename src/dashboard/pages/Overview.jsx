"use client";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";


export default function Overview() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({
    present: 0,
    total: 0,
    absent: 0,
    onLeave: 0,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split("T")[0];

      const { data: attendance, error: attError } = await supabase
        .from("attendance")
        .select("reg_num, time, date, status, students(id, name, gender)")
        .eq("date", today)
        .order("time", { ascending: false });

      const { data: allStudents, error: allStudentsError } = await supabase
        .from("students")
        .select("*");

      if (attError || allStudentsError) {
        console.error(attError || allStudentsError);
        return;
      }

      setAttendanceData(attendance);

      const presentCount = attendance.filter((a) => a.status === "present").length;
      const totalCount = allStudents.length;
      const absentCount = totalCount - presentCount;

      setStats({
        present: presentCount,
        total: totalCount,
        absent: absentCount,
        onLeave: 0, // Optional: if you track "leave" in attendance.status
      });
    };

    fetchData();
  }, []);

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-4 space-y-8 font-poppins">
      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          {
            label: "Students Present",
            value: stats.present,
            bg: "bg-blue-100",
            text: "text-blue-800",
          },
          {
            label: "On Leave",
            value: stats.onLeave,
            bg: "bg-green-100",
            text: "text-green-800",
          },
          {
            label: "Absent",
            value: stats.absent,
            bg: "bg-yellow-100",
            text: "text-yellow-800",
          },
          {
            label: "Total Students",
            value: stats.total,
            bg: "bg-purple-100",
            text: "text-purple-800",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className={`${item.bg} ${item.text} rounded-lg transition`}>
              <CardContent className="p-4">
                <CardTitle className="text-sm">{item.label}</CardTitle>
                <CardDescription className="text-2xl font-bold">
                  {item.value}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Students Attendance Overview
        </h2>
        <div className="overflow-y-auto rounded-lg shadow border h-[400px]">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 border">S/N</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Time of Scan</th>
                <th className="px-4 py-2 border">Reg. No</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {attendanceData.map((a, i) => (
                <motion.tr
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="border-t"
                >
                  <td className="px-4 py-2 border">{i + 1}</td>
                  <td className="px-4 py-2 border">{a.students?.name || "Unknown"}</td>
                  <td className="px-4 py-2 border">{a.students?.gender || "-"}</td>
                  <td className="px-4 py-2 border">{formatTime(a.time)}</td>
                  <td className="px-4 py-2 border">{a.reg_num}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
        className="p-2"
      >
        <h3 className="font-semibold mb-3">Recent Attendance</h3>
        <div className="space-y-2">
          {attendanceData.slice(0, 3).map((a, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 flex justify-between items-center">
                  <span>{a.students?.name || "Unknown"}</span>
                  <span className="text-green-600 font-medium">
                    {a.status}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

