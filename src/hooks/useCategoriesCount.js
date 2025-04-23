import { useQuery } from "@tanstack/react-query";

const fetchCategoriesCount = async () => {
  const res = await fetch("/api/categories/count");

  if (!res.ok) throw new Error("Failed to fetch Categories Count");

  return await res.json();
};

export const useCategoriesCount = () => {
  return useQuery({
    queryKey: ["UserCount"],
    queryFn: fetchCategoriesCount,
  });
};
