import { useQuery } from "@tanstack/react-query";

const fetchUserPerMonth = async () => {
  const res = await fetch("/api/stats/user-per-month");

  if (!res.ok) throw new Error("Failed to fetch User Per Month");

  return await res.json();
};

export const useUserPerMonth = () => {
  return useQuery({
    queryKey: ["UserPerMonth"],
    queryFn: fetchUserPerMonth,
  });
};
