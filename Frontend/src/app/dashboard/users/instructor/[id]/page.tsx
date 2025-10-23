'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation'
import MainLayout from '@/components/Dashboard/MainLayout'
import Overview from '@/components/users/InstructorProfile/Overview'
import ProfileHeader from "@/components/users/InstructorProfile/ProfileHeader";
import ProfileTabs from "@/components/users/InstructorProfile/ProfileTabs";
import SearchActionBar from "@/components/users/InstructorProfile/SearchActionBar";
import Pagination from "@/components/users/InstructorProfile/Pagination";
import AssignedClassesTable from "@/components/users/InstructorProfile/AssignedClassesTable";
import ActivitiesTable from "@/components/users/InstructorProfile/ActivitiesTable";

const tabs = [
  "Overview",
  "Assigned Classes",
  "Activites",
] as const;
type Tab = typeof tabs[number];

export default function InstructorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [email, setEmail] = useState<string | null>(null);


  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      if (typeof id === "undefined") {
        setProfile(null);
        setEmail(null);
        setLoading(false);
        return;
      }
      let emailFetched = await getEmailById(id as string | string[]);
      setEmail(emailFetched); // <-- Save email for Overview
      if (!emailFetched) {
        setProfile(null);
        setLoading(false);
        return;
      }
      const res = await fetch("https://backoffice-api.dojoconnect.app/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFetched }),
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
  if (profile.role !== "instructor") return <MainLayout><div>Not an Instructor profile</div></MainLayout>;

   return (
    <MainLayout>
      <div className="p-6">
        <ProfileHeader profile={profile} onBack={() => router.push('/dashboard?tab=users')} />
        <ProfileTabs tabs={[...tabs]} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Overview" && email && <Overview profile={profile} email={email} />}
        {activeTab === "Assigned Classes" && email && (
  <div className="mt-6">
    <AssignedClassesTable email={email} />
  </div>
)}
        {activeTab === "Activites" && (
          <div className="mt-6">
            <ActivitiesTable activitiesList={profile.activitiesList || []} />
          </div>
        )}
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