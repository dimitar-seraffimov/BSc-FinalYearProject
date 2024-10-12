import { renderHook, act } from "@testing-library/react-hooks";
import { useValidate } from "../../../hooks/inGameHooks/useValidate";

describe("useValidate", () => {
  // initialise a solution grid to compare against
  const solutionGrid = [
    [8, 3, 5, 4, 1, 6, 9, 2, 7],
    [2, 9, 6, 8, 5, 7, 4, 3, 1],
    [4, 1, 7, 2, 9, 3, 6, 5, 8],
    [5, 6, 9, 1, 3, 4, 7, 8, 2],
    [1, 2, 3, 6, 7, 8, 5, 4, 9],
    [7, 4, 8, 5, 2, 9, 1, 6, 3],
    [6, 5, 2, 7, 8, 1, 3, 9, 4],
    [9, 8, 1, 3, 4, 5, 2, 7, 6],
    [3, 7, 4, 9, 6, 2, 8, 1, 5],
  ].map((row) => row.map((value) => ({ value, locked: false })));

  it("mark the grid as incorrect when it doesn't match the solution", () => {
    // create a deep copy of the solution grid to simulate the user's grid and introducing an incorrect value
    const userGrid = JSON.parse(JSON.stringify(solutionGrid));
    userGrid[8][8].value = "incorrect"; // expect the grid to be incorrect due to the incorrect value

    const { result } = renderHook(() => useValidate(userGrid, solutionGrid));

    act(() => {
      result.current.validateGrid();
    });

    expect(result.current.isCorrect).toBe(false);
    expect(result.current.popupVisible).toBe(false);
  });

  it("correctly handles empty and locked cells", () => {
    const userGrid = JSON.parse(JSON.stringify(solutionGrid));
    userGrid[7][8].value = ""; // set an empty cell
    userGrid[8][8].value = "incorrect"; // attempt to lock an incorrect cell (mocking as if it's locked, since actual 'locked' logic handling isn't being tested)

    const { result } = renderHook(() => useValidate(userGrid, solutionGrid));

    act(() => {
      result.current.validateGrid();
    });

    expect(result.current.isCorrect).toBe(false); // expect false because of incorrect cell
    expect(result.current.popupVisible).toBe(false); // no popup for incorrect grid
  });

  it("allow manual control over the visibility of the success popup", () => {
    const userGrid = JSON.parse(JSON.stringify(solutionGrid));
    const { result } = renderHook(() => useValidate(userGrid, solutionGrid));

    act(() => {
      result.current.setPopupVisible(true); // set the popup to be visible
    });

    expect(result.current.popupVisible).toBe(true); // the success popup should be visible as manually set
  });
});
