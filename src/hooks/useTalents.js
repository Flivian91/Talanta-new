// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchTalents = async ({ queryKey }) => {
  const [_key, { limit, page }] = queryKey;


  const params = new URLSearchParams();
  if (limit) params.append("limit", limit);
  if (page) params.append("page", page);

  const res = await fetch(`/api/talents?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch talents");
  return await  res.json();
};

export const useTalents = (filters) => {
  return useQuery({
    queryKey: ["Talents", filters],
    queryFn: fetchTalents,
  });
};
