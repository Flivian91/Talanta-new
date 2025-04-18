import { useBanUser } from "@/libs/react-query/mutations/useBanUser";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { FaBan } from "react-icons/fa";

function AdminBanUser({ userID }) {
  const { getToken } = useAuth();
  const { mutateAsync: banUser, isPending } = useBanUser();

  const handleBanUser = async (userID) => {
    const token = await getToken();
    await banUser({ userID, token });
  };
  return (
    <button
      onClick={() => handleBanUser(userID)}
      disabled={isPending}
      data-tooltip-id="user-actions-tooltip"
      data-tooltip-content="Ban User"
      className="flex items-center p-2 text-lg gap-2 text-red-600 hover:bg-accent/20 rounded disabled:cursor-not-allowed"
    >
      <FaBan />
    </button>
  );
}

export default AdminBanUser;
