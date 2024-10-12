import AsyncStorage from "@react-native-async-storage/async-storage";

// function to load the game state from AsyncStorage
export async function saveGameState(
  initialGrid,
  currentGrid,
  solutionGrid,
  level,
  puzzleId,
  timeTrack
) {
  const gameState = {
    initialGrid,
    currentGrid,
    solutionGrid,
    level,
    puzzleId,
    timeTrack,
  };
  const serialisedState = JSON.stringify(gameState);
  await AsyncStorage.setItem("gameState", serialisedState);
}
