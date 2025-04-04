import Image from "next/image";
import React from "react";

function AdminUserHeader() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={"/profile.webp"}
        alt="User Profile Image"
        height={100}
        width={100}
        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
      />
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
          Flivian Mwirigi
        </h1>
        <p className="text-xs font-medium text-gray-500">Never Active</p>
      </div>
    </div>
  );
}

export default AdminUserHeader;
