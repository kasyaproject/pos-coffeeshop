import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const DashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      desc="A quick overview of sales performance, stock levels, and recent POS activities."
      type="admin"
    >
      Admin Dashboard Page
    </DashboardLayout>
  );
};

export default DashboardPage;
