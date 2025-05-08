import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function createComments({ token, talentID, text, user }) {

  
  const response = await fetch(`/api/comments?talentID=${talentID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({text, user}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create comment");
  return data;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComments,
    onSuccess: (mes) => {
      toast.success(mes.message);
      queryClient.invalidateQueries(["Comments"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
