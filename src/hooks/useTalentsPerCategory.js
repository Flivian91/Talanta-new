import { useQuery } from "@tanstack/react-query";

const fetchTalentsPerCategory = async () => {
  const res = await fetch("/api/stats/talents-per-category");

  if (!res.ok) throw new Error("Failed to fetch talents Per Category");

  return await res.json();
};

export const useTalentsPerCategory = () => {
  return useQuery({
    queryKey: ["TalentsPerCategory"],
    queryFn: fetchTalentsPerCategory,
  });
};
