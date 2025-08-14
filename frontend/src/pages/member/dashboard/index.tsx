import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardView from "@/components/view/Member/DashboardView";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      desc="A quick overview of sales performance, stock levels, and recent POS activities."
      type="member"
    >
      <DashboardView />
    </DashboardLayout>
  );
};

export default DashboardPage;
