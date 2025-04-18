import React from "react";
import UserCard from "../dashboard/admin/users/UserCard";

function UsersGridArea({ data }) {
  return (
    <div className="overflow-x-auto bg-stone-100 rounded-t-xl text-sm transition-all duration-300">
      <div className="w-full min-w-[600px] text-xs md:text-sm overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] py-3 px-2 text-base font-semibold text-gray-700">
          <span>User</span>
          <span className="px-2">Status</span>
          <span className="px-2">Role</span>
          <span className="px-2">Actions</span>
        </div>
        <div className="rounded-xl flex flex-col bg-white border border-gray-300 overflow-hidden">
          {data.map((data) => (
            <UserCard data={data} key={data.id} />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default UsersGridArea;
