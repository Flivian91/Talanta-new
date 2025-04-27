import { useMemo } from "react";

const useFilteredTalents = (allTalents, selectedCategory) => {
  const filteredTalents = useMemo(() => {
    if (selectedCategory === "All") {
      return allTalents;
    }
    return allTalents.filter((talent) => talent.category.includes(selectedCategory));
  }, [allTalents, selectedCategory]);

  return filteredTalents;
};

export default useFilteredTalents;
