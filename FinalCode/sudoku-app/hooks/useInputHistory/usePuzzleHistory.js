import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// this file controls the history feature of the game
// needed to ensure proper functionality of the step back button
export const usePuzzleHistory = (puzzleId) => {
  const [history, setHistory] = useState([]);

  // save history to AsyncStorage
  const saveHistory = useCallback(
    async (history) => {
      try {
        const serialisedHistory = JSON.stringify(history);
        await AsyncStorage.setItem(
          `puzzleHistory_${puzzleId}`,
          serialisedHistory
        );
      } catch (error) {
        console.error("Failed to save puzzle history", error);
      }
    },
    [puzzleId]
  );

  // load history from AsyncStorage
  const loadHistory = useCallback(async () => {
    try {
      const serialisedHistory = await AsyncStorage.getItem(
        `puzzleHistory_${puzzleId}`
      );
      const loadedHistory = serialisedHistory
        ? JSON.parse(serialisedHistory)
        : [];
      setHistory(loadedHistory);
    } catch (error) {
      console.error("Failed to load puzzle history", error);
    }
  }, [puzzleId]);

  // clear history from AsyncStorage
  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(`puzzleHistory_${puzzleId}`);
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear puzzle history", error);
    }
  }, [puzzleId]);

  // load history when puzzleId changes
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // update AsyncStorage with history changes
  useEffect(() => {
    saveHistory(history);
  }, [history, saveHistory]);

  return { history, setHistory, clearHistory };
};
