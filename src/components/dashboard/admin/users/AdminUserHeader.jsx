import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

function AdminUserHeader({ user }) {
  const formatedDate = dayjs(user?.lastSignInAt).format("DD MMMM, YYYY");
  return (
    <div className="flex items-center gap-3">
      <Image
        src={user?.imageUrl}
        alt="User Profile Image"
        height={100}
        width={100}
        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
      />
      <div className="flex flex-col">
        <h1 className="text-base sm:text-2xl font-semibold tracking-wide space-x-2 flex items-center gap-2">
          {user?.firstName === null || user.lastName === null ? (
            <span>
              {user.emailAddresses.at(0).emailAddress?.split("@").at(0)}
            </span>
          ) : (
            <div className=" flex items-center gap-1">
              <span>{user?.firstName}</span>
              <span>{user?.lastName}</span>
            </div>
          )}
          {user?.banned && (
            <button className="text-red-700 text-xs rounded-full px-2 py-1 bg-red-100/50 tracking-wide">
              Banned
            </button>
          )}
        </h1>
        <p className="text-xs font-medium text-gray-500 ">
          {user?.lastActiveAt === null ? "Never Active" : formatedDate}
        </p>
      </div>
    </div>
  );
}

export default AdminUserHeader;
