import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const updateProfile = async ({ token, payload, userID }) => {
  const res = await fetch(`/api/users/${userID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("✅ Profile updated successfully");
      queryClient.invalidateQueries(["Users"]);
    },
    onError: (err) => {
      toast.error(`❌ ${err.message}`);
    },
  });
};
