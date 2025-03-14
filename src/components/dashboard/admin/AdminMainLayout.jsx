"use client";
import { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import MobileAdminSidebar from "./MobileAdminSidebar";
import Overlay from "@/components/overlays/Overlay";

function AdminMainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-50 overflow-hidden w-full px-2">
      {/* sidebar */}
      <div className="fixed top-0 left-0 z-40 shadow w-0 md:w-64 hidden md:block">
        <SidebarAdmin onClose={() => setIsOpen(false)} />
      </div>
      {/* Mobile sidebar */}
      {isOpen && (
        <MobileAdminSidebar
          onClose={() => setTimeout(() => setIsOpen(false), 1000)}
        />
      )}
      {isOpen && <Overlay onClose={() => setIsOpen(false)} />}
      <div className="fixed top-0 left-0 shadow  md:pl-64 z-30 w-full">
        <HeaderAdmin onOpen={() => setIsOpen(true)} />
      </div>
      {/* header */}
      <main className="md:pl-64 mt-16 min-h-screen py-2">{children}</main>
    </div>
  );
}

export default AdminMainLayout;
