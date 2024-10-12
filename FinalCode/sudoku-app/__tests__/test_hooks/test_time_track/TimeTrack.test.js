import { renderHook, act } from "@testing-library/react-hooks";
import { useTimeTrack } from "../../../hooks/useTimeTrackHooks/useTimeTrack";
import * as timeUtils from "../../../utils/timeUtils";

// mock the utils
jest.mock("../../../utils/timeUtils", () => ({
  formatTime: jest.fn((time) => `formatted_${time}`), // mock formatTime function
  convertToSeconds: jest.fn((time) => time * 60), // mock convertToSeconds function
}));

describe("useTimeTrack", () => {
  afterEach(() => {
    jest.clearAllMocks(); // reset mock calls between tests
  });

  it("initialises timeTrack to 0 if not resuming", async () => {
    const { result } = renderHook(() => useTimeTrack(false));
    const [timeTrack] = result.current;

    expect(timeTrack).toBe("formatted_0");
    expect(timeUtils.formatTime).toHaveBeenCalledWith(0);
    expect(timeUtils.convertToSeconds).not.toHaveBeenCalled();
  });

  it("increments timeTrack every second", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTimeTrack(false));

    //  timer inside act to capture state updates
    act(() => {
      jest.advanceTimersByTime(2000); // increment time by 2 seconds
    });

    const [timeTrack] = result.current;

    // check the updated state after timers have been advanced
    expect(timeTrack).toBe("formatted_2");

    jest.useRealTimers();
  });
});
