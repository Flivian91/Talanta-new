import { useQuery } from "@tanstack/react-query";

const fetchRejectedTalentsCount = async () => {
  const res = await fetch(`/api/talents/rejected-count`);

  if (!res.ok) throw new Error("Failed to fetch Rejected Talents Count");

  return await res.json();
};

export const useRejectedTalentsCount = () => {
  return useQuery({
    queryKey: ["RejectedTalentsCount"],
    queryFn: fetchRejectedTalentsCount,
  });
};
