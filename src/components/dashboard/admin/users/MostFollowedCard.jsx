import React from "react";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";

function MostFollowedCard({ data, index }) {
  return (
    <div className="grid grid-cols-[10px_1fr_1fr_20px_1fr] gap-3 py-1 px-2 hover:bg-gray-100 text-sm font-medium tracking-wide items-center">
      <span className="font-mono text-lg">{index + 1}</span>
      <div className="flex items-center gap-2">
        <FaUser className="text-xs mb-0.5" />
        <span>{data.firstName}</span>
      </div>
      <span>{data.email}</span>
      <span className="font-mono flex items-center justify-center">{data.followersCount}</span>
      <div className="flex items-center justify-center gap-2">
        <button className="p-2 rounded text-green-500 hover:bg-white flex items-center justify-center">
          <FaEdit />
        </button>
        <button className="p-2 rounded text-red-500 hover:bg-white flex items-center justify-center">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default MostFollowedCard;
