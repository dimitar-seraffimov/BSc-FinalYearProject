import { useCallback } from "react";

// hook to handle the hint pad logic
export const useHintPad = ({ initialGrid, setGrid, history, setHistory }) => {
  // function to restart the puzzle
  const newGrid = initialGrid.map((cell) => ({ ...cell, correct: true })); // reset the grid to it's initial state
  const handleRestart = useCallback(() => {
    setGrid([...newGrid]); // reset the grid state
    setHistory([newGrid]); //reset to initial grid state
  }, [newGrid, setGrid, setHistory]);

  // function for the step back button
  const handleStepBack = useCallback(() => {
    // if more then one input has been made
    if (history.length >= 2) {
      const newHistory = history.slice(0, -1);
      setGrid(newHistory[newHistory.length - 1]); // update the grid state
      setHistory(newHistory); // update the history
    } else {
      // in case the user goes back after the first input
      // history.length === 2, including the initial state and one user action
      setGrid([...newGrid]); // reset the grid to it's initial state
      setHistory([newGrid]); //reset to initial grid state
    }
  }, [newGrid, setGrid, history, setHistory]);

  return { handleRestart, handleStepBack };
};
