import { renderHook, act } from "@testing-library/react-hooks/native";
import { useHintPad } from "../../../hooks/inGameHooks/useHintPad";

describe("useHintPad with handleStepBack functionality", () => {
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

  const transformGrid = (grid) =>
    grid.map((row) => row.map((value) => ({ value, correct: value !== 0 })));
  const initialGridTransformed = transformGrid(initialGrid);

  // simulate user modifications
  const firstUserInput = [...initialGridTransformed];
  // first input
  firstUserInput[0] = firstUserInput[0].map((cell, index) =>
    index === 1 ? { ...cell, value: 2, correct: true } : cell
  );

  const secondUserInput = [...firstUserInput];
  // second input
  secondUserInput[0] = secondUserInput[0].map((cell, index) =>
    index === 2 ? { ...cell, value: 1, correct: true } : cell
  );

  let setGrid, setHistory;

  beforeEach(() => {
    setGrid = jest.fn();
    setHistory = jest.fn();
  });

  test("handleStepBack reverts to previous state from multiple inputs", () => {
    const historyWithMultipleInputs = [
      initialGridTransformed,
      firstUserInput,
      secondUserInput,
    ];

    const { result } = renderHook(() =>
      useHintPad({
        initialGrid: initialGridTransformed,
        setGrid,
        setHistory,
        history: historyWithMultipleInputs,
      })
    );

    act(() => {
      result.current.handleStepBack();
    });

    // expect grid to revert to the state before the last input
    expect(setGrid).toHaveBeenCalledWith(firstUserInput);
    // expect history to drop the last state
    expect(setHistory).toHaveBeenCalledWith([
      initialGridTransformed,
      firstUserInput,
    ]);
  });

  test("handleStepBack reverts to initial state from a single input", () => {
    const historyWithSingleInput = [initialGridTransformed, firstUserInput];

    const { result } = renderHook(() =>
      useHintPad({
        initialGrid: initialGridTransformed,
        setGrid,
        setHistory,
        history: historyWithSingleInput,
      })
    );

    act(() => {
      result.current.handleStepBack();
    });

    // expect grid to revert to the initial state
    expect(setGrid).toHaveBeenCalledWith(initialGridTransformed);
    // expect history to reset to include only the initial state
    expect(setHistory).toHaveBeenCalledWith([initialGridTransformed]);
  });
});
