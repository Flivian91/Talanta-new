import AdminMainLayout from "@/components/dashboard/admin/AdminMainLayout";
import React from "react";

function AdminLayout({children}) {
  return <AdminMainLayout>{children}</AdminMainLayout>;
}

export default AdminLayout;
