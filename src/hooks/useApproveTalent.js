// src/hooks/useApproveTalent.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const approveTalent = async ({ id, token }) => {
  
  const res = await fetch(`/api/talents/${id}/approved-talents`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to approve talent");
  return data;
};

export const useApproveTalent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveTalent,
    onSuccess: () => {
      toast.success("✅ Talent approved!");
      queryClient.invalidateQueries(["Talents"]);
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
