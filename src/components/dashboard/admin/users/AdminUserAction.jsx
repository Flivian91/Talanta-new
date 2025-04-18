"use client";
import { useState, useRef, useEffect } from "react";
import { BsUnlock } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";

export default function AdminUserAction() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-secondary px-2 py-1 rounded text-white"
      >
        <span className="text-sm tracking-wide font-semibold">Actions</span>
        <RxCaretDown className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute top-full -left-24 mt-2 w-48 bg-white shadow-lg rounded-md">
          <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100">
            <FaBan />
            <span className="text-sm font-semibold">Ban user</span>
          </button>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100">
            <BsUnlock />
            <span className="text-sm font-semibold">Unban user</span>
          </button>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100">
            <MdDelete />
            <span className="text-sm font-semibold">Delete user</span>
          </button>
        </div>
      )}
    </div>
  );
}
