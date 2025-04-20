// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchTalentsCount = async () => {
  const res = await fetch("/api/talents/count");

  if (!res.ok) throw new Error("Failed to fetch talents");

  return await  res.json();
};

export const useTalentsCOunt = () => {
  return useQuery({
    queryKey: ["TalentsCount"],
    queryFn: fetchTalentsCount,
  });
};
