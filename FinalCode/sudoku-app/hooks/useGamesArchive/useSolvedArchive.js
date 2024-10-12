import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSolvedArchive = () => {
  const [solvedGames, setSolvedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSolvedGamesHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const solvedGamesJson = await AsyncStorage.getItem("solvedGames");
      const solvedGamesHistory = solvedGamesJson
        ? JSON.parse(solvedGamesJson)
        : [];
      setSolvedGames(solvedGamesHistory);
    } catch (error) {
      console.error("Error fetching solved games history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSolvedGamesHistory();
  }, [fetchSolvedGamesHistory]);

  return {
    solvedGames,
    isLoading,
    refresh: fetchSolvedGamesHistory,
  };
};
