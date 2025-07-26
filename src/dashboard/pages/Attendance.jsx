import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";


const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      // Fetch attendance
      const { data: attendanceData, error: attendanceError } = await supabase
        .from("attendance")
        .select("id, reg_num, time, date, status, students(name)")
        .eq("date", today)
        .order("date", { ascending: false });

      // Fetch all students
      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("reg_num, name, parent_email");

      if (attendanceError || studentsError) {
        console.error("Error fetching data:", attendanceError || studentsError);
      } else {
        setRecords(attendanceData);
        setStudents(studentsData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const presentRegNums = records.map((rec) => rec.reg_num);
  const absentStudents = students.filter(
    (student) => !presentRegNums.includes(student.reg_num)
  );

  if (loading) {
    return <p className="text-gray-600">Loading attendance records...</p>;
  }

  return (
    <div className="p-4 space-y-10">
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">
          Attendance Records - Present
        </h2>

        {records.length === 0 ? (
          <p className="text-gray-600">No attendance records found for today.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="p-2 border">Reg. Number</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="p-2 border">{record.reg_num}</td>
                    <td className="p-2 border">
                      {record.students?.name || "—"}
                    </td>
                    <td className="p-2 border">{record.date}</td>
                    <td className="p-2 border">
                      {record.time
                        ? new Date(
                            `1970-01-01T${record.time}Z`
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "—"}
                    </td>
                    <td className="p-2 border capitalize">{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Students Absent Today
        </h2>

        {absentStudents.length === 0 ? (
          <p className="text-gray-600">No absent students for today 🎉</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-100 text-red-800">
                  <th className="p-2 border">Reg. Number</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Notify</th>
                </tr>
              </thead>
              <tbody>
                {absentStudents.map((student) => (
                  <tr key={student.reg_num} className="border-b">
                    <td className="p-2 border">{student.reg_num}</td>
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border text-red-600 font-semibold">
                      Absent
                    </td>
                    <td className="p-2 border">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() => alert(`Send email to: ${student.parent_email}`)}
                      >
                        Email Parent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Attendance;
