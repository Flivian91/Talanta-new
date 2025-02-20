import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function AuthButtons() {
  return (
    <SignedOut>
      <div className="flex items-center gap-2 transition-all duration-300">
        <Link
          href="/auth/signup"
          className="block-inline ml-2 px-4 py-2 rounded bg-secondary hover:bg-secondary/90 text-white  text-xs md:text-sm font-bold tracking-wider "
        >
          Sign Up
        </Link>
        <Link
          href="/auth/signin"
          className="block-inline ml-2 px-4 py-2 rounded border text-sm font-bold tracking-wider border-surface/30 "
        >
          Sign In
        </Link>
      </div>
    </SignedOut>
  );
}

export default AuthButtons;
