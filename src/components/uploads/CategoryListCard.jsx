import React from "react";
import { MdClear, MdDelete } from "react-icons/md";

function CategoryListCard({ onDelete, index, text }) {
  return (
    <div
      onClick={() => onDelete(text)}
      className="cursor-pointer select-none flex items-center gap-2 text-xs py-1 px-3 font-medium tracking-wide hover:bg-gray-100 rounded"
    >
      <span>{text}</span>
      <button className="">
        <MdClear />
      </button>
    </div>
  );
}

export default CategoryListCard;
