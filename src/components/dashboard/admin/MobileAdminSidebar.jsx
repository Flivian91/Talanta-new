"use client";

import adminLinks from "@/components/data/AdminLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileAdminSidebar({ onClose }) {
  const pathName = usePathname();
  return (
    <aside className="w-64 fixed top-0 left-0 z-50 min-h-screen flex flex-col bg-white pb-2 md:hidden">
      <div className="flex items-center flex-col gap-2 border-b border-gray-200 py-2">
        <Image
          src={"/logo.svg"}
          width={50}
          height={40}
          alt="This is the talanta logo"
        />
        <span className="text-xs font-semibold tracking-wide">
          Modern Admin Dashboard
        </span>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="flex flex-col gap-4 w-full">
          {adminLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={onClose}
              className="group flex items-center gap-6 pr-3"
            >
              {pathName === link.href ? (
                <span className="inline-block w-1 h-10 rounded-r bg-green-400 "></span>
              ) : (
                <span className="inline-block w-1 h-10 rounded-r bg-transparent group-hover:bg-gray-400 "></span>
              )}
              <div
                className={`flex items-center gap-2  px-4 py-2 rounded w-full ${
                  pathName == link.href
                    ? " text-green-600 bg-green-300/20"
                    : " text-gray-700 group-hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      {/* <div className="flex items-center  w-full px-2">
        <SignedIn>
          <SignOutButton>
            <Link href={"/admin"} className="inline-block gap-8 w-full">
              <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded text-white">
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </Link>
          </SignOutButton>
        </SignedIn>
      </div> */}
    </aside>
  );
}

export default MobileAdminSidebar;
