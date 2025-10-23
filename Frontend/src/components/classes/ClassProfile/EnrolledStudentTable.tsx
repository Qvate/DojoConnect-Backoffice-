import { students } from "./studentData";
import { FaEllipsisV } from "react-icons/fa";

export default function EnrolledStudentsTable() {
  return (
    <div className="rounded-lg border bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3"><input type="checkbox" /></th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Email</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Enrolled Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Last Activity</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-3"><input type="checkbox" /></td>
              <td className="flex items-center gap-2 px-4 py-3">
                <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                {student.name}
              </td>
              <td className="px-4 py-3">{student.email}</td>
              <td className="px-4 py-3">{student.enrolledDate}</td>
              <td className="px-4 py-3">{student.lastActivity}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">
                  {student.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="bg-white border border-gray-200 rounded p-1">
                  <FaEllipsisV className="text-gray-400 inline" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}