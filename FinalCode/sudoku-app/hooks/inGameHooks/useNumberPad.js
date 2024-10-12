import { useCallback } from "react";

// managing the number pad selection logic
export const useNumberPad = (setSelectedNumber, updateGridAndHistory) => {
  const handleNumberPadSelection = useCallback(
    (number, selectedCell, grid, history) => {
      setSelectedNumber(String(number));

      if (selectedCell != null) {
        const cell = grid[selectedCell];
        if (!cell.locked) {
          const newValue = number !== "X" ? String(number) : "";
          const newGrid = [...grid];
          newGrid[selectedCell] = { ...cell, value: newValue };

          // callback to share the logic for updating the grid and history
          updateGridAndHistory(newGrid, history);
        } else {
          // if the selected cell is locked, clear the previous cell highlighted by the user's click
          setSelectedNumber(null);
        }
      }
    },
    [setSelectedNumber, updateGridAndHistory]
  );

  return { handleNumberPadSelection };
};
