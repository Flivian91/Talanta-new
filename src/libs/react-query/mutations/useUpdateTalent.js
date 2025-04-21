import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const updateTalent = async ({ token, payload, talentID }) => {
  const res = await fetch(`/api/talents/${talentID}`, {
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

export const useUpdateTalent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTalent,
    onSuccess: () => {
      toast.success("✅ Talent updated successfully");
      queryClient.invalidateQueries(["Talents"]);
    },
    onError: (err) => {
      toast.error(`❌ ${err.message}`);
    },
  });
};
