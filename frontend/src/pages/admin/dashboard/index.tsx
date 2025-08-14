import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardView from "@/components/view/Admin/DashboardView";

const DashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      desc="A quick overview of sales performance, stock levels, and recent POS activities."
      type="admin"
    >
      <DashboardView />
    </DashboardLayout>
  );
};

export default DashboardPage;
