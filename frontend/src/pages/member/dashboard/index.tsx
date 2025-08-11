import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      desc="A quick overview of sales performance, stock levels, and recent POS activities."
      type="member"
    >
      Member Dashboard Page
    </DashboardLayout>
  );
};

export default DashboardPage;
