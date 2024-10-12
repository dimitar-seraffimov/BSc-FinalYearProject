import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSolvedGames = async (
  puzzleId,
  level,
  timeTrack,
  solutionGrid
) => {
  const now = new Date();
  // format the date to DD/MM/YYYY
  const solvedDate = [
    ("0" + now.getDate()).slice(-2),
    ("0" + (now.getMonth() + 1)).slice(-2),
    now.getFullYear(),
  ].join(" / ");

  const solvedGame = { puzzleId, level, timeTrack, solutionGrid, solvedDate };
  try {
    const existingSolvedGamesJson = await AsyncStorage.getItem("solvedGames");
    const existingSolvedGames = existingSolvedGamesJson
      ? JSON.parse(existingSolvedGamesJson)
      : [];
    existingSolvedGames.push(solvedGame);
    const updatedSolvedGamesJson = JSON.stringify(existingSolvedGames);
    await AsyncStorage.setItem("solvedGames", updatedSolvedGamesJson);
  } catch (error) {
    console.error("Error saving solved game:", error);
  }
};
