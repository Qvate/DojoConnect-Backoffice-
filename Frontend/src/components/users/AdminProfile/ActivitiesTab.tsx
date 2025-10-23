import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import SearchActionBar from "@/components/users/StudentProfile/SearchActionBar";
import Pagination from "@/components/users/StudentProfile/Pagination";



const activities = [
  {
    id: 1,
    type: "Subscription Upgraded",
    description: "Dojo owner upgraded from Basic Plan to Pro Plan",
    date: "Nov 12, 2024",
    time: "09:32am",
  },
  {
    id: 2,
    type: "New Class Created",
    description: "Added new class Karate for Beginners {Class ID: 45B9}",
    date: "Nov 12, 2024",
    time: "09:32am",
  },
  {
    id: 3,
    type: "Instructor Invited",
    description: "Invited John Smith as instructor for Advanced Taekwondo",
    date: "Nov 12, 2024",
    time: "09:32am",
  },
  {
    id: 4,
    type: "Student Enrollment Approved",
    description: "Approved new student Alex Johnson for Karate for Teens",
    date: "Nov 12, 2024",
    time: "09:32am",
  },
  {
    id: 5,
    type: "Profile Updated",
    description: "Updated dojo address and contact number",
    date: "Nov 12, 2024",
    time: "09:32am",
  },
  {
    id: 6,
    type: "Subscription Cancelled",
    description: "Cancelled or expired a subscription",
    date: "Nov 12, 2024",
    time: "09:32am",
  },
];

export default function ActivitiesTab() {
  return (
    <div className="bg-white-100 rounded-md p-4">
        <SearchActionBar />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 rounded-md">
            <th className="p-3 rounded-l-md text-left">Activity Type</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time Added</th>
            <th className="p-3 rounded-r-md text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act) => (
            <tr key={act.id} className="border-b">
              <td className="p-3">{act.type}</td>
              <td className="p-3">{act.description}</td>
              <td className="p-3">{act.date}</td>
              <td className="p-3">{act.time}</td>
              <td className="p-3 text-center">
                <div className="flex justify-center items-center gap-2">
                  <FaEllipsisV className="border border-gray-300 rounded-md p-2 bg-white text-gray-400" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        {/* Pagination with all-round border */}
              <div className=" rounded-md p-2 mt-4">
                <Pagination />
              </div>
    </div>
  );
}