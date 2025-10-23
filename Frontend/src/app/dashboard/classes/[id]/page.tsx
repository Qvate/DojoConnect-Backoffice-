"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import MainLayout from '@/components/Dashboard/MainLayout';
import Pagination from '@/components/classes/Pagination';
import SearchActionBar from '@/components/classes/ClassProfile/SearchActionBar';
import ProfileHeader from '@/components/classes/ClassProfile/ProfileHeader';
import ProfileTabs from '@/components/classes/ClassProfile/ProfileTabs';
import ClassOverview from '@/components/classes/ClassProfile/ClassInfo';
import EnrolledStudentsTable from '@/components/classes/ClassProfile/EnrolledStudentTable';
import Attendance from "@/components/classes/ClassProfile/Attendance";
import Subscription from "@/components/classes/ClassProfile/Subscription";
import Activities from "@/components/classes/ClassProfile/Activities";
import ClassScheduleCalendar from "@/components/classes/ClassProfile/Calendar";

export default function ClassDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    const tabs: string[] = [
    "Class Info",
    "Enrolled Student",
    "Class Schedule",
    "Attendance",
    "Subscription",
    "Activities"
  ];
  type Tab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<Tab>("Class Info");

useEffect(() => {
  if (!id) return;

  async function fetchClassDetails() {
    setLoading(true);
    try {
      const res = await fetch('https://www.backoffice-api.dojoconnect.app/get_class_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_uid: id }),
      });

      const data = await res.json(); // <-- Use this now!
      console.log("API response:", data);
      if (data.class) {
        setProfile(data.class);
        setSchedule(data.schedule);
         console.log("Set profile:", data.class);
      } else {
        setProfile(null);
        console.log("No class in response");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProfile(null);
    }
    setLoading(false);
  }
  fetchClassDetails();
}, [id]);

  if (loading) {
    return <MainLayout><div>Loading...</div></MainLayout>;
  }

  if (!profile) {
    return <MainLayout><div>Class not found</div></MainLayout>;
  }




  return (
    <MainLayout>
      <div className="p-6">
        <ProfileHeader
          profile={{
            className: profile.class_name,
            classLevel: profile.level,
            instructor: { name: profile.instructor, avatar: "/instructorImage.png" },
            classAge: profile.age_group,
            frequency: profile.frequency,
            enrolledStudents: profile.capacity,
            location: profile.location,
            status: profile.status,
            dateCreated: profile.created_at,
            classImg: profile.image_path
              ? (profile.image_path.startsWith("http")
                  ? profile.image_path
                  : `https://www.backoffice-api.dojoconnect.app/${profile.image_path}`)
              : "/classImg.jpg",
            subscriptionType: profile.subscription,
            subscriptionFee: profile.price,
            gradingDate: profile.grading_date,
          }}
          onBack={() => router.push('/dashboard?tab=classes')}
        />

        <ProfileTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8">
          {activeTab === "Class Info" && <ClassOverview profile={profile} />}
          {activeTab === "Enrolled Student" && (
            <>
              <SearchActionBar />
              <EnrolledStudentsTable />
              <Pagination />
            </>
          )}
          {activeTab === "Class Schedule" && ( <ClassScheduleCalendar />)}
          {activeTab === "Attendance" && (
            <>
              <Attendance />
              <Pagination />
            </>
          )}
          {activeTab === "Subscription" && <Subscription />}
          {activeTab === "Activities" && (
            <>
              <SearchActionBar />
              <Activities />
              <Pagination />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 