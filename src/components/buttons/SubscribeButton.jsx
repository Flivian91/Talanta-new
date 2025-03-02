import React from "react";
import { IoNotifications } from "react-icons/io5";

function SubscribeButton() {
  return (
    <button className="flex items-center gap-1 bg-secondary/25 text-black px-4 py-2 rounded-full text-sm transition-transform transform hover:scale-105 active:scale-95">
      <IoNotifications />
      <span>Subscribe</span>
    </button>
  );
}

export default SubscribeButton;
