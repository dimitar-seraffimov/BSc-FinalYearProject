import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveSolvedGames } from "../../utils/saveSolvedGames";

// mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("saveSolvedGames", () => {
  const mockPuzzleId = "3";
  const mockLevel = "Hard";
  const mockTimeTrack = "02:31";
  const mockSolutionGrid = [
    [3, 1, 6, 5, 7, 8, 4, 9, 2],
    [5, 2, 9, 1, 3, 4, 7, 6, 8],
    [4, 8, 7, 6, 2, 9, 5, 3, 1],
    [2, 6, 3, 4, 1, 5, 9, 8, 7],
    [9, 7, 4, 8, 6, 3, 1, 2, 5],
    [8, 5, 1, 7, 9, 2, 6, 4, 3],
    [1, 3, 8, 9, 4, 7, 2, 5, 6],
    [6, 9, 2, 3, 5, 1, 8, 7, 4],
    [7, 4, 5, 2, 8, 6, 3, 1, 9],
  ];

  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it("successfully saves a solved game", async () => {
    AsyncStorage.getItem.mockResolvedValue(null); // assume no existing solved games

    await saveSolvedGames(
      mockPuzzleId,
      mockLevel,
      mockTimeTrack,
      mockSolutionGrid
    );

    // check that setItem was called with the expected data
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "solvedGames",
      expect.stringContaining(mockPuzzleId) // check if puzzleId is in the saved data
    );
  });

  it("adds a solved game to existing solved games", async () => {
    // simulate existing solved games
    const existingSolvedGames = [
      {
        puzzleId: "2",
        level: "Medium",
        timeTrack: "04:24",
        solutionGrid: [
          [3, 1, 6, 5, 7, 8, 4, 9, 2],
          [5, 2, 9, 1, 3, 4, 7, 6, 8],
          [4, 8, 7, 6, 2, 9, 5, 3, 1],
          [2, 6, 3, 4, 1, 5, 9, 8, 7],
          [9, 7, 4, 8, 6, 3, 1, 2, 5],
          [8, 5, 1, 7, 9, 2, 6, 4, 3],
          [1, 3, 8, 9, 4, 7, 2, 5, 6],
          [6, 9, 2, 3, 5, 1, 8, 7, 4],
          [7, 4, 5, 2, 8, 6, 3, 1, 9],
        ],
        solvedDate: "21 / 03 / 2024",
      },
    ];

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingSolvedGames));

    await saveSolvedGames(
      mockPuzzleId,
      mockLevel,
      mockTimeTrack,
      mockSolutionGrid
    );

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "solvedGames",
      expect.stringContaining(mockPuzzleId) // if new game is added with the existing one
    );
  });

  it("handles error when saving a solved game", async () => {
    // simulate an error
    AsyncStorage.setItem.mockRejectedValue(new Error("AsyncStorage error"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await saveSolvedGames(
      mockPuzzleId,
      mockLevel,
      mockTimeTrack,
      mockSolutionGrid
    );

    // console.error called due to the simulated error
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error saving solved game:",
      expect.any(Error)
    );

    consoleSpy.mockRestore(); // restore original console.error
  });
});
