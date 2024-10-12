import AsyncStorage from "@react-native-async-storage/async-storage";

// to generate a new puzzle ID
export const generatePuzzleId = async () => {
  try {
    // get the last puzzleId from AsyncStorage
    const lastPuzzleIdString = await AsyncStorage.getItem("lastPuzzleId");
    let lastPuzzleId = lastPuzzleIdString
      ? parseInt(lastPuzzleIdString, 10)
      : 0;

    // increment the puzzleId for the new game
    const newPuzzleId = lastPuzzleId + 1;

    // save the new puzzleId back to AsyncStorage for future reference
    await AsyncStorage.setItem("lastPuzzleId", newPuzzleId.toString());

    return newPuzzleId;
  } catch (error) {
    console.error("Failed to generate a new puzzle ID", error);
    return null;
  }
};
