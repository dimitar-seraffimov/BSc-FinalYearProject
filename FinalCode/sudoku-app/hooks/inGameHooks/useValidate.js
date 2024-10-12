import { useState, useCallback } from "react";

// managing the validation logic
export const useValidate = (grid, solutionGrid) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);

  const validateGrid = useCallback(() => {
    let allCorrect = true; // assume all inputs are correct initially

    const newGrid = grid.map((cell, index) => {
      const userValue = String(cell.value);
      const solutionValue = String(solutionGrid[index]);
      // if the cell's value matches the solution grid's value
      const isCorrect =
        cell.locked || cell.value === "" || userValue === solutionValue;

      if (!isCorrect) {
        allCorrect = false; // if any cell is incorrect, update allCorrect
      }

      return { ...cell, correct: isCorrect }; // update the cell's "correct" property
    });

    setIsCorrect(allCorrect);
    setPopupVisible(allCorrect); // if all inputs are correct, show a success popup message

    return newGrid; // returns the new grid for the component to update state
  }, [grid, solutionGrid]);

  return { isCorrect, popupVisible, validateGrid, setPopupVisible };
};
