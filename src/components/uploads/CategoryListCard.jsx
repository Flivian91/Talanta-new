import React from "react";
import { MdClear, MdDelete } from "react-icons/md";

function CategoryListCard({ index, text }) {
  return (
    <div className="cursor-pointer select-none flex items-center gap-2 text-xs py-1 px-3 font-semibold tracking-wide hover:bg-gray-100 rounded">
      <span>{text}</span>
    </div>
  );
}

export default CategoryListCard;
