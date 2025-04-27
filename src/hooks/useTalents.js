// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchTalents = async ({ queryKey }) => {
  const [_key, { limit, page, status }] = queryKey;
  

  const params = new URLSearchParams();
  if (limit) params.append("limit", limit);
  if (page) params.append("page", page);
  if (status) params.append("status", status);


  const res = await fetch(`/api/talents?${params.toString()}`);
  console.log(res)

  if (!res.ok) throw new Error("Failed to fetch talents");
  return await res.json();
};

export const useTalents = (filters) => {
  return useQuery({
    queryKey: ["Talents", filters],
    queryFn: fetchTalents,
  });
};
