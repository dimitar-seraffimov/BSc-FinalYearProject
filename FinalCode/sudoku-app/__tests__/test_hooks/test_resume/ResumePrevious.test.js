import { renderHook } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useResumePrevious } from "../../../hooks/useResumeGame/useResumePrevious";

// mock AsyncStorage functionality
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("useResumePrevious", () => {
  beforeEach(() => {
    // clearing mock data before each test
    AsyncStorage.getItem.mockClear();
    AsyncStorage.removeItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it("loads previous game state successfully", async () => {
    const mockGameState = { level: "easy", moves: 10 };
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockGameState));

    const { result, waitForNextUpdate } = renderHook(() => useResumePrevious());

    // waiting for any asynchronous operations within the hook to resolve
    await waitForNextUpdate();

    expect(result.current.hasPreviousGame).toBe(true);
    expect(result.current.previousGameState).toEqual(mockGameState);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles no previous game state", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { result, waitForNextUpdate } = renderHook(() => useResumePrevious());

    await waitForNextUpdate();

    // the hook's state should have no previous game state
    expect(result.current.hasPreviousGame).toBe(false);
    expect(result.current.previousGameState).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles error while loading game state", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    AsyncStorage.getItem.mockRejectedValue(new Error("AsyncStorage error"));

    const { result, waitForNextUpdate } = renderHook(() => useResumePrevious());

    // waiting for the hook to process the rejected promise from AsyncStorage.getItem
    await waitForNextUpdate();

    // verifying that an error was logged and the isLoading state is updated
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error loading game state:",
      expect.any(Error)
    );
    expect(result.current.isLoading).toBe(false);

    consoleSpy.mockRestore();
  });
});
