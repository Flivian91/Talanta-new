// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchSingleTalent = async ({ queryKey }) => {
  const [_key, talentID] = queryKey;

  const res = await fetch(`/api/talents/${talentID}`);

  if (!res.ok) throw new Error("Failed to fetch talent");

  return await res.json();
};

export const useSingleTalent = (talentID) => {
  return useQuery({
    queryKey: ["SingleTalent", talentID],
    queryFn: fetchSingleTalent,
  });
};
