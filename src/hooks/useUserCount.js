import { useQuery } from "@tanstack/react-query";

const fetchUserCount = async () => {
  const res = await fetch("/api/users/count");

  if (!res.ok) throw new Error("Failed to fetch User Count");

  return await res.json();
};

export const useUserCount = () => {
  return useQuery({
    queryKey: ["UserCount"],
    queryFn: fetchUserCount,
  });
};
