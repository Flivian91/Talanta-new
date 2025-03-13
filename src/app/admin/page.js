// import AdminCharts from "@/components/dashboard/admin/AdminCharts";
import AdminCharts from "@/components/dashboard/admin/AdminCharts";
import StatsAdminLayout from "@/components/dashboard/admin/StatsAdminLayout";
import WelcomeAdmin from "@/components/dashboard/admin/WelcomeAdmin";
import React from "react";

function AdminHome() {
  return (
    <section className="px-4 w-full flex flex-col gap-5">
      <WelcomeAdmin />
      <StatsAdminLayout />
      <AdminCharts />
    </section>
  );
}

export default AdminHome;
