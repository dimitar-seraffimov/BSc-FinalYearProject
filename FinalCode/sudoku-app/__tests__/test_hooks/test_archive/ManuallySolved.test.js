import { renderHook, act } from "@testing-library/react-hooks";
import { useManuallySolved } from "../../../hooks/useGamesArchive/useManuallySolved";
import { saveSolvedGames } from "../../../utils/saveSolvedGames";

// mock the saveSolvedGames utility function to prevent actual API calls and to track its calls
jest.mock("../../../utils/saveSolvedGames", () => ({
  saveSolvedGames: jest.fn(),
}));

describe("useManuallySolved", () => {
  // setup function to initialize the hook for each test, mocking necessary parameters and the handleOutcome callback
  const setup = (
    currentGrid,
    solutionGrid,
    historyLength,
    puzzleId,
    level,
    timeTrack
  ) => {
    const handleOutcome = jest.fn();
    const { result } = renderHook(() =>
      useManuallySolved(
        currentGrid,
        solutionGrid,
        historyLength,
        handleOutcome,
        puzzleId,
        level,
        timeTrack
      )
    );
    return { result, handleOutcome };
  };

  it("call handleOutcome with success for a correctly solved puzzle", () => {
    // defining a correctly solved puzzle scenario
    const currentGrid = [{ value: "1" }];
    const solutionGrid = ["1"];
    // using the setup function with the correct scenario parameters
    const { handleOutcome } = setup(
      currentGrid,
      solutionGrid,
      1, // historyLength indicating at least one move made
      "puzzleId",
      "easy",
      "2m"
    );

    // triggers any useEffects in the hook
    act(() => {});

    // expect handleOutcome to be called with a success message
    expect(handleOutcome).toHaveBeenCalledWith({
      success: true,
      message: `Well done! \n You solved level easy for 2m.`,
    });
    // expect saveSolvedGames to be called with correct arguments
    expect(saveSolvedGames).toHaveBeenCalledWith(
      "puzzleId",
      "easy",
      "2m",
      solutionGrid
    );
  });

  it("call handleOutcome with failure for an incorrectly solved puzzle", () => {
    // defining an incorrectly solved puzzle scenario
    const currentGrid = [{ value: "1" }];
    const solutionGrid = ["2"];
    // using the setup function with the incorrect scenario parameters
    const { handleOutcome } = setup(
      currentGrid,
      solutionGrid,
      1, // historyLength indicating at least one move made
      "puzzleId",
      "easy",
      "2m"
    );

    // triggers any useEffects in the hook
    act(() => {});

    // expect handleOutcome to be called with a failure message
    expect(handleOutcome).toHaveBeenCalledWith({
      success: false,
      message: "The puzzle is incorrect! \n Use validate for clues.",
    });
  });
});
