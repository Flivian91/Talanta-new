"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { use } from "react";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { MdMessage } from "react-icons/md";

function HeaderAdmin({ onOpen }) {
  const { user } = useUser();
  return (
    <nav className="flex items-center gap-2 py-2 bg-white px-2">
      <button
        onClick={onOpen}
        className="items-center md:hidden flex p-3 text-xl rounded hover:bg-gray-100"
      >
        <FiMenu />
      </button>
      <div className="flex-1  w-full grid md:grid-cols-2 gap-2 ">
        <div className="hidden md:flex items-center gap-2 border rounded px-2 border-gray-300">
          <input
            type="text"
            placeholder="Search here"
            className=" text-base font-mono w-full hidden md:flex caret-accent h-full border-none outline-none placeholder:text-base"
          />
          <button className="p-2 text-gray-500">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center justify-end gap-10">
          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="relative p-3 text-xl rounded bg-green-300/20 text-green-400">
              <IoNotifications />
              <span className="flex items-center justify-center w-5 h-5 border-2 border-white text-xs rounded-full font-mono bg-accent text-white absolute -top-1 -right-1">
                21
              </span>
            </button>
            <button className="relative p-3 text-xl rounded bg-green-300/20 text-green-400">
              <MdMessage />
              <span className="flex items-center justify-center w-5 h-5 border-2 border-white text-xs rounded-full font-mono bg-accent text-white absolute -top-1 -right-1">
                08
              </span>
            </button>
          </div>
          <span className="inline-block w-0.5 h-full bg-gray-200"></span>
          <div className="flex items-center text-gray-800 gap-3">
            <h3 className="flex items-center gap-2">
              <span className="text-sm font-medium tracking-wide">Hello,</span>
              <span className="text-base font-bold tracking-wide font-mono">
                {user?.firstName || user?.lastName}
              </span>
            </h3>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
