import { FaUser, FaRegCopy, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaShuffle, FaWallet, FaCreditCard } from 'react-icons/fa6';
import { MdTimer } from 'react-icons/md';
import { IoCalendarOutline } from 'react-icons/io5';



export default function ClassOverview({ profile }: { profile: any }) {
  return (
    <div>
      {/* Basic Class information header */}
      <div className="flex items-center justify-between rounded-md bg-gray-100 px-6 py-4 mb-6">
        <span className="text-black font-semibold text-base">Basic Class Information</span>
        <button
          className="flex items-center gap-2 bg-white rounded-md px-4 py-2 border border-gray-400 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition cursor-pointer"
          type="button"
        >
          Actions
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
          </div>
       
      {/* Two-column info section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col gap-6">
          {/* Class Name */}
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Name</div>
              <div className="text-black font-medium">{profile.className}</div>
            </div>
          </div>
          {/* Class Level */}
          <div className="flex items-center gap-3">
            <FaShuffle className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Level</div>
              <div className="text-black font-medium">{profile.classLevel}</div>
            </div>
          </div>
          {/* Class Age */}
          <div className="flex items-center gap-3">
            <FaShuffle className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Age</div>
              <div className="text-black font-medium">{profile.classAge || "6-12 yrs"}</div>
            </div>
          </div>
          {/* Class Instructor */}
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Instructor</div>
              <div className="text-black font-medium">{profile.instructor?.name}</div>
            </div>
          </div>
          {/* Class Capacity */}
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Capacity</div>
              <div className="text-black font-medium">{profile.enrolledStudents}</div>
            </div>
          </div>
          {/* Date Created */}
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Date Created</div>
              <div className="text-black font-medium">{profile.dateCreated}</div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col gap-6">
          {/* Location */}
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Location</div>
              <div className="text-black font-medium">{profile.location || "123 Oxford Road, Manchester, UK"}</div>
            </div>
          </div>
          {/* Class Frequency */}
          <div className="flex items-center gap-3">
            <FaShuffle className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Frequency</div>
              <div className="text-black font-medium">{profile.frequency || "Weekly"}</div>
            </div>
          </div>
          {/* Class Schedule */}
          <div className="flex items-center gap-3">
            <MdTimer className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Class Schedule</div>
              <div className="text-black font-medium">{profile.schedule || "Tuesdays 3:00pm-4:00pm"}</div>
            </div>
          </div>
          {/* Subscription Type */}
          <div className="flex items-center gap-3">
            <FaCreditCard className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Subscription Type</div>
              <div className="text-black font-medium">{profile.subscriptionType || "Paid"}</div>
            </div>
          </div>
          {/* Subscription Fee */}
          <div className="flex items-center gap-3">
            <FaWallet className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Subscription Fee</div>
              <div className="text-black font-medium">{profile.subscriptionFee || "£20"}</div>
            </div>
          </div>
          {/* Grading Date */}
          <div className="flex items-center gap-3">
            <IoCalendarOutline className="text-gray-400 w-5 h-5" />
            <div>
              <div className="text-gray-500 text-xs">Grading Date</div>
              <div className="text-black font-medium">{profile.gradingDate || "Friday, Sep 25, 2025"}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Card Row - Place this directly after the two-column grid */}
     <div className="flex flex-wrap gap-4 mt-8">
  {/* Enrolled Students Card */}
  <div className="flex-1 min-w-[180px] rounded-md border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between">
    <div className="text-gray-500 text-sm mb-2">Enrolled Students</div>
    <div className="flex flex-col items-end justify-end flex-1">
      <div className="text-2xl font-bold text-black mb-2">{profile.enrolledStudents}</div>
      <button className="text-green-600 text-sm font-semibold hover:underline">View list</button>
    </div>
  </div>
  {/* Instructor Assigned Card */}
  <div className="flex-1 min-w-[180px] rounded-md border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between">
    <div className="text-gray-500 text-sm mb-2">Instructor Assigned</div>
    <div className="flex flex-col items-end justify-end flex-1">
      <div className="text-2xl font-bold text-black mb-2">01</div>
      <button className="text-green-600 text-sm font-semibold hover:underline">View profile</button>
    </div>
  </div>
  {/* Average Attendance Rate Card */}
  <div className="flex-1 min-w-[180px] rounded-md border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between">
    <div className="text-gray-500 text-sm mb-2">Average Attendance Rate</div>
    <div className="flex flex-col items-end justify-end flex-1">
      <div className="text-2xl font-bold text-black mb-2">75%</div>
    </div>
  </div>
  {/* Sessions Completed Card */}
  <div className="flex-1 min-w-[180px] rounded-md border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between">
    <div className="text-gray-500 text-sm mb-2">Sessions Completed</div>
    <div className="flex flex-col items-end justify-end flex-1">
      <div className="text-2xl font-bold text-black mb-2">07</div>
    </div>
  </div>
</div>
    </div>
  );
}