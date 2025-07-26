import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("reg_num, status, date, time, students(name)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching attendance:", error);
      } else {
        setAttendance(data);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, []);

  const total = attendance.length;
  const present = attendance.filter((a) => a.status === "present").length;
  const absent = attendance.filter((a) => a.status === "absent").length;

  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [present, absent],
        backgroundColor: ["#34D399", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance %",
        data: [75, 82, 78, 85],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const handleDownloadExcel = () => {
    const dataForExcel = attendance.map((entry) => ({
      Name: entry.students?.name || "Unknown",
      RegNumber: entry.reg_num,
      Status: entry.status,
      Date: entry.date,
      Time: entry.time,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Records");
    XLSX.writeFile(workbook, "attendance_records.xlsx");
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("attendance_records.pdf");
  };

  if (loading) return <p className="p-4">Loading reports...</p>;

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Attendance Reports</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      <div ref={reportRef} className="space-y-10">
                {/* Table */}
                <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Reg Number</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{entry.students?.name || "—"}</td>
                  <td className="px-4 py-2">{entry.reg_num}</td>
                  <td className="px-4 py-2 capitalize">{entry.status}</td>
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">
                    {new Date(`1970-01-01T${entry.time}Z`).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "2-digit" }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Total Summary</h2>
            <Pie data={pieData} />
            <p className="mt-4">Total Records: {total}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Weekly Breakdown</h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}
