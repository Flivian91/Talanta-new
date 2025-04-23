import { useQuery } from "@tanstack/react-query";

const fetchApprovedTalentsCount = async () => {
  const res = await fetch(`/api/talents/approved-count`);

  if (!res.ok) throw new Error("Failed to fetch Approved Talents Count");

  return await res.json();
};

export const useApprovedTalentsCount = () => {
  return useQuery({
    queryKey: ["ApprovedTalentsCount"],
    queryFn: fetchApprovedTalentsCount,
  });
};
