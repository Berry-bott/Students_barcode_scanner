import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Home, CalendarCheck, Settings } from "lucide-react";


export default function Overview() {
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
      name: "Jane Smith",
      gender: "Female",
      timeOfScan: "08:35 AM",
      regNo: "REG67890",
    },
    {
      sn: "4",
      id: "S004",
      name: "Jane Smith",
      gender: "Female",
      timeOfScan: "08:35 AM",
      regNo: "REG67890",
    },
    {
      sn: "5",
      id: "S005",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
    {
      sn: "6",
      id: "S006",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
    {
      sn: "7",
      id: "S007",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
    {
      sn: "8",
      id: "S008",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
    {
      sn: "9",
      id: "S009",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
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
      sn: "3",
      id: "S003",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
    {
      sn: "3",
      id: "S003",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
  ];

  return (
    <div className="p-4 ">
      {/* Stats Cards */}
      <div className="p-4 grid gap-4 grid-cols-2">
        <Card className="bg-blue-100 text-blue-800">
          <CardContent className="p-4">
            <CardTitle className="text-sm font-poppins">
              Students Present
            </CardTitle>
            <CardDescription className="text-2xl font-bold font-poppins">
              45
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-green-100 text-green-800">
          <CardContent className="p-4">
            <CardTitle className="text-sm font-poppins">On Leave</CardTitle>
            <CardDescription className="text-2xl font-bold">5</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-yellow-100 text-yellow-800">
          <CardContent className="p-4">
            <CardTitle className="text-sm font-poppins ">Absent</CardTitle>
            <CardDescription className="text-2xl font-bold">8</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-purple-100 text-purple-800">
          <CardContent className="p-4">
            <CardTitle className="text-sm font-poppins">
              Total Students
            </CardTitle>
            <CardDescription className="text-2xl font-bold">58</CardDescription>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-semibold mb-4 font-poppins text-red-500">
        Student Attendance Overview
      </h2>
      <div className="overflow-y-auto rounded-lg shadow h-[400px]">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-medium  sticky top-0 z-10">
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
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2 border">{student.sn}</td>
                <td className="px-4 py-2 border">{student.id}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.gender}</td>
                <td className="px-4 py-2 border">{student.timeOfScan}</td>
                <td className="px-4 py-2 border">{student.regNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Attendance */}
      <div className="p-4">
        <h3 className="font-semibold mb-2">Recent Attendance</h3>
        <div className="space-y-2">
          {["John Doe", "Jane Smith", "Ali Musa"].map((name, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex justify-between">
                <span>{name}</span>
                <span className="text-green-600 font-medium">Present</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
