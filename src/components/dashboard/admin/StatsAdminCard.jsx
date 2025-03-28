import Link from "next/link";
import React from "react";
import { PiLinkSimple } from "react-icons/pi";
function StatsAdminCard({ title, count, icon, bgColor, link }) {
  return (
    <Link href={link}
      className={`p-6 relative rounded shadow-lg flex items-center gap-4 ${bgColor}`}
    >
      <div className="text-4xl text-white">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-xl md:text-3xl font-bold text-white">{count}</p>
      </div>
      <button className="absolute top-1 right-1 p-2 rounded-full text-black hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
        <PiLinkSimple/>
      </button>
    </Link>
  );
}
export default StatsAdminCard;
