import { useState, useEffect } from "react";
import { formatTime, convertToSeconds } from "../../utils/timeUtils";

export const useTimeTrack = (isResuming) => {
  const [timeTrack, setTimeTrack] = useState(
    isResuming ? convertToSeconds(previousTime) : 0
  );

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeTrack((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // format the timeTrack from seconds to "minutes:seconds"
  return [formatTime(timeTrack), setTimeTrack];
};
