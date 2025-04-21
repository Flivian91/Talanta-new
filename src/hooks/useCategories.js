// hooks/useTalents.js
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await fetch("/api/categories");

  if (!res.ok) throw new Error("Failed to fetch Categories");
  return await res.json();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: fetchCategories,
  });
};
