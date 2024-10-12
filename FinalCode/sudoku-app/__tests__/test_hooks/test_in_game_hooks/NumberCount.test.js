import { renderHook } from "@testing-library/react-hooks";
import { useNumberCounts } from "../../../hooks/inGameHooks/useNumberCounts";

describe("useNumberCounts", () => {
  test("correctly calculates remaining numbers count", () => {
    const initialGrid = [
      { value: "1" },
      { value: "2" },
      { value: "" },
      { value: "2" },
      { value: "3" },
      { value: "" },
      { value: "3" },
      { value: "1" },
      { value: "" },
    ];

    // render the hook with the initial grid
    const { result } = renderHook(() => useNumberCounts(initialGrid));

    // expected counts: 7 ones, 7 twos, 7 threes, and 9 of each 4-9 since they are not used
    expect(result.current).toEqual([7, 7, 7, 9, 9, 9, 9, 9, 9]);
  });

  test("returns the same counts if the grid does not change", () => {
    const initialGrid = [
      { value: "1" },
      { value: "2" },
      { value: "" },
      { value: "2" },
      { value: "3" },
      { value: "" },
      { value: "3" },
      { value: "1" },
      { value: "" },
    ];

    // render the hook and get the initial counts
    const { result, rerender } = renderHook(() => useNumberCounts(initialGrid));
    const initialCounts = result.current;

    // rerender with the same grid to check memorisation
    rerender();

    // check that the memoised value was returned
    expect(result.current).toBe(initialCounts);
  });

  test("recalculates counts when the grid changes", () => {
    const initialGrid = [
      { value: "1" },
      { value: "2" },
      { value: "" },
      { value: "2" },
      { value: "3" },
      { value: "" },
      { value: "3" },
      { value: "1" },
      { value: "" },
    ];

    const updatedGrid = [
      ...initialGrid.slice(0, -1), // all but the last element of the initial grid
      { value: "4" }, // change the last cell to a "4"
    ];

    // render the hook with the initial grid
    const { result, rerender } = renderHook(
      ({ grid }) => useNumberCounts(grid),
      {
        initialProps: { grid: initialGrid },
      }
    );

    // rerender with the updated grid
    rerender({ grid: updatedGrid });

    // expect one less "4" available
    expect(result.current).toEqual([7, 7, 7, 8, 9, 9, 9, 9, 9]);
  });
});
