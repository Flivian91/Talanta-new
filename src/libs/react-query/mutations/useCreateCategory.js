import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createCategory = async ({ category, token }) => {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create Category");
  return data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("✅ Category created successfully!");
      queryClient.invalidateQueries(["Categories"]); // This will refetch users
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
