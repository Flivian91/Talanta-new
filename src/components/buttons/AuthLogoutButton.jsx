import { SignedIn } from "@clerk/nextjs";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

function AuthLogoutButton() {
  return (
    <SignedIn>
      <button className="flex items-center gap-2 justify-center px-4 py-2 text-xs  sm:text-sm tracking-wide font-medium text-gray-700 hover:bg-gray-200 rounded border border-surface/40">
        <AiOutlineUser />
        <span className="">Sign Out</span>
      </button>
    </SignedIn>
  );
}

export default AuthLogoutButton;
