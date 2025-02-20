import { SignedIn, SignOutButton } from "@clerk/nextjs";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";

function AuthLogoutButton() {
  return (
    <SignOutButton>
      <button className="flex items-center gap-2 w-full justify-center px-4 py-2 text-xs  sm:text-sm tracking-wide font-medium text-gray-700 hover:bg-gray-200 rounded border border-surface/40">
        <IoLogOut />
        <span className="">Sign Out</span>
      </button>
    </SignOutButton>
  );
}

export default AuthLogoutButton;
