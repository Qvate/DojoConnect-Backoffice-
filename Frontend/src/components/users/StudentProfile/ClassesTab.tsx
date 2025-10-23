import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import SearchActionBar from "@/components/users/StudentProfile/SearchActionBar";
import Pagination from "@/components/users/StudentProfile/Pagination";

const classes = [
  {
    id: 1,
    classImg: "/classImage.png",
    className: "Taekwondo",
    classLevel: "Beginner",
    instructorImg: "/instructorImage.png",
    instructorName: "Lisa Sampson",
    enrollmentDate: "June 30, 2024",
    status: "Active",
  },
  {
    id: 2,
    classImg: "/classImage.png",
    className: "Taekwondo",
    classLevel: "Intermediate",
    instructorImg: "/instructorImage.png",
    instructorName: "Lisa Sampson",
    enrollmentDate: "July 15, 2024",
    status: "Active",
  },
  {
    id: 3,
    classImg: "/classImage.png",
    className: "Taekwondo",
    classLevel: "Advanced",
    instructorImg: "/instructorImage.png",
    instructorName: "Lisa Sampson",
    enrollmentDate: "August 1, 2024",
    status: "Active",
  },
  {
    id: 4,
    classImg: "/classImage.png",
    className: "Taekwondo",
    classLevel: "Beginner",
    instructorImg: "/instructorImage.png",
    instructorName: "Chris Brown",
    enrollmentDate: "May 20, 2024",
    status: "Active",
  },
  {
    id: 5,
    classImg: "/classImage.png",
    className: "Taekwondo",
    classLevel: "Intermediate",
    instructorImg: "/instructorImage.png",
    instructorName: "Lisa Sampson",
    enrollmentDate: "April 10, 2024",
    status: "Active",
  },
];

export default function ClassesTab() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const pagedClasses = classes.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="bg-white rounded-md border border-gray-200 p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <SearchActionBar />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-white-100 border-b border-gray-100 ">
              <th className="p-3 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-left">Class Name</th>
              <th className="p-3 text-left">Class Level</th>
              <th className="p-3 text-left">Instructor</th>
              <th className="p-3 text-left">Enrollment Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {pagedClasses.map((cls) => (
              <tr key={cls.id} className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img src={cls.classImg} alt={cls.className} className="w-8 h-8 rounded-md" />
                  <span>{cls.className}</span>
                </td>
                <td className="p-3">{cls.classLevel}</td>
                <td className="p-3 flex items-center gap-2">
                  <img src={cls.instructorImg} alt={cls.instructorName} className="w-8 h-8 rounded-full" />
                  <span>{cls.instructorName}</span>
                </td>
                <td className="p-3">{cls.enrollmentDate}</td>
                <td className="p-3">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold bg-green-100 text-green-600">
                    {cls.status}
                  </span>
                </td>
                <td className="p-3">
                  <FaEllipsisV className="bg-white border border-gray-200 rounded-md p-1 w-6 h-6 text-gray-300 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          totalRows={classes.length}
          rowsPerPage={rowsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}