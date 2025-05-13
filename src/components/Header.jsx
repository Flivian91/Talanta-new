// src/Components/Header.jsx
"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";
import { useState } from "react";
import SearchInputButton from "./buttons/SearchInputButton";
import DashboardButton from "./buttons/DashboardButton";
import UploadButton from "./buttons/UploadButton";
import SearchInputModel from "./models/SearchInputModel";
import SearchOverlay from "./overlays/SearchOverlay";
import Overlay from "./overlays/Overlay";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role;
  console.log(role)
  return (
    <div>
      <header className="flex items-center justify-between bg-white shadow px-2 sm:px-4 py-3 sticky top-0 z-20">
        {/* Left Section: Sidebar Toggle + Logo */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button (Only for Mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:bg-gray-100 p-2 md:text-xl rounded md:hidden inline-block"
          >
            <AiOutlineMenu />
          </button>
          <Logo />
        </div>
        {/* Middle Section: Search Bar */}
        <SearchInputButton onClick={() => setIsInputOpen(true)} />

        {/* Right Section: Navigation Links & Profile */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links (Hidden on Mobile) */}
          {isSignedIn && (
            isLoaded ?<nav className="hidden md:flex space-x-4">
            {role === "admin" ? (
              <DashboardButton link="admin" />
            ) : role === "sponsor" ? (
              <DashboardButton link="sponsor" />
            ) : (
              <UploadButton />
            )}
          </nav> : <div className="w-40 h-10 bg-gray-200 animate-pulse rounded"></div>
            
          )}
          {/* User Profile (Clerk User Button) */}
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2 transition-all duration-300">
                <Link
                  href="/auth/signin"
                  className="inline-block ml-2 px-4 py-2 rounded border text-xs sm:text-sm font-bold tracking-wider border-surface/30 "
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="md:inline-block hidden ml-2 px-4 py-2 rounded bg-secondary hover:bg-secondary/90 text-white  text-xs md:text-sm font-bold tracking-wider "
                >
                  Sign Up
                </Link>
              </div>
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
