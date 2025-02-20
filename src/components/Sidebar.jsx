"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineFire,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineCloudUpload,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  MdSubscriptions,
  MdPlaylistAddCheck,
  MdNotifications,
  MdAttachMoney,
  MdExplore,
} from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { Tooltip } from "react-tooltip";
import { useUser } from "@clerk/nextjs";
import { authnticatedLinks, links } from "./data/llinks";

export default function Sidebar({ toogleSidebar, sidebarOpen }) {
  const { isSignedIn } = useUser();

  return (
    <aside
      className={`bg-gray-50 border-r transition-all duration-300 hidden md:block fixed top-16 left-0 z-20 h-full mt-1  ${
        sidebarOpen ? "w-64 flex items-center justify-center" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {sidebarOpen && <h2 className="text-lg font-bold">Talanta</h2>}
        <button
          onClick={toogleSidebar}
          className="text-gray-900 text-center text-xl hover:text-gray-600 p-2 hover:bg-gray-200 rounded"
          data-tooltip-id="sidebar-button"
          data-tooltip-content={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {sidebarOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
          <Tooltip
            id="sidebar-button"
            place="bottom"
            effect="solid"
            className="bg-gray-800 text-white px-2 py-1 rounded z-40"
          />
        </button>
      </div>
      <nav className="flex-grow p-2">
        <ul className="space-y-2">
          {links.map((link) => (
            <li
              key={link.name}
              className={sidebarOpen ? "" : "flex justify-center"}
            >
              <Link
                href={link.href}
                data-tooltip-id="sidebar-tooltip"
                data-tooltip-content={sidebarOpen ? "" : link.name}
                className={
                  "flex items-center p-2 w-full text-gray-700 hover:bg-gray-200 rounded" +
                  (sidebarOpen
                    ? " flex-row "
                    : " flex-col gap-1 text-xs justify-center")
                }
              >
                {link.icon}
                <span className={sidebarOpen ? "ml-2" : ""}>{link.name}</span>
              </Link>
            </li>
          ))}
          {isSignedIn && (
            <>
              {authnticatedLinks.map((link) => (
                <li
                  key={link.name}
                  className={sidebarOpen ? "" : "flex justify-center"}
                >
                  <Link
                    href={link.href}
                    data-tooltip-id="sidebar-tooltip"
                    data-tooltip-content={sidebarOpen ? "" : link.name}
                    className={
                      "flex items-center p-2 w-full text-gray-700 hover:bg-gray-200 rounded" +
                      (sidebarOpen
                        ? " flex-row "
                        : " flex-col gap-1 text-xs justify-center")
                    }
                  >
                    {link.icon}
                    <span className={sidebarOpen ? "ml-2" : ""}>
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>

      <Tooltip
        id="sidebar-tooltip"
        place="right"
        effect="solid"
        className="bg-gray-800 text-white px-2 py-1 rounded z-40"
      />
    </aside>
  );
}
