import Pagination from "@/components/users/StudentProfile/Pagination";
import { FaEllipsisV } from "react-icons/fa";

const students = [
  {
    img: "/Avatar.jpg",
    name: "Ava Carter",
    email: "ava.carter@email.com",
    joined: "10 Jan, 2025",
    lastActivity: "12 Feb, 2025",
    status: "Active",
  },
  {
    img: "/Avatar.jpg",
    name: "Noah Evans",
    email: "noah.evans@email.com",
    joined: "15 Jan, 2025",
    lastActivity: "18 Feb, 2025",
    status: "Inactive",
  },
  {
    img: "/Avatar.jpg",
    name: "Sophia Turner",
    email: "sophia.turner@email.com",
    joined: "20 Jan, 2025",
    lastActivity: "22 Feb, 2025",
    status: "Disabled",
  },
  {
    img: "/Avatar.jpg",
    name: "Liam Harris",
    email: "liam.harris@email.com",
    joined: "25 Jan, 2025",
    lastActivity: "28 Feb, 2025",
    status: "Active",
  },
  {
    img: "/Avatar.jpg",
    name: "Mia Walker",
    email: "mia.walker@email.com",
    joined: "01 Feb, 2025",
    lastActivity: "05 Mar, 2025",
    status: "Inactive",
  },
  {
    img: "/Avatar.jpg",
    name: "Lucas Young",
    email: "lucas.young@email.com",
    joined: "05 Feb, 2025",
    lastActivity: "10 Mar, 2025",
    status: "Disabled",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  Disabled: "bg-yellow-100 text-yellow-600",
};

export default function StudentsTab() {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      {/* Search/Filter/Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-3">
          {/* Search */}
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-white">
            <span className="text-gray-400 mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent text-sm"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-white">
            <span className="text-gray-400 mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707l-6.414 6.414A1 1 0 0 0 14 14.414V19a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 17V14.414a1 1 0 0 0-.293-.707L1.293 6.707A1 1 0 0 1 1 6V4z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Filter"
              className="outline-none bg-transparent text-sm"
            />
          </div>
        </div>
        {/* Export */}
        <button className="flex items-center gap-2 bg-red-600 border border-red-600 text-white rounded-md px-4 py-2 font-medium shadow hover:bg-red-700 transition">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h12"/>
          </svg>
          Export
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-left text-black font-medium">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-left text-black font-medium">Name</th>
              <th className="p-3 text-left text-black font-medium">Email</th>
              <th className="p-3 text-left text-black font-medium">Joined Date</th>
              <th className="p-3 text-left text-black font-medium">Last Activity</th>
              <th className="p-3 text-left text-black font-medium">Status</th>
              <th className="p-3 text-left text-black font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} className="bg-white border-b border-gray-200 last:border-b-0 h-14">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img src={student.img} alt={student.name} className="w-8 h-8 rounded-full" />
                  <span>{student.name}</span>
                </td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.joined}</td>
                <td className="p-3">{student.lastActivity}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[student.status as keyof typeof statusStyles]}`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-3">
                  <FaEllipsisV className="border border-gray-200 rounded-md p-1 w-6 h-6 text-gray-400 bg-white cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
  <div className="border border-gray-200 rounded-md p-2 mt-4">
        <Pagination />
      </div>
    </div>
  );
}