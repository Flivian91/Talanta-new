import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
function LikeButton() {
  return (
    <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded  transition-transform duration-300 transform hover:scale-105 active:scale-95 text-sm tracking-wide font-medium">
      <AiOutlineLike />
      <span>20</span>
    </button>
  );
}

export default LikeButton;
