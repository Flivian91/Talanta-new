// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchComments = async ({ queryKey }) => {
  const [_key, { limit, page, talentID }] = queryKey;

  const params = new URLSearchParams();
  if (limit) params.append("limit", limit);
  if (page) params.append("page", page);
  if (talentID) params.append("talentID", talentID);

  const res = await fetch(`/api/comments?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch Comments");
  return await res.json();
};

export const useComments = (filters) => {
  return useQuery({
    queryKey: ["Comments", filters],
    queryFn: fetchComments,
  });
};
