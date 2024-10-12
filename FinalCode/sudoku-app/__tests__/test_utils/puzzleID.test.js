import AsyncStorage from "@react-native-async-storage/async-storage";
import { generatePuzzleId } from "../../utils/puzzleIdUtils";

// mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("generatePuzzleId", () => {
  beforeEach(() => {
    // mock console.error to prevent error logs during tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // clear all mocks after each test
    jest.clearAllMocks();
    console.error.mockRestore();
  });

  it("increments puzzle ID correctly when there is a previous ID", async () => {
    // return a specific lastPuzzleId
    AsyncStorage.getItem.mockResolvedValue("42");

    const id = await generatePuzzleId();

    // AsyncStorage.getItem called with the correct key
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("lastPuzzleId");
    // AsyncStorage.setItem called with the incremented ID
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("lastPuzzleId", "43");
    // check  function returns the incremented ID
    expect(id).toEqual(43);
  });

  it("returns 1 for the puzzle ID if no previous ID exists", async () => {
    // simulate no previous ID stored
    AsyncStorage.getItem.mockResolvedValue(null);

    const id = await generatePuzzleId();

    // AsyncStorage.setItem called with 1 as the new ID
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("lastPuzzleId", "1");
    // check that the function returns 1
    expect(id).toEqual(1);
  });

  it("handles errors and returns null if AsyncStorage operation fails", async () => {
    // simulate an error
    AsyncStorage.getItem.mockRejectedValue(new Error("AsyncStorage error"));

    const id = await generatePuzzleId();

    // the function returns null on error
    expect(id).toBeNull();
  });
});
