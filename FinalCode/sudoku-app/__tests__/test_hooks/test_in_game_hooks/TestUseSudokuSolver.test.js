import { renderHook, act } from "@testing-library/react-hooks";
import { useSudokuSolver } from "../../../hooks/inGameHooks/useSudokuSolver";
import SudokuSolver from "../../../algorithms/sudokuSolver";

// mocking the SudokuSolver class to simulate its behavior without executing its real logic
jest.mock("../../../algorithms/sudokuSolver", () => {
  return jest.fn().mockImplementation(() => ({
    solveSudoku: jest.fn(() => true), // pretending solveSudoku method always successfully solves the puzzle
    grid: Array(9).fill(Array(9).fill(1)), // returning a mock solved grid filled with 1s
  }));
});

describe("useSudokuSolver", () => {
  // redefining the mock for SudokuSolver to ensure a fresh mock implementation for each test
  beforeEach(() => {
    SudokuSolver.mockImplementation(() => ({
      solveSudoku: jest.fn(() => true), // mock successful solving scenario
      grid: Array(9)
        .fill(null)
        .map(() => Array(9).fill(1)), // ensure each row is a separate array instance
    }));
  });

  test("successfully solves a puzzle and updates the grid format", () => {
    // set up an initial grid with the first row filled and the rest empty
    const initialGrid = Array.from({ length: 81 }, (_, i) => ({
      value: i < 9 ? "1" : "", // simulate user input in the first row
      locked: false,
    }));

    // use the hook with the initial grid
    const { result } = renderHook(() => useSudokuSolver(initialGrid));

    let solved = {};
    act(() => {
      solved = result.current.solvePuzzle(); // execute the solvePuzzle function
    });

    // verify the puzzle was marked as successfully solved
    expect(solved.autoSolved).toBe(true);
    // check the new grid format matches expectations
    expect(solved.newGrid).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: expect.any(String),
          locked: true,
          filledBySolver: expect.any(Boolean),
          correct: true,
        }),
      ])
    );
    // ensure each cell in the new grid is as expected, considering solver marks
    solved.newGrid.forEach((cell, index) => {
      expect(cell).toEqual({
        value: "1",
        locked: true,
        filledBySolver: index >= 9, // consider cells beyond the first row as filled by the solver
        correct: true,
      });
    });
  });

  test("returns autoSolved as false when puzzle cannot be solved", () => {
    // adjust the mock to simulate a scenario where the puzzle cannot be solved
    SudokuSolver.mockImplementation(() => ({
      solveSudoku: jest.fn(() => false), // simulation of a failed solve attempt
    }));

    // prepare an empty initial grid
    const initialGrid = Array.from({ length: 81 }, () => ({
      value: "",
      locked: false,
    }));

    // use the hook with the empty grid
    const { result } = renderHook(() => useSudokuSolver(initialGrid));

    let solved = {};
    act(() => {
      solved = result.current.solvePuzzle(); // trying to solve the unsolvable puzzle
    });

    // confirm the puzzle is reported as unsolved
    expect(solved.autoSolved).toBe(false);
    // verify no new grid is generated for an unsolvable puzzle
    expect(solved.newGrid).toBeUndefined();
  });
});
