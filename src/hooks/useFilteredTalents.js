import { useMemo } from "react";

const useFilteredTalents = (allTalents, selectedCategory) => {
  const filteredTalents = useMemo(() => {
    if (selectedCategory === "all") {
      return allTalents;
    }
    return allTalents.filter((talent) => talent.categories.includes(selectedCategory));
  }, [allTalents, selectedCategory]);

  return filteredTalents;
};

export default useFilteredTalents;
