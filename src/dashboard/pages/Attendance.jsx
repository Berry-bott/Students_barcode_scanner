import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("id, reg_num, time, date, status, students(name)")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching attendance:", error);
      } else {
        setRecords(data);
      }

      setLoading(false);
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading attendance records...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Attendance Records
      </h2>

      {records.length === 0 ? (
        <p className="text-gray-600">No attendance records found.</p>
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
                  <td className="p-2 border">{record.students?.name || "—"}</td>
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
    </div>
  );
};

export default Attendance;
