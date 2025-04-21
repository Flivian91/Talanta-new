import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const updateCategory = async ({ token, payload, talentID }) => {
  const res = await fetch(`/api/categories/${talentID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to update Category");
  return data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("✅ Category updated successfully");
      queryClient.invalidateQueries(["Categories"]);
    },
    onError: (err) => {
      toast.error(`❌ ${err.message}`);
    },
  });
};
