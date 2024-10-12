import { renderHook, act } from "@testing-library/react-hooks";
import { useNumberPad } from "../../../hooks/inGameHooks/useNumberPad";

describe("useNumberPad", () => {
  // setting up mock functions
  const setSelectedNumber = jest.fn();
  const updateGridAndHistory = jest.fn();

  beforeEach(() => {
    // clear mocks before each test
    jest.clearAllMocks();
  });

  test("updates selected number and grid for a non-locked cell", () => {
    const { result } = renderHook(() =>
      useNumberPad(setSelectedNumber, updateGridAndHistory)
    );

    const mockGrid = [{ value: "", locked: false }];
    const mockHistory = [];

    act(() => {
      result.current.handleNumberPadSelection("1", 0, mockGrid, mockHistory);
    });

    // checking if the selected number is updated
    expect(setSelectedNumber).toHaveBeenCalledWith("1");
    // checking if the grid is updated correctly
    expect(updateGridAndHistory).toHaveBeenCalledWith(
      [{ value: "1", locked: false }],
      mockHistory
    );
  });

  test("clears cell value when 'X' is selected for a non-locked cell", () => {
    const { result } = renderHook(() =>
      useNumberPad(setSelectedNumber, updateGridAndHistory)
    );

    const mockGrid = [{ value: "1", locked: false }];
    const mockHistory = [];

    act(() => {
      result.current.handleNumberPadSelection("X", 0, mockGrid, mockHistory);
    });

    // 'X' action clears cell value
    expect(setSelectedNumber).toHaveBeenCalledWith("X");
    // cell value is cleared in the grid
    expect(updateGridAndHistory).toHaveBeenCalledWith(
      [{ value: "", locked: false }],
      mockHistory
    );
  });

  test("does not update grid for a locked cell and clears selected number", () => {
    const { result } = renderHook(() =>
      useNumberPad(setSelectedNumber, updateGridAndHistory)
    );

    const mockGrid = [{ value: "1", locked: true }];
    const mockHistory = [];

    act(() => {
      result.current.handleNumberPadSelection("2", 0, mockGrid, mockHistory);
    });

    // checking if the selected number is cleared
    expect(setSelectedNumber).toHaveBeenCalledWith(null);
    // checking that the grid and history are not updated
    expect(updateGridAndHistory).not.toHaveBeenCalled();
  });
});
