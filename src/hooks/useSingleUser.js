// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchSingleUser = async ({ queryKey }) => {
  const [_key, token, userID] = queryKey;

  const res = await fetch(`/api/users/${userID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(await res.json());
  if (!res.ok) throw new Error("Failed to Get User");
  
  return await res.json();
};

export const useSingleUser = (token, userID) => {
  return useQuery({
    queryKey: ["TalentsCount", token, userID],
    queryFn: fetchSingleUser,
  });
};
