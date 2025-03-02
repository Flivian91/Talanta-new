import React from "react";
import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";

function DisLikeButton() {
  return (
    <button className="flex items-center sm:gap-2 bg-gray-100 gap-1 px-2 sm:px-4 py-1 sm:py-2 rounded transition-transform duration-300 transform hover:scale-105 active:scale-95 text-sm tracking-wide font-medium">
      <AiOutlineDislike />
    </button>
  );
}

export default DisLikeButton;
