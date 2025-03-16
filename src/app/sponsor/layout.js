"use client";
import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaEnvelope,
  FaMoneyCheck,
  FaCog,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import SidebarSponsor from "@/components/dashboard/sponsor/SidebarSponsor";
import MobileSponsorSidebar from "@/components/dashboard/sponsor/MobileSponsorSidebar";
import Overlay from "@/components/overlays/Overlay";
import HeaderSponsor from "@/components/dashboard/sponsor/HeaderSponsor";

export default function SponsorLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 z-40 shadow w-0 md:w-64 hidden md:block">
        <SidebarSponsor onClose={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
        <MobileSponsorSidebar
          onClose={() => setTimeout(() => setIsSidebarOpen(false), 1000)}
        />
      )}
      {isSidebarOpen && <Overlay onClose={() => setIsSidebarOpen(false)} />}
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="fixed top-0 left-0 shadow  md:pl-64 z-30 w-full">
          <HeaderSponsor onOpen={() => setIsSidebarOpen(true)} />
        </div>
        {/* header */}
        <main className="md:pl-64 mt-16 min-h-screen py-2">{children}</main>
      </div>
    </div>
  );
}
