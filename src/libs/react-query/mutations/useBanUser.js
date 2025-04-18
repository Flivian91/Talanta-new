import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const banUser = async ({ userID, token }) => {
  const res = await fetch(`/api/users/${userID}/ban?userID=${userID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to ban user");

  return data;
};

export const useBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      toast.success("✅ User Ban successfully");
      queryClient.invalidateQueries(["Users"]); // Refetch users
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
