import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const unbanUser = async ({ userID, token }) => {
  const res = await fetch(`/api/users/${userID}/unban?userID=${userID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to unban user");

  return data;
};

export const useUnbanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      toast.success("✅ User Unban successfully");
      queryClient.invalidateQueries(["Users"]); // Refetch users
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
