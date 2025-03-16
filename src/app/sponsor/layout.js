"use client";
import { useState } from "react";
import { FaHome, FaUsers, FaEnvelope, FaMoneyCheck, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SponsorLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        className="bg-white shadow-md h-full flex flex-col transition-all duration-300"
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>Sponsor Panel</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
        </div>
        <nav className="flex-1 px-2">
          <SidebarLink href="/sponsor" icon={<FaHome />} text="Dashboard" isSidebarOpen={isSidebarOpen} />
          <SidebarLink href="/sponsor/discover" icon={<FaUsers />} text="Discover Talents" isSidebarOpen={isSidebarOpen} />
          <SidebarLink href="/sponsor/messages" icon={<FaEnvelope />} text="Messages" isSidebarOpen={isSidebarOpen} />
          <SidebarLink href="/sponsor/sponsorships" icon={<FaMoneyCheck />} text="Sponsorships" isSidebarOpen={isSidebarOpen} />
          <SidebarLink href="/sponsor/settings" icon={<FaCog />} text="Settings" isSidebarOpen={isSidebarOpen} />
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Sponsor Dashboard</h2>
          <div className="flex items-center gap-4">
            <button>🔔</button> {/* Notification Button */}
            <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// Sidebar Link Component
function SidebarLink({ href, icon, text, isSidebarOpen }) {
  return (
    <Link href={href} className="flex items-center p-3 hover:bg-gray-200 rounded-md">
      {icon}
      <span className={`ml-2 ${!isSidebarOpen && "hidden"}`}>{text}</span>
    </Link>
  );
}
