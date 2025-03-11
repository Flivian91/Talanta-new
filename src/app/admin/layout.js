"use client";
import { useState } from "react";
import { FiMenu, FiSettings, FiUsers, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import Link from "next/link";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

const menuItems = [
  { name: "Dashboard", icon: <MdDashboard />, link: "/admin" },
  { name: "Users", icon: <FiUsers />, link: "/admin/users" },
  { name: "Talents", icon: <RiVideoFill />, link: "/admin/talents" },
  { name: "Settings", icon: <FiSettings />, link: "/admin/settings" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md transition-all`}
      >
        <div className="p-4 flex items-center justify-between">
          <span className="text-xl font-bold">{sidebarOpen ? "Admin" : "A"}</span>
          <FiMenu
            className="cursor-pointer"
            size={24}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <ul className="mt-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
              >
                {item.icon}
                {sidebarOpen && <span className="ml-4">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-5 px-4">
          <SignedIn>
            <SignOutButton>
              <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded">
                <FiLogOut />
                {sidebarOpen && <span className="ml-3">Logout</span>}
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
