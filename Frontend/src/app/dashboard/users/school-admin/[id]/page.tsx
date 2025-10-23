'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation'
import MainLayout from '@/components/Dashboard/MainLayout'
import ProfileHeader from "@/components/users/AdminProfile/ProfileHeader"
import ProfileTabs from "@/components/users/AdminProfile/ProfileTabs"
import ProfileOverview from "@/components/users/AdminProfile/Overview"
import InstructorsTab from "@/components/users/AdminProfile/InstructorsTab"
import ClassesTab from "@/components/users/AdminProfile/ClassesTab"
import ParentsTab from "@/components/users/AdminProfile/ParentsTab"
import StudentsTab from "@/components/users/AdminProfile/StudentsTab"
import SubscriptionTab from "@/components/users/AdminProfile/SubscriptionTab"
import SubscriptionSummary from "@/components/users/AdminProfile/SubscriptionSummary"
import PaymentMethod from "@/components/users/AdminProfile/PaymentMethod";
import ActivitiesTab from "@/components/users/AdminProfile/ActivitiesTab" 
import Calendar from "@/components/users/AdminProfile/Calendar"

const tabs = [
  "Overview",
  "Instructors",
  "Classes",
  "Parents",
  "Students",
  "Calendar",
  "Subscription",
  "Activities"
] as const;
type Tab = typeof tabs[number];

export default function AdminProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      if (typeof id === "undefined") {
        setProfile(null);
        setLoading(false);
        return;
      }
      let email = await getEmailById(id as string | string[]);
      if (!email) {
        setProfile(null);
        setLoading(false);
        return;
      }
      const res = await fetch("https://backoffice-api.dojoconnect.app/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [id]);

  if (loading) return <MainLayout><div>Loading...</div></MainLayout>;
  if (!profile) return <MainLayout><div>User not found</div></MainLayout>;
  if (profile.role !== "admin") return <MainLayout><div>Not an Admin profile</div></MainLayout>;

  return (
    <MainLayout>
      <div className="p-6">
        <ProfileHeader profile={profile} onBack={() => router.push('/dashboard?tab=users')} />
        <ProfileTabs tabs={[...tabs]} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Overview" && <ProfileOverview profile={profile} />}
        {activeTab === "Instructors" && <InstructorsTab instructors={profile.instructors || []} />}
        {activeTab === "Classes" && <ClassesTab email={profile.email} />}
        {activeTab === "Parents" && <ParentsTab />}
        {activeTab === "Students" && <StudentsTab />}
        {activeTab === "Calendar" && <Calendar />}
        {activeTab === "Subscription" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="h-full flex flex-col">
                <SubscriptionSummary />
              </div>
              <div className="h-full flex flex-col">
                <PaymentMethod />
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between bg-white-200 px-4 py-3 rounded-md border-b border-gray-200 mb-2">
                <span className="font-semibold text-gray-700 text-lg">Billing history</span>
                <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h12"/>
                  </svg>
                  Download
                </button>
              </div>
              <div className="mt-4">
                <SubscriptionTab data={profile.subscription_history || []} />
              </div>
            </div>
          </>
        )}
        {activeTab === "Activities" && <ActivitiesTab />}
      </div>
    </MainLayout>
  );
}

async function getEmailById(id: string | string[]) {
  const res = await fetch("https://backoffice-api.dojoconnect.app/get_users");
  const data = await res.json();
  const user = data.data.find((u: any) => String(u.id) === String(id));
  return user?.email || null;
}