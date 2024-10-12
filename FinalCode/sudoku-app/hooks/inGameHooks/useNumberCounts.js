// useMemo to avoid unnecessary re-renders
import { useMemo } from "react";

// hook to manage remaining numbers count logic
// value is recalculated only when the grid changes
export const useNumberCounts = (grid) => {
  // memorise the number counts to avoid unnecessary re-renders
  const numberCounts = useMemo(() => {
    const counts = Array(9).fill(0);
    grid.forEach((cell) => {
      if (cell.value !== "" && !isNaN(cell.value)) {
        counts[parseInt(cell.value, 10) - 1] += 1;
      }
    });
    return counts.map((count) => 9 - count); // how many of each number are left
  }, [grid]);

  return numberCounts;
};
