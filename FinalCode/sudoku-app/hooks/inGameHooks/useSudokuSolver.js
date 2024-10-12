import { useCallback } from "react";
import SudokuSolver from "../../algorithms/sudokuSolver";

// managing the solving functionality
export const useSudokuSolver = (grid) => {
  const solvePuzzle = useCallback(() => {
    // convert the grid into a 9x9 array expected by SudokuSolver
    const currentGrid = grid.reduce(
      (acc, cell, index) => {
        const row = Math.floor(index / 9);
        const value = parseInt(cell.value, 10) || 0; // convert to num or 0 if empty
        acc[row].push(value); // push the value to the current row
        return acc;
      },
      Array.from({ length: 9 }, () => [])
    ); // initialise an array with 9 empty rows

    // debugging line, uncomment to see the grid for the solver in the console
    // console.log("Grid for Solver:", currentGrid);

    const solver = new SudokuSolver(currentGrid);
    const autoSolved = solver.solveSudoku();

    // debugging line, uncomment to see the autoSolved grid in the console
    // console.log("Solver Grid:", solver.grid);

    if (autoSolved) {
      // transform the autoSolved grid back into the GUI grid format
      const newGrid = solver.grid.flat().map((num, index) => ({
        value: String(num),
        locked: true, // lock all cells since the puzzle is autoSolved
        filledBySolver: grid[index].value === "", // mark cells filled by the solver
        correct: true, // all cells are correct because the puzzle is autoSolved
      }));
      // setGrid(newGrid);
      return { autoSolved: true, newGrid };
    } else {
      return { autoSolved: false };
    }
  }, [grid]); // update the grid state

  return { solvePuzzle }; // return the function to be used in the component
};
