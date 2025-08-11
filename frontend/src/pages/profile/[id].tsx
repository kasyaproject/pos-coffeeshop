import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProfileView from "@/components/view/ProfileView";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
const { data: session } = useSession();
  const role = session?.user?.role || "member";

  return (
    <DashboardLayout
      title="Profile page"
      desc="Manage your account details and personal settings."
      type={role}
    >
      <ProfileView />
    </DashboardLayout>
  );
};

export default ProfilePage;
