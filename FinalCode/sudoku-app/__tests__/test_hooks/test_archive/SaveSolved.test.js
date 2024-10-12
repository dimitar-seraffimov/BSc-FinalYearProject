import { renderHook, act } from "@testing-library/react-hooks";
import { useManuallySolved } from "../../../hooks/useGamesArchive/useManuallySolved";
import { saveSolvedGames } from "../../../utils/saveSolvedGames";

// mock the external module
jest.mock("../../../utils/saveSolvedGames", () => ({
  saveSolvedGames: jest.fn(),
}));

describe("useManuallySolved", () => {
  beforeEach(() => {
    // clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should handle a correctly solved puzzle", () => {
    const mockHandleOutcome = jest.fn();
    const puzzleId = "puzzle-123";
    const level = "medium";
    const timeTrack = "10:00";
    const solutionGrid = ["1", "2", "3"]; // simple example
    const currentGrid = solutionGrid.map((value) => ({ value }));

    const { result } = renderHook(() =>
      useManuallySolved(
        currentGrid,
        solutionGrid,
        1, // historyLength > 0
        mockHandleOutcome,
        puzzleId,
        level,
        timeTrack
      )
    );

    // assert saveSolvedGames was called correctly
    expect(saveSolvedGames).toHaveBeenCalledWith(
      puzzleId,
      level,
      timeTrack,
      solutionGrid
    );
    // assert handleOutcome was called with success
    expect(mockHandleOutcome).toHaveBeenCalledWith({
      success: true,
      message: expect.any(String),
    });
  });

  it("should handle an incorrectly solved puzzle", () => {
    const mockHandleOutcome = jest.fn();
    const currentGrid = [{ value: "1" }, { value: "2" }, { value: "wrong" }]; // one wrong value
    const solutionGrid = ["1", "2", "3"];
    const historyLength = 1; // non-zero history length

    const { result } = renderHook(() =>
      useManuallySolved(
        currentGrid,
        solutionGrid,
        historyLength,
        mockHandleOutcome,
        "puzzle-123",
        "medium",
        "10:00"
      )
    );

    // assert handleOutcome was called with failure
    expect(mockHandleOutcome).toHaveBeenCalledWith({
      success: false,
      message: expect.any(String),
    });
  });
});
