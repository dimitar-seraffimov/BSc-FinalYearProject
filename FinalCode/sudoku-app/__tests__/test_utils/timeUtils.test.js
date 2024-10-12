import { convertToSeconds, formatTime } from "../../utils/timeUtils";

describe("timeUtils", () => {
  // testing convertToSeconds function
  describe("convertToSeconds", () => {
    it("converts time string to total seconds correctly", () => {
      // formatted time string as input
      const input = "02:30";

      const result = convertToSeconds(input);
      // expected result === 150 seconds (2 minutes and 30 seconds)
      expect(result).toBe(150);
    });

    it("handles single digit seconds correctly", () => {
      const input = "01:05";
      const result = convertToSeconds(input);
      // expected result === 65 seconds
      expect(result).toBe(65);
    });
  });

  // testing the formatTime function
  describe("formatTime", () => {
    it("formats seconds to time string correctly", () => {
      const input = 150;
      const result = formatTime(input);
      // format to be "MM:SS"
      expect(result).toBe("02:30");
    });

    it("pads single digit minutes and seconds correctly", () => {
      const input = 65;
      const result = formatTime(input);
      expect(result).toBe("01:05");
    });
  });
});
