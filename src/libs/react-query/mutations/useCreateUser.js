// src/lib/react-query/mutations/useCreateUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


const createUser = async ({ user, token }) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create user");
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("✅ User created successfully!");
      queryClient.invalidateQueries(["Users"]); // This will refetch users
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
