// src/hooks/useApproveTalent.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteTalent = async ({ id, token }) => {
  const res = await fetch(`/api/talents/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete talent");
  return data;
};

export const useDeleteTalent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTalent,
    onSuccess: () => {
      toast.success("✅ Talent deleted Successfully!!");
      queryClient.invalidateQueries(["Talents"]);
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
