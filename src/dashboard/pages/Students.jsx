import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("students").select("*");
      if (error) {
        console.error("Error fetching students:", error);
      } else {
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No student records found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm text-left bg-white dark:bg-[hsl(222_47%_11%)] dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="border px-4 py-3">Registration Number</th>
                <th className="border px-4 py-3">Name</th>
                <th className="border px-4 py-3">Gender</th>
                <th className="border px-4 py-3">Department</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="border px-4 py-2">{student.reg_num}</td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.gender}</td>
                  <td className="border px-4 py-2">{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
