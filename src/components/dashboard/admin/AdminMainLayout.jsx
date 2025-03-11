"use client";
import { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import MobileAdminSidebar from "./MobileAdminSidebar";
import Overlay from "@/components/overlays/Overlay";

function AdminMainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-100 overflow-hidden w-full">
      {/* sidebar */}
      <div className="fixed top-0 left-0 z-30 w-0 md:w-64 hidden md:block">
        <SidebarAdmin />
      </div>
      {/* Mobile sidebar */}
      {isOpen && <MobileAdminSidebar />}
      {isOpen && <Overlay onClose={() => setIsOpen(false)} />}
      <div className="fixed top-0 left-0 md:pl-64 z-30 w-full">
        <HeaderAdmin onOpen={() => setIsOpen(true)} />
      </div>
      {/* header */}
      <main className="md:pl-64 min-h-screen">{children}</main>
    </div>
  );
}

export default AdminMainLayout;
