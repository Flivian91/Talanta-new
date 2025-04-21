import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteCategory = async ({ categoryID, token }) => {
  console.log(categoryID);

  const res = await fetch(`/api/categories/${categoryID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to delete Category");

  return data;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("✅ Category deleted successfully");
      queryClient.invalidateQueries(["Categories"]); // Refetch users
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
