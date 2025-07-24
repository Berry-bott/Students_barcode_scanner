export default function Overview() {
  const students = [
    {
      id: "S001",
      name: "John Doe",
      gender: "Male",
      timeOfScan: "08:30 AM",
      regNo: "REG12345",
    },
    {
      id: "S002",
      name: "Jane Smith",
      gender: "Female",
      timeOfScan: "08:35 AM",
      regNo: "REG67890",
    },
    {
      id: "S003",
      name: "Ali Musa",
      gender: "Male",
      timeOfScan: "08:40 AM",
      regNo: "REG11223",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Student Attendance Overview
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
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
    </div>
  );
}
