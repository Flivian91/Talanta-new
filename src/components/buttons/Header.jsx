// src/Components/Header.jsx
"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";
import { useState } from "react";
import Overlay from "./overlays/Overlay";
import MobileSidebar from "./MobileSidebar";
import DashboardButton from "./buttons/DashboardButton";
import UploadButton from "./buttons/UploadButton";
import SearchInputModel from "./models/SearchInputModel";
import SearchInputButton from "./buttons/SearchInputButton";
import SearchOverlay from "./overlays/SearchOverlay";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const role = user?.publicMetadata?.role;
  return (
    <div>
      <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-20">
        {/* Left Section: Sidebar Toggle + Logo */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button (Only for Mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:bg-gray-100 p-2 rounded md:hidden inline-block"
          >
            <AiOutlineMenu size={24} />
          </button>
          <Logo />
        </div>
        {/* Middle Section: Search Bar */}
        <SearchInputButton onClick={() => setIsInputOpen(true)} />

        {/* Right Section: Navigation Links & Profile */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links (Hidden on Mobile) */}
          {isSignedIn && (
            <nav className="hidden md:flex space-x-4">
              {role === "admin" ? (
                <DashboardButton link="admin" />
              ) : role === "sponser" ? (
                <DashboardButton link="sponser" />
              ) : (
                <UploadButton />
              )}
            </nav>
          )}
          {/* User Profile (Clerk User Button) */}
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link
                href="/auth/signin"
                className="block-inline ml-2 px-4 py-2 rounded-full border  text-base font-bold tracking-wider border-surface "
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>
      {/* Ovelay and Mobile menu */}
      {sidebarOpen && <MobileSidebar onClose={() => setSidebarOpen(false)} />}
      {sidebarOpen && <Overlay onClose={() => setSidebarOpen(false)} />}
      {/* Search Input Model */}
      {isInputOpen && (
        <SearchInputModel onClose={() => setIsInputOpen(false)} />
      )}
      {isInputOpen && <SearchOverlay onClose={() => setIsInputOpen(false)} />}
    </div>
  );
}
