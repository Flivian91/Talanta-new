import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const likeTalent = async ({ talentID, token, userID }) => {

  const res = await fetch(`/api/likes?userID=${userID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({talentID}),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to Like Talent");
  }

  return data;
};

export const useLikeTalent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likeTalent,
    onSuccess: (mes) => {
      toast.success(mes.message);
      queryClient.invalidateQueries(["Like"]); //  you have a followers query
    },
    onError: (error) => {
      toast.error(`❌ ${error.message}`);
    },
  });
};
