import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { motion } from "framer-motion";
import { Home, CalendarCheck, Settings } from "lucide-react";


export default function Overview() {
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

  const students = [
    {
      sn: "1",
      id: "S001",
      name: "John Doe",
      gender: "Male",
      timeOfScan: "08:30 AM",
      regNo: "REG12345",
    },
    {
      sn: "2",
      id: "S002",
      name: "Jane Smith",
      gender: "Female",
      timeOfScan: "08:35 AM",
      regNo: "REG67890",
    },
    {
      sn: "3",
      id: "S003",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
    {
      sn: "4",
      id: "S004",
      name: "Fatima Bello",
      gender: "Female",
      timeOfScan: "08:42 AM",
      regNo: "REG44556",
    },
    {
      sn: "5",
      id: "S005",
      name: "Ayo Johnson",
      gender: "Male",
      timeOfScan: "08:45 AM",
      regNo: "REG77889",
    },
  ];

  return (
    <div className="p-4 space-y-8 font-poppins border-4 border-red-300">
      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          {
            label: "Students Present",
            value: 45,
            bg: "bg-blue-100",
            text: "text-blue-800",
          },
          {
            label: "On Leave",
            value: 5,
            bg: "bg-green-100",
            text: "text-green-800",
          },
          {
            label: "Absent",
            value: 8,
            bg: "bg-yellow-100",
            text: "text-yellow-800",
          },
          {
            label: "Total Students",
            value: 58,
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

      {/* Attendance Overview Table */}
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
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Time of Scan</th>
                <th className="px-4 py-2 border">Reg. No</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {students.map((student, i) => (
                <motion.tr
                  key={`${student.id}-${i}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="border-t"
                >
                  <td className="px-4 py-2 border">{student.sn}</td>
                  <td className="px-4 py-2 border">{student.id}</td>
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.gender}</td>
                  <td className="px-4 py-2 border">{student.timeOfScan}</td>
                  <td className="px-4 py-2 border">{student.regNo}</td>
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
          {["John Doe", "Jane Smith", "Ali Musa"].map((name, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 flex justify-between items-center">
                  <span>{name}</span>
                  <span className="text-green-600 font-medium">Present</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
