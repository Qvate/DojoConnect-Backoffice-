import React, { useState } from "react";
import { useUserClasses } from "@/hooks/useUserClasses";
import { FaUser, FaEnvelope, FaCopy, FaCalendarAlt, FaEllipsisH, FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

const classes = [
  {
    img: "/classImage.png",
    name: "Beginner Class",
    level: "Beginner",
    instructor: "Inspector Augustine",
    duration: "45 mins - 1 hr",
    frequency: "Tue Weekly",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    img: "/classImage.png",
    name: "Intermediate Class",
    level: "Intermediate",
    instructor: "Inspector Augustine",
    duration: "1 hr",
    frequency: "Thu Weekly",
    status: "Class Completed",
    statusColor: "bg-yellow-400",
  },
];

const activities = [
  {
    title: "Inspector logged into their accounts",
    date: "Nov 2, 2024 | 09:32am",
  },
  {
    title: "Instructor updated name, email, phone or password",
    date: "williamson@gmail.com",
  },
  {
    title: "Instructor accessed attendance log of a child",
    date: "Nov 9, 2024 | 09:32am",
  },
  {
    title: "Viewed info about a class enrolled in",
    date: "Nov 12, 2024 | 09:32am",
  },
  {
    title: "Student logged into their account",
    date: "Nov 12, 2024 | 09:32am",
  },
];

interface OverviewProps {
  profile: {
    id: number;
    name: string;
    email: string;
    userType: string;
    joinedDate: string;
    lastActivity: string;
    status: string;
    avatar: string;
    age?: number;
    gender?: string;
    assignedDojos?: string[];
    assignedDates?: string[];
    notes?: string;
    classes?: {
      img: string;
      name: string;
      level: string;
      instructor: string;
      duration: string;
      frequency: string;
      status: string;
      statusColor: string;
    }[];
    activities?: {
      title: string;
      date: string;
    }[];
  };
}

const statusOptions = [
  { label: "Active", color: "bg-green-700", text: "text-gray-700", value: "active" },
  { label: "Inactive", color: "bg-red-600", text: "text-gray-700", value: "inactive" },
  { label: "Disable", color: "bg-gray-400", text: "text-gray-700", value: "disable" },
];

const Overview: React.FC<OverviewProps & { email: string }> = ({ profile, email }) => {
  const { classes, loading, error } = useUserClasses(email);
  const [showActions, setShowActions] = useState(false);
  const [modal, setModal] = useState<null | "deactivate" | "export" | "delete" | "saveConfirm">(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: profile.name,
    email: profile.email,
    age: profile.age ?? "",
    gender: profile.gender ?? "",
  });
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("active");

  // Use API classes if available, else fallback to profile.classes, else []
  const assignedClasses =
    !loading && classes.length > 0
      ? classes
      : !loading && profile.classes && profile.classes.length > 0
      ? profile.classes
      : [];

  const activityLog = profile.activities && profile.activities.length > 0 ? profile.activities : activities;

  // For Save Changes modal
  const handleSave = () => {
    setModal("saveConfirm");
    setIsEditing(false);
    setShowStatusModal(false);
    setShowActions(false);
  };

  return (
    <div className="space-y-8">
      {/* Section 1 */}
      <div className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 mb-4 w-full">
        <span className="text-gray-700 font-semibold">Basic user information</span>
        <div className="relative">
          <button
            className="flex items-center border border-gray-500 rounded-md px-6 py-3 bg-white text-black cursor-pointer"
            onClick={() => {
              setShowActions((v) => !v);
              if (isEditing) setShowStatusModal((s) => !s);
            }}
          >
            Actions
            {isEditing ? (
              <FaChevronUp className="w-4 h-4 text-gray-700 ml-2" />
            ) : (
              <FaChevronDown className="w-4 h-4 text-gray-700 ml-2" />
            )}
          </button>
          {/* Status modal when editing */}
          {isEditing && showStatusModal && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50 p-4">
              {statusOptions.map((opt, idx) => (
  <div
    key={opt.value}
    className={`flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-md`}
    onClick={() => setSelectedStatus(opt.value)}
  >
    <span className={`flex items-center gap-2`}>
      <span className={`inline-block w-3 h-3 rounded-full ${opt.color}`}></span>
      <span className={`text-sm ${opt.text}`}>{opt.label}</span>
    </span>
    {selectedStatus === opt.value && (
      <FaCheckCircle className="text-red-600 text-lg bg-transparent" />
    )}
  </div>
))}
            </div>
          )}
          {/* Actions dropdown when not editing */}
          {!isEditing && showActions && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
              <button
                className="flex items-center w-full px-4 py-3 hover:bg-gray-100"
                onClick={() => {
                  setIsEditing(true);
                  setShowActions(false);
                  setShowStatusModal(false);
                }}
              >
                {/* Edit SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="mr-2"><path stroke="#737373" strokeLinecap="round" strokeLinejoin="round" d="m11.241 2.991 1.125-1.125a1.25 1.25 0 0 1 1.768 1.768l-7.08 7.079a3 3 0 0 1-1.264.754L4 12l.533-1.79a3 3 0 0 1 .754-1.265l5.954-5.954Zm0 0L13 4.75m-1 4.583V12.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 12.5v-7A1.5 1.5 0 0 1 3.5 4h3.167"/></svg>
                Edit Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-3 hover:bg-gray-100"
                onClick={() => { setModal("deactivate"); setShowActions(false); }}
              >
                {/* Deactivate SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="mr-2"><path stroke="#737373" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.666 7h-4m-1.5-2.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-6.5 8.573v-.073a4.25 4.25 0 0 1 8.5 0V12.822A8.211 8.211 0 0 1 6.915 14a8.211 8.211 0 0 1-4.25-1.177Z"/></svg>
                Deactivate Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-3 hover:bg-gray-100"
                onClick={() => { setModal("export"); setShowActions(false); }}
              >
                {/* Export SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="mr-2"><path fill="#737373" d="M11.137 9.138 8.47 11.804a.667.667 0 0 1-.943 0L4.861 9.138a.667.667 0 1 1 .942-.943l1.529 1.529V2a.667.667 0 0 1 1.333 0v7.724l1.529-1.53a.667.667 0 1 1 .943.944Z"/><path fill="#737373" d="M2.665 11.666a.667.667 0 0 0-1.333 0v1a2.667 2.667 0 0 0 2.667 2.667h8a2.667 2.667 0 0 0 2.666-2.667v-1a.667.667 0 0 0-1.333 0v1c0 .737-.597 1.334-1.333 1.334h-8a1.333 1.333 0 0 1-1.334-1.334v-1Z"/></svg>
                Export User Data
              </button>
              <button
                className="flex items-center w-full px-4 py-3 hover:bg-gray-100"
                onClick={() => { setModal("delete"); setShowActions(false); }}
              >
                {/* Delete SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="mr-2"><path stroke="#F04438" strokeLinecap="round" strokeLinejoin="round" d="M14 3.987a67.801 67.801 0 0 0-6.68-.334c-1.32 0-2.64.067-3.96.2L2 3.987M5.666 3.313l.147-.873c.106-.634.186-1.107 1.313-1.107h1.747c1.126 0 1.213.5 1.313 1.113l.147.867M12.567 6.094l-.433 6.713c-.074 1.047-.134 1.86-1.994 1.86H5.86c-1.86 0-1.92-.813-1.993-1.86l-.433-6.713"/></svg>
                Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Two columns below */}
      <div className="grid grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="border border-gray-300 rounded-md bg-gray-50 p-6 space-y-6">
          {/* Full Name */}
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Full Name</div>
                {isEditing ? (
                  <input
                    className="text-base text-black font-semibold border rounded px-2 py-1"
                    value={editValues.name}
                    onChange={e => setEditValues(v => ({ ...v, name: e.target.value }))}
                  />
                ) : (
                  <div className="text-base text-black font-semibold">{profile.name}</div>
                )}
              </div>
            </div>
            <FaCopy className="text-gray-400 cursor-pointer" />
          </div>
          {/* Email */}
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Email</div>
                {isEditing ? (
                  <input
                    className="text-base text-black border rounded px-2 py-1"
                    value={editValues.email}
                    onChange={e => setEditValues(v => ({ ...v, email: e.target.value }))}
                  />
                ) : (
                  <div className="text-base text-black">{profile.email}</div>
                )}
              </div>
            </div>
            <FaCopy className="text-gray-400 cursor-pointer" />
          </div>
          {/* Role */}
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Role</div>
                <div className="text-base text-black">{profile.userType}</div>
              </div>
            </div>
          </div>
          {/* Age */}
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Age</div>
                {isEditing ? (
                  <input
                    className="text-base text-black border rounded px-2 py-1"
                    value={editValues.age}
                    onChange={e => setEditValues(v => ({ ...v, age: e.target.value }))}
                  />
                ) : (
                  <div className="text-base text-black">{profile.age ?? "-"}</div>
                )}
              </div>
            </div>
          </div>
          {/* Gender */}
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Gender</div>
                {isEditing ? (
                  <input
                    className="text-base text-black border rounded px-2 py-1"
                    value={editValues.gender}
                    onChange={e => setEditValues(v => ({ ...v, gender: e.target.value }))}
                  />
                ) : (
                  <div className="text-base text-black">{profile.gender ?? "-"}</div>
                )}
              </div>
            </div>
          </div>
          {/* Joined */}
          <div className="flex items-center justify-between min-h-[48px]">
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Joined</div>
                <div className="text-base text-black">{profile.joinedDate}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className={`border border-gray-300 rounded-md bg-gray-50 p-6 space-y-6 ${isEditing ? "opacity-50 pointer-events-none select-none" : ""}`}>
          {/* Assigned Dojos */}
          <div className="min-h-[48px]">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Assigned Dojo(s)</div>
                {profile.assignedDojos?.map((dojo, idx) => (
                  <div key={idx} className="text-base text-black">{dojo}</div>
                ))}
              </div>
            </div>
          </div>
          {/* Assigned Dates */}
          <div className="grid grid-cols-2 gap-4 min-h-[48px]">
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500">Assigned Date</div>
                {profile.assignedDates?.map((date, idx) => (
                  <div key={idx} className="text-base text-black">{date}</div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-3 text-xl" />
              <div>
                <div className="text-xs text-gray-500 ">Dojo(s)</div>
               {(profile.assignedDojos ?? ["Tigers Dojo, London", "Dojo Lion, London"]).map((dojo, idx) => (
            <div key={idx} className="text-base text-black">{dojo}</div>
          ))}
              </div>
            </div>
          </div>
          {/* Divider before Notes */}
          <div className="border-b border-gray-300"></div>
          {/* Notes */}
          <div className="flex items-center justify-between pb-2 min-h-[80px]">
            <div className="flex items-center w-full">
              <FaEnvelope className="text-gray-400 mr-3 text-xl self-start" />
              <div className="w-full">
                <div className="text-xs text-gray-500">Notes</div>
                <div className="min-h-[56px]">{profile.notes ?? ""}</div>
              </div>
            </div>
            <FaCopy className="text-gray-400 cursor-pointer self-start" />
          </div>
        </div>
      </div>
      {/* Edit buttons below both columns */}
      {isEditing && (
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-white border border-gray-300 text-black rounded-md px-6 py-2"
            onClick={() => {
              setIsEditing(false);
              setShowStatusModal(false);
              setEditValues({
                name: profile.name,
                email: profile.email,
                age: profile.age ?? "",
                gender: profile.gender ?? "",
              });
            }}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white rounded-md px-6 py-2"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      )}
      {/* Section 2 */}
      <div className="flex gap-6">
        {/* Classes Column */}
   <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 mb-2">
            <span className="text-gray-700 font-semibold">
              Assigned Classes ({assignedClasses.length})
            </span>
            <button className="text-red-500 font-semibold cursor-pointer">View all</button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center min-h-[320px]">Loading classes...</div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[320px] text-red-500">{error}</div>
          ) : assignedClasses.length > 0 ? (
            <div className="bg-white rounded-md border border-gray-200 p-4 flex-1 min-h-[320px] flex flex-col gap-6">
              {assignedClasses.map((cls: any, idx: number) => (
                <div
                  key={cls.class_uid || cls.id || idx}
                  className="flex items-center justify-between rounded-md min-h-[120px] border-b border-gray-200 last:border-b-0"
                  style={{ flex: 1 }}
                >
                  <img
                    src={`/${cls.image_path || cls.img || "classImage.png"}`}
                    alt={cls.class_name || cls.name}
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">
                      {(cls.class_name || cls.name) + (cls.level ? ` - ${cls.level}` : "")}
                    </div>
                    <div className="text-xs text-gray-500">{cls.instructor || ""}</div>
                    <div className="flex mt-2 space-x-8 text-xs">
                      <div className="flex flex-col items-start">
                        <span className="text-gray-500">Duration</span>
                        <span className="text-black">{cls.duration || "-"}</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-gray-500">Frequency</span>
                        <span className="text-black">{cls.frequency || "-"}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold bg-green-100 text-green-700`}>
                    {cls.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-md p-6 flex flex-col items-center justify-center min-h-[320px]">
              <span dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="121" height="121" fill="none"><path fill="url(#a)" d="M58.338 105.7c25.353 0 45.905-20.326 45.905-45.4 0-25.073-20.552-45.4-45.905-45.4-25.352 0-45.904 20.327-45.904 45.4 0 25.074 20.552 45.4 45.904 45.4Z"/><path fill="#E3E3E3" fillRule="evenodd" d="M97.945 89.24c.419-.147.859-.343 1.198-.627.404-.337.568-.77.678-1.227.141-.587.198-1.212.369-1.8.063-.218.186-.3.238-.338a.587.587 0 0 1 .392-.108c.15.011.355.067.49.315.019.035.044.089.061.163.012.054.02.224.033.294.032.172.059.344.085.517.085.576.134 1.065.402 1.595.363.718.728 1.158 1.222 1.353.478.188 1.05.153 1.78.005a3.21 3.21 0 0 1 .206-.043.595.595 0 0 1 .233 1.166 9.357 9.357 0 0 1-.198.041c-.986.242-2.129 1.104-2.792 1.859-.205.233-.504.883-.81 1.299-.226.306-.479.508-.692.58a.63.63 0 0 1-.362.015.614.614 0 0 1-.356-.235.661.661 0 0 1-.118-.272 2.004 2.004 0 0 1-.012-.26c-.062-.212-.138-.419-.194-.633-.132-.51-.392-.833-.7-1.26-.29-.398-.6-.65-1.054-.85a8.426 8.426 0 0 1-.705-.196.748.748 0 0 1-.406-.347.66.66 0 0 1-.066-.388.631.631 0 0 1 .223-.407.79.79 0 0 1 .359-.168c.123-.026.45-.04.496-.043Zm2.8-.831c.022.049.046.098.071.147.533 1.053 1.128 1.64 1.852 1.925l.025.01a8.025 8.025 0 0 0-1.258 1.134c-.138.157-.321.483-.519.817-.179-.576-.472-.984-.841-1.494a3.54 3.54 0 0 0-.94-.921c.282-.143.55-.31.784-.506.39-.325.647-.702.826-1.112Z" clip-rule="evenodd"/><ellipse cx="6.274" cy="51.453" fill="#E3E3E3" rx="2.174" ry="2.15"/><path fill="#000" stroke="#000" strokeWidth=".4" d="M22.271 26.778a.633.633 0 0 0-.872.189.629.629 0 0 0 .19.872c1.66 1.06 2.742 2.525 3.293 4.403a.632.632 0 0 0 .658.451l.126-.023a.63.63 0 0 0 .43-.782c-.638-2.175-1.9-3.88-3.825-5.11Z"/><path fill="#000" stroke="#000" strokeWidth=".4" d="M52.999 25.759c-3.413-1.55-7.266-.312-9.16 2.842a9.607 9.607 0 0 0-.879-.702c-3.53-2.49-8.687-1.66-12.605 2-.633.59-1.125 1.453-1.505 2.47-.382 1.018-.656 2.205-.844 3.458-.36 2.4-.426 5.064-.406 7.215a39.156 39.156 0 0 0-1.347-2.791c-2.466-4.686-4.893-9.677-8.98-13.286l-.105-.074a.633.633 0 0 0-.787.127.628.628 0 0 0 .053.89c3.94 3.48 6.267 8.31 8.698 12.929.76 1.445 1.443 2.886 1.97 4.422.12.348.24.689.348 1.032l.105.345v.065l-.006.072-.005.088v.002c-.004.151.002.313.035.44h.001a.753.753 0 0 0 .379.488l.001.001c.13.067.29.103.481.07l.002-.002a.613.613 0 0 0 .473-.38.503.503 0 0 0 .027-.1 1.69 1.69 0 0 0 .017-.132c.01-.104.016-.243.012-.415-.039-1.343-.313-5.878.168-9.936.154-1.303.378-2.551.715-3.613.337-1.065.783-1.922 1.365-2.466 3.492-3.26 7.98-4.024 11.008-1.89.383.27.742.571 1.072.901a5.349 5.349 0 0 0-.088 1.046c.006.425.06.876.2 1.242.146.384.385.694.712.856.343.17.773.187 1.277-.068h.001c.434-.22.59-.64.55-1.088-.035-.41-.253-.866-.37-1.074-.241-.422-.52-.82-.83-1.192 1.497-2.822 4.8-3.971 7.722-2.645a.636.636 0 0 0 .839-.31v-.001a.63.63 0 0 0-.314-.836Zm-8.462 5.718c.05.1.106.226.137.35-.004-.006-.012-.01-.018-.02a.856.856 0 0 1-.06-.135 1.616 1.616 0 0 1-.059-.195Z"/><rect width="79.023" height="28.173" x="37.152" y="38.455" fill="#000" rx="9.6"/><rect width="26.647" height="3.695" x="69.772" y="48.153" fill="#CCC6D9" rx="1.847"/><rect width="52.51" height="3.695" x="44.043" y="53.695" fill="#fff" rx="1.847"/><ellipse cx="106.067" cy="52.772" fill="#E1DCEB" rx="4.594" ry="4.619"/><rect width="79.023" height="28.173" x="4.1" y="62.01" fill="#E1DCEB" rx="9.6"/><rect width="26.647" height="3.695" x="23.855" y="71.709" fill="#000" rx="1.847"/><rect width="52.51" height="3.695" x="23.855" y="77.251" fill="#fff" rx="1.847"/><ellipse cx="15.586" cy="76.328" fill="#CCC6D9" rx="4.594" ry="4.619"/><defs><linearGradient id="a" x1="57.984" x2="58.904" y1=".117" y2="159.555" gradientUnits="userSpaceOnUse"><stopColor="#F2F2F2"/><stop offset="1" stopColor="#EFEFEF"/></linearGradient></defs></svg>`}} />
              <div className="text-black font-semibold mb-1">No classes in this profile yet ..</div>
            </div>
          )}
        </div>
        {/* Activities Column */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 mb-2">
            <span className="text-gray-700 font-semibold">
              Activity Log 
            </span>
            <button className="text-red-500 font-semibold cursor-pointer">View all</button>
          </div>
          {profile.activities && profile.activities.length > 0 ? (
            <div className="bg-white rounded-md border border-gray-200 p-4 flex-1 min-h-[320px] flex flex-col gap-4">
              {profile.activities.map((act, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-4">
                  <div>
                    <div className="font-semibold text-black">{act.title}</div>
                    <div className="text-xs text-gray-500">{act.date}</div>
                  </div>
                  <FaEllipsisH className="border border-gray-300 rounded-md p-1 text-gray-400 cursor-pointer" />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-md p-6 flex flex-col items-center justify-center min-h-[320px]">
              <div className="mb-4">
                {/* eslint-disable-next-line */}
                <span dangerouslySetInnerHTML={{__html: `<svg xmlns="http://www.w3.org/2000/svg" width="121" height="121" fill="none"><path fill="url(#a)" d="M58.338 105.7c25.353 0 45.905-20.326 45.905-45.4 0-25.073-20.552-45.4-45.905-45.4-25.352 0-45.904 20.327-45.904 45.4 0 25.074 20.552 45.4 45.904 45.4Z"/><path fill="#E3E3E3" fillRule="evenodd" d="M97.945 89.24c.419-.147.859-.343 1.198-.627.404-.337.568-.77.678-1.227.141-.587.198-1.212.369-1.8.063-.218.186-.3.238-.338a.587.587 0 0 1 .392-.108c.15.011.355.067.49.315.019.035.044.089.061.163.012.054.02.224.033.294.032.172.059.344.085.517.085.576.134 1.065.402 1.595.363.718.728 1.158 1.222 1.353.478.188 1.05.153 1.78.005a3.21 3.21 0 0 1 .206-.043.595.595 0 0 1 .233 1.166 9.357 9.357 0 0 1-.198.041c-.986.242-2.129 1.104-2.792 1.859-.205.233-.504.883-.81 1.299-.226.306-.479.508-.692.58a.63.63 0 0 1-.362.015.614.614 0 0 1-.356-.235.661.661 0 0 1-.118-.272 2.004 2.004 0 0 1-.012-.26c-.062-.212-.138-.419-.194-.633-.132-.51-.392-.833-.7-1.26-.29-.398-.6-.65-1.054-.85a8.426 8.426 0 0 1-.705-.196.748.748 0 0 1-.406-.347.66.66 0 0 1-.066-.388.631.631 0 0 1 .223-.407.79.79 0 0 1 .359-.168c.123-.026.45-.04.496-.043Zm2.8-.831c.022.049.046.098.071.147.533 1.053 1.128 1.64 1.852 1.925l.025.01a8.025 8.025 0 0 0-1.258 1.134c-.138.157-.321.483-.519.817-.179-.576-.472-.984-.841-1.494a3.54 3.54 0 0 0-.94-.921c.282-.143.55-.31.784-.506.39-.325.647-.702.826-1.112Z" clip-rule="evenodd"/><ellipse cx="6.274" cy="51.453" fill="#E3E3E3" rx="2.174" ry="2.15"/><path fill="#000" stroke="#000" strokeWidth=".4" d="M22.271 26.778a.633.633 0 0 0-.872.189.629.629 0 0 0 .19.872c1.66 1.06 2.742 2.525 3.293 4.403a.632.632 0 0 0 .658.451l.126-.023a.63.63 0 0 0 .43-.782c-.638-2.175-1.9-3.88-3.825-5.11Z"/><path fill="#000" stroke="#000" strokeWidth=".4" d="M52.999 25.759c-3.413-1.55-7.266-.312-9.16 2.842a9.607 9.607 0 0 0-.879-.702c-3.53-2.49-8.687-1.66-12.605 2-.633.59-1.125 1.453-1.505 2.47-.382 1.018-.656 2.205-.844 3.458-.36 2.4-.426 5.064-.406 7.215a39.156 39.156 0 0 0-1.347-2.791c-2.466-4.686-4.893-9.677-8.98-13.286l-.105-.074a.633.633 0 0 0-.787.127.628.628 0 0 0 .053.89c3.94 3.48 6.267 8.31 8.698 12.929.76 1.445 1.443 2.886 1.97 4.422.12.348.24.689.348 1.032l.105.345v.065l-.006.072-.005.088v.002c-.004.151.002.313.035.44h.001a.753.753 0 0 0 .379.488l.001.001c.13.067.29.103.481.07l.002-.002a.613.613 0 0 0 .473-.38.503.503 0 0 0 .027-.1 1.69 1.69 0 0 0 .017-.132c.01-.104.016-.243.012-.415-.039-1.343-.313-5.878.168-9.936.154-1.303.378-2.551.715-3.613.337-1.065.783-1.922 1.365-2.466 3.492-3.26 7.98-4.024 11.008-1.89.383.27.742.571 1.072.901a5.349 5.349 0 0 0-.088 1.046c.006.425.06.876.2 1.242.146.384.385.694.712.856.343.17.773.187 1.277-.068h.001c.434-.22.59-.64.55-1.088-.035-.41-.253-.866-.37-1.074-.241-.422-.52-.82-.83-1.192 1.497-2.822 4.8-3.971 7.722-2.645a.636.636 0 0 0 .839-.31v-.001a.63.63 0 0 0-.314-.836Zm-8.462 5.718c.05.1.106.226.137.35-.004-.006-.012-.01-.018-.02a.856.856 0 0 1-.06-.135 1.616 1.616 0 0 1-.059-.195Z"/><rect width="79.023" height="28.173" x="37.152" y="38.455" fill="#000" rx="9.6"/><rect width="26.647" height="3.695" x="69.772" y="48.153" fill="#CCC6D9" rx="1.847"/><rect width="52.51" height="3.695" x="44.043" y="53.695" fill="#fff" rx="1.847"/><ellipse cx="106.067" cy="52.772" fill="#E1DCEB" rx="4.594" ry="4.619"/><rect width="79.023" height="28.173" x="4.1" y="62.01" fill="#E1DCEB" rx="9.6"/><rect width="26.647" height="3.695" x="23.855" y="71.709" fill="#000" rx="1.847"/><rect width="52.51" height="3.695" x="23.855" y="77.251" fill="#fff" rx="1.847"/><ellipse cx="15.586" cy="76.328" fill="#CCC6D9" rx="4.594" ry="4.619"/><defs><linearGradient id="a" x1="57.984" x2="58.904" y1=".117" y2="159.555" gradientUnits="userSpaceOnUse"><stopColor="#F2F2F2"/><stop offset="1" stopColor="#EFEFEF"/></linearGradient></defs></svg>`}} />
              </div>
              <div className="text-black font-semibold mb-1">Nothing here yet ...</div>
              <div className="text-gray-500 text-sm">whoops there's no information available yet</div>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
    {modal === "saveConfirm" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.03)" }}>
    <div className="bg-white rounded-md p-8 w-full max-w-md relative">
      <div className="flex items-start justify-between mb-4">
        {/* Green SVG aligned to flex-start */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF"/>
          <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" strokeWidth="8"/>
          <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {/* Close button aligned to flex-start */}
        <span className="text-gray-400 cursor-pointer text-lg ml-auto" onClick={() => setModal(null)}>✕</span>
      </div>
      {/* Title and description aligned to flex-start */}
      <div className="text-lg font-semibold text-black mb-2 text-left">Save Changes</div>
      <div className="text-gray-600 text-left mb-6">You are about to save profile changes.</div>
      <div className="flex justify-end gap-4">
        <button className="bg-white border border-gray-300 text-black rounded-md px-6 py-2" onClick={() => setModal(null)}>
          Cancel
        </button>
        <button className="bg-red-600 text-white rounded-md px-6 py-2" onClick={() => setModal(null)}>
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
      {modal === "deactivate" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.03)" }}>
          <div className="bg-white rounded-md p-8 w-full max-w-md relative">
            <div className="flex items-center justify-between mb-4">
              {/* Deactivate SVG */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none"><g filter="url(#a)"><rect width="48" height="48" x="2" y="1" fill="#fff" rx="10"/><rect width="47" height="47" x="2.5" y="1.5" stroke="#E9EAEB" rx="9.5"/><path fill="#E51B1B" d="M25 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM16.046 28.253c-.058.468.172.92.57 1.175A9.953 9.953 0 0 0 22 31c1.982 0 3.83-.578 5.384-1.573.398-.254.628-.707.57-1.175a6.001 6.001 0 0 0-11.908 0ZM26.75 20.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z"/></g><defs><filter id="a" width="52" height="52" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.05 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11290_35768"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_11290_35768" result="shape"/></filter></defs></svg>
              </div>
              <button className="text-gray-400" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="text-lg font-semibold text-center mb-2">Deactivate Profile</div>
            <div className="text-gray-600 text-center mb-6">Are you sure you want to deactivate this profile? The user can be reactivated back.</div>
            <div className="flex justify-end gap-4">
              <button className="bg-gray-200 text-black rounded-md px-6 py-2" onClick={() => setModal(null)}>Cancel</button>
              <button className="bg-[#E51B1B] text-white rounded-md px-6 py-2">Deactivate</button>
            </div>
          </div>
        </div>
      )}
      {modal === "export" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.03)" }}>
          <div className="bg-white rounded-md p-8 w-full max-w-md relative">
            <div className="flex items-center justify-between mb-4">
              {/* Export SVG */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="#737373" d="M11.137 9.138 8.47 11.804a.667.667 0 0 1-.943 0L4.861 9.138a.667.667 0 1 1 .942-.943l1.529 1.529V2a.667.667 0 0 1 1.333 0v7.724l1.529-1.53a.667.667 0 1 1 .943.944Z"/><path fill="#737373" d="M2.665 11.666a.667.667 0 0 0-1.333 0v1a2.667 2.667 0 0 0 2.667 2.667h8a2.667 2.667 0 0 0 2.666-2.667v-1a.667.667 0 0 0-1.333 0v1c0 .737-.597 1.334-1.333 1.334h-8a1.333 1.333 0 0 1-1.334-1.334v-1Z"/></svg>
              </div>
              <button className="text-gray-400" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="text-lg font-semibold text-center mb-2">Export User Data</div>
            <div className="text-gray-600 text-center mb-6">Exporting user data...</div>
            <div className="flex justify-end gap-4">
              <button className="bg-gray-200 text-black rounded-md px-6 py-2" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      {modal === "delete" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.03)" }}>
          <div className="bg-white rounded-md p-8 w-full max-w-md relative">
            <div className="flex items-center justify-between mb-4">
              {/* Delete SVG */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none"><rect width="48" height="48" x="4" y="4" fill="#FEE4E2" rx="24"/><rect width="48" height="48" x="4" y="4" stroke="#FEF3F2" strokeWidth="8" rx="24"/><path stroke="#D92D20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M32 22v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C30.48 18 29.92 18 28.8 18h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C24 19.52 24 20.08 24 21.2v.8m2 5.5v5m4-5v5M19 22h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C32.72 38 31.88 38 30.2 38h-4.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C21 35.72 21 34.88 21 33.2V22"/></svg>
              </div>
              <button className="text-gray-400" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="text-lg font-semibold text-center mb-2">Delete Profile</div>
            <div className="text-gray-600 text-center mb-6">Are you sure you want to delete this profile? This action cannot be undone.</div>
            <div className="flex justify-end gap-4">
              <button className="bg-gray-200 text-black rounded-md px-6 py-2" onClick={() => setModal(null)}>Cancel</button>
              <button className="bg-[#E51B1B] text-white rounded-md px-6 py-2">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;