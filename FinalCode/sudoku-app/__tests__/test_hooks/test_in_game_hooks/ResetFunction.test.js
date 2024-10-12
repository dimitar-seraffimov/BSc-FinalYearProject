import { renderHook, act } from "@testing-library/react-hooks/native";
import { useHintPad } from "../../../hooks/inGameHooks/useHintPad";

describe("useHintPad with handleRestart functionality", () => {
  // setting an initial grid state
  const initialGrid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];

  const newGrid = initialGrid.map((cell) => ({ ...cell, correct: true }));

  // mock functions for setGrid and setHistory
  let setGrid, setHistory;

  beforeEach(() => {
    setGrid = jest.fn();
    setHistory = jest.fn();
  });

  test("handleRestart function resets grid and history to initial state", () => {
    const { result } = renderHook(() =>
      useHintPad({
        initialGrid: [...newGrid], // revert to initial grid state
        setGrid,
        setHistory,
        history: [newGrid], // history reset to initial grid state
      })
    );

    act(() => {
      result.current.handleRestart();
    });

    expect(setGrid).toHaveBeenCalledWith(newGrid);
    expect(setHistory).toHaveBeenCalledWith([newGrid]);
  });
});
