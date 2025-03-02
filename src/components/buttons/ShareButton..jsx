import React from "react";

import { FaShare } from "react-icons/fa";
function ShareButton() {
  return (
    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded transition-transform duration-300 transform hover:scale-105 active:scale-95 text-sm tracking-wide font-medium">
      <FaShare />
      <span>Share</span>
    </button>
  );
}

export default ShareButton;
