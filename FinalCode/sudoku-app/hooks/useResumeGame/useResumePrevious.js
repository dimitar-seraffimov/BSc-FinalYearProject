import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useResumePrevious = () => {
  const [hasPreviousGame, setHasPreviousGame] = useState(false);
  const [previousGameState, setPreviousGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // function to load the game state from AsyncStorage
  const loadGameState = useCallback(async () => {
    setIsLoading(true);
    try {
      const serialisedState = await AsyncStorage.getItem("gameState");
      if (serialisedState) {
        const gameState = JSON.parse(serialisedState);
        setPreviousGameState(gameState);
        setHasPreviousGame(true);
      } else {
        setHasPreviousGame(false);
      }
    } catch (error) {
      console.error("Error loading game state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // function to clear the game state from AsyncStorage
  const clearGameState = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("gameState");
      setHasPreviousGame(false);
      setPreviousGameState(false);
    } catch (error) {
      console.error("Failed to clear game state", error);
    }
  }, []);

  // load the game state when the hook is used
  useEffect(() => {
    loadGameState();
  }, [loadGameState]);

  return {
    hasPreviousGame,
    previousGameState,
    clearGameState,
    isLoading,
    loadGameState,
  };
};
