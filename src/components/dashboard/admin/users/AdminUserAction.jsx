"use client";
import { useBanUser } from "@/libs/react-query/mutations/useBanUser";
import { useDeleteUser } from "@/libs/react-query/mutations/useDeleteUser";
import { useUnbanUser } from "@/libs/react-query/mutations/useUnbanUser";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { BsUnlock } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCaretDown } from "react-icons/rx";

export default function AdminUserAction({ userID, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { back } = useRouter();
  const { getToken } = useAuth();
  const { mutateAsync: banUser, isPending: banPending } = useBanUser();
  const { mutateAsync: unbanUser, isPending: unbanPending } = useUnbanUser();
  const { mutateAsync: deleteUser, isPending: deletePending } = useDeleteUser();

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
  // Handle ban User
  async function handleBanUser() {
    const token = await getToken();
    await banUser({ userID, token });
    setIsOpen(false);
  }
  // Handle Unban User
  async function handleUnbanUser() {
    const token = await getToken();
    await unbanUser({ userID, token });
    setIsOpen(false);
  }
  // Handle Delete User
  async function handleDeleteUser() {
    const token = await getToken();
    await deleteUser({ userID, token });
    back();
    setIsOpen(false);
  }

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
          {user.banned ? (
            <button
              disabled={banPending}
              onClick={() => handleUnbanUser()}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <BsUnlock />
              <span className="text-sm font-semibold">Unban user</span>
            </button>
          ) : (
            <button
              disabled={banPending}
              onClick={() => handleBanUser()}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <FaBan />
              <span className="text-sm font-semibold">Ban user</span>
            </button>
          )}
          <button
            disabled={deletePending}
            onClick={() => handleDeleteUser()}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
          >
            <MdDelete />
            <span className="text-sm font-semibold">Delete user</span>
          </button>
        </div>
      )}
    </div>
  );
}
