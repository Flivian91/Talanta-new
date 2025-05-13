import { useQuery } from "@tanstack/react-query";

async function fetchTopLikedTalents() {
  const res = await fetch("/api/stats/most-liked-talents");

  if (!res.ok) throw new Error("Failed to fetch Most Liked Talents");
  return await res.json();
}

export const useTopLikedTalents = () => {
  return useQuery({
    queryFn: fetchTopLikedTalents,
    queryKey: ["Top Liked Talents"],
  });
};
