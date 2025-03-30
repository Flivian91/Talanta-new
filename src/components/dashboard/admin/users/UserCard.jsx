import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";

function UserCard() {
  return (
    <div className="group hover:bg-gray-100 py-3 px-2 border-b border-gray-300 grid grid-cols-[2fr_1fr_1fr_1fr] items-center">
      <Link href={"/users/userID"} className="flex items-center gap-2">
        <Image
          src={"/profile.webp"}
          width={100}
          height={100}
          className="w-12 h-12 rounded-full"
          alt="Profile Image"
        />
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold">Flivian Mwirigi</h2>
          <p className="text-gray-600">dflivo@gmail.com</p>
        </div>
      </Link>
      <div>
        {/* <span className="text-secondary rounded-full px-4 py-2 bg-green-100/50 tracking-wide">
                Active
              </span> */}
        <span className="text-gray-600 rounded-full px-4 py-2 border border-gray-300 tracking-wide">
          Inactive
        </span>
      </div>
      <div>
        {/* <span className="px-4 py-2 rounded bg-red-100/40 text-red-600">Admin</span> */}
        {/* <span className="px-4 py-2 rounded bg-green-100/40 text-green-600">
                Sponsor
              </span> */}
        <span className="px-4 py-2 rounded bg-accent/20 text-black">User</span>
      </div>
      <div className="">
        {/* <button className="px-2 invisible group-hover:visible py-2 hover:bg-accent/20 rounded">
                <BsThreeDots className="text-lg" />
              </button> */}
        <div className=" text-gray-400">
          <div className="flex gap-2">
            <button
              data-tooltip-id="user-actions-tooltip"
              data-tooltip-content="View Profile"
              className="flex items-center p-2 text-base  text-green-600 gap-2 hover:bg-accent/20 rounded"
            >
              <FaUserCircle />
            </button>
            <button
              data-tooltip-id="user-actions-tooltip"
              data-tooltip-content="Ban User"
              className="flex items-center p-2 text-base gap-2 text-red-600 hover:bg-accent/20 rounded"
            >
              <FaBan />
            </button>
            <button
              data-tooltip-id="user-actions-tooltip"
              data-tooltip-content="Delete User"
              className="flex items-center p-2 text-lg gap-2 text-red-600 hover:bg-accent/20 rounded"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
      <Tooltip
        id="user-actions-tooltip"
        place="bottom"
        effect="solid"
        className="bg-accent text-white px-2 py-1 rounded z-40"
      />
    </div>
  );
}

export default UserCard;
