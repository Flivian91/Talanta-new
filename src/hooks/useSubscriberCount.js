import { useQuery } from "@tanstack/react-query";

const fetchSubscriberCount = async () => {
  const res = await fetch("/api/follow/count");

  if (!res.ok) throw new Error("Failed to fetch Subscriber Count");

  return await  res.json();
};

export const useTalentsCOunt = () => {
  return useQuery({
    queryKey: ["SubscriberCount"],
    queryFn: fetchSubscriberCount,
  });
};
