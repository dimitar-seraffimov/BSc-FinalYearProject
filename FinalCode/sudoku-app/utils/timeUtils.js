// convert formatted time "MM:SS" to total seconds
const convertToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(":").map(Number);
  const timeTrack = minutes * 60 + seconds;
  return timeTrack;
};
// format the timeTrack from seconds to "minutes:seconds"
const formatTime = (timeTrack) => {
  const minutes = Math.floor(timeTrack / 60);
  const seconds = timeTrack % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export { convertToSeconds, formatTime };
