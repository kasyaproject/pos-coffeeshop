import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const role = session?.user?.role || "member"; // default guest kalau belum login

  return (
    <DashboardLayout
      title="Profile page"
      desc="Manage your account details and personal settings."
      type={role}
    >
      Profile Page
    </DashboardLayout>
  );
};

export default ProfilePage;
