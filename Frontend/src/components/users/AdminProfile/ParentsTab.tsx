import Pagination from "@/components/users/StudentProfile/Pagination";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

const parents = [
  {
    img: "/Avatar.jpg",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    joined: "12 Jan, 2025",
    lastActivity: "15 Feb, 2025",
    status: "Active",
  },
  {
    img: "/Avatar.jpg",
    name: "Michael Lee",
    email: "michael.lee@email.com",
    joined: "20 Feb, 2025",
    lastActivity: "22 Feb, 2025",
    status: "Inactive",
  },
  {
    img: "/Avatar.jpg",
    name: "Emily Clark",
    email: "emily.clark@email.com",
    joined: "05 Mar, 2025",
    lastActivity: "10 Mar, 2025",
    status: "Disabled",
  },
  {
    img: "/Avatar.jpg",
    name: "David Kim",
    email: "david.kim@email.com",
    joined: "18 Mar, 2025",
    lastActivity: "20 Mar, 2025",
    status: "Active",
  },
  {
    img: "/Avatar.jpg",
    name: "Olivia Brown",
    email: "olivia.brown@email.com",
    joined: "25 Mar, 2025",
    lastActivity: "27 Mar, 2025",
    status: "Inactive",
  },
  {
    img: "/Avatar.jpg",
    name: "James Smith",
    email: "james.smith@email.com",
    joined: "30 Mar, 2025",
    lastActivity: "31 Mar, 2025",
    status: "Disabled",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  Disabled: "bg-yellow-100 text-yellow-600",
};

export default function ParentsTab() {
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
        <div className="flex gap-3">
          {/* Create New */}
          <button className="flex items-center gap-2 bg-red-600 border border-red-600 text-white rounded-md px-4 py-2 font-medium shadow hover:bg-red-700 transition">
            <FaPlus className="text-white" />
            <span>Create New</span>
          </button>
          {/* Export */}
          <button className="flex items-center gap-2 bg-white border border-red-600 text-red-600 rounded-md px-4 py-2 font-medium shadow hover:bg-red-50 transition">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h12"/>
            </svg>
            Export
          </button>
        </div>
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
            {parents.map((parent, idx) => (
              <tr key={idx} className="bg-white border-b border-gray-200 last:border-b-0 h-14">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img src={parent.img} alt={parent.name} className="w-8 h-8 rounded-full" />
                  <span>{parent.name}</span>
                </td>
                <td className="p-3">{parent.email}</td>
                <td className="p-3">{parent.joined}</td>
                <td className="p-3">{parent.lastActivity}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[parent.status as keyof typeof statusStyles]}`}>
                    {parent.status}
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