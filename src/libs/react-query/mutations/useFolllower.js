import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const followUser = async ({ targetUserId, token }) => {

  const res = await fetch(`/api/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({followingID: targetUserId }),
  });

  const data = await res.json();


  if (!res.ok) {
    throw new Error(data.message || "Failed to follow user");
  }

  return data;
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      toast.success("✅ Subscribed successfully!");
      queryClient.invalidateQueries(["Followers"]); // If you have a followers query
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
