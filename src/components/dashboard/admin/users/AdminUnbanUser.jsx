
import { useUnbanUser } from "@/libs/react-query/mutations/useUnbanUser";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { BsUnlock } from "react-icons/bs";

function AdminUnbanUser({ userID }) {
  const { getToken } = useAuth();
  const { mutateAsync: unbanUser, isPending } = useUnbanUser();

  const handleUnbanUser = async (userID) => {
    const token = await getToken();
    await unbanUser({ userID, token });
  };
  return (
    <button
      onClick={() => handleUnbanUser(userID)}
      disabled={isPending}
      data-tooltip-id="user-actions-tooltip"
      data-tooltip-content="Unban User"
      className="flex items-center p-2 text-lg gap-2 text-green-600 hover:bg-accent/20 rounded disabled:cursor-not-allowed"
    >
      <BsUnlock />
    </button>
  );
}

export default AdminUnbanUser;
