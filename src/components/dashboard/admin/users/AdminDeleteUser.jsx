import { useDeleteUser } from "@/libs/react-query/mutations/useDeleteUser";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { MdDelete } from "react-icons/md";

function AdminDeleteUser({userID}) {
  const { getToken } = useAuth();
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleDeleteUser = async (userID) => {
    const token = await getToken();
    await deleteUser({ userID, token });
  };
  return (
    <button
    onClick={()=> handleDeleteUser(userID)}
      data-tooltip-id="user-actions-tooltip"
      disabled={isPending}
      data-tooltip-content="Delete User"
      className="flex items-center p-2 text-lg gap-2 text-red-600 hover:bg-accent/20 rounded disabled:cursor-not-allowed"
    >
      <MdDelete />
    </button>
  );
}

export default AdminDeleteUser;
