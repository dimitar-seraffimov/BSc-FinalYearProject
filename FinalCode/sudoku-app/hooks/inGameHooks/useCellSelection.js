import { useState } from "react";

// managing the cell selection logic
export const useCellSelection = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);

  // only handles the selection logic, does not directly manipulate the grid
  const handleSelectCell = (cellId, cellValue, isLocked) => {
    setSelectedCell(cellId);

    if (cellValue) {
      setSelectedNumber(cellValue);
    } else if (isLocked) {
      setSelectedNumber(null);
    }
  };

  return { selectedCell, selectedNumber, handleSelectCell, setSelectedNumber };
};
