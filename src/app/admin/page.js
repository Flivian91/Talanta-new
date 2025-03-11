import StatsAdminLayout from "@/components/dashboard/admin/StatsAdminLayout";
import WelcomeAdmin from "@/components/dashboard/admin/WelcomeAdmin";
import React from "react";

function AdminHome() {
  return (
    <section className="px-4 w-full">
      <WelcomeAdmin />
      <StatsAdminLayout />
    </section>
  );
}

export default AdminHome;
