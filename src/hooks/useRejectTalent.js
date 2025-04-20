// src/hooks/useApproveTalent.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const rejectTalent = async ({ id, token }) => {
  
  const res = await fetch(`/api/talents/${id}/rejected-talents`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to reject talent");
  return data;
};

export const useRejectTalent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectTalent,
    onSuccess: () => {
      toast.warning("Talent marked as pending!");
      queryClient.invalidateQueries(["Talents"]);
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
