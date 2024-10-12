import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveGameState } from "../../utils/gameStateUtils";

// mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

describe("saveGameState", () => {
  // reset mock calls before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("correctly serialises and saves the game state to AsyncStorage", async () => {
    const mockGameState = {
      initialGrid: [
        [3, 1, 0, 5, 7, 0, 4, 0, 2],
        [0, 2, 9, 0, 0, 4, 0, 6, 8],
        [4, 8, 0, 6, 2, 9, 5, 0, 1],
        [0, 0, 3, 0, 1, 5, 9, 8, 7],
        [9, 7, 4, 8, 6, 0, 1, 0, 5],
        [0, 0, 1, 7, 9, 2, 6, 4, 3],
        [0, 3, 8, 0, 4, 7, 0, 0, 6],
        [6, 9, 0, 3, 0, 1, 8, 7, 4],
        [7, 4, 5, 0, 8, 0, 3, 1, 0],
      ],
      currentGrid: [
        [3, 1, 0, 5, 7, 0, 4, 0, 2],
        [0, 2, 9, 0, 0, 4, 0, 6, 8],
        [4, 8, 0, 6, 2, 9, 5, 0, 1],
        [0, 0, 3, 0, 1, 5, 9, 8, 7],
        [9, 7, 4, 8, 6, 0, 1, 0, 5],
        [0, 0, 1, 7, 9, 2, 6, 4, 3],
        [0, 3, 8, 0, 4, 7, 0, 0, 6],
        [6, 9, 0, 3, 0, 1, 8, 7, 4],
        [7, 4, 5, 0, 8, 0, 3, 1, 0],
      ],
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
      level: "Easy",
      puzzleId: "1",
      timeTrack: "00:02:30",
    };

    // saveGameState with the mock game state
    await saveGameState(
      mockGameState.initialGrid,
      mockGameState.currentGrid,
      mockGameState.solutionGrid,
      mockGameState.level,
      mockGameState.puzzleId,
      mockGameState.timeTrack
    );

    // verify AsyncStorage.setItem was called with the correct key and serialised game state
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "gameState",
      JSON.stringify(mockGameState)
    );
  });
});
