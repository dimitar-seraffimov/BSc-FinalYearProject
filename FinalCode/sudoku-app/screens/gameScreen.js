import React, { useEffect, useState, useLayoutEffect } from "react";

import SudokuGenerator from "../algorithms/sudokuGenerator";
import SudokuGridLogic from "../components/inGameGrid/sudokuGridLogic";

import { useTimeTrack } from "../hooks/useTimeTrackHooks/useTimeTrack";
import { useResumePrevious } from "../hooks/useResumeGame/useResumePrevious";

import { saveGameState } from "../utils/gameStateUtils";
import { generatePuzzleId } from "../utils/puzzleIdUtils";
import { convertToSeconds } from "../utils/timeUtils";

export default function GameScreen({ route, navigation }) {
  // extracts the level from the route params
  const [level, setLevel] = useState(route.params?.level);
  // state to store the starting grid
  const [initialGrid, setInitialGrid] = useState([]);
  // state to store the solution grid
  const [solutionGrid, setSolutionGrid] = useState([]);
  // state to store the current grid
  const [currentGrid, setCurrentGrid] = useState([]);

  // imports custom hook - previousGameState holds the previous game state if it exists
  // clearGameState function clears the game state from AsyncStorage
  const { previousGameState, clearGameState, isLoading } = useResumePrevious();
  // store the puzzle id
  const [puzzleId, setPuzzleId] = useState([]);
  // checks if resuming
  const isResuming = route.params?.resume && previousGameState;
  // custom hook to track time
  const [startSeconds] = useState(0);
  // custom hook to track time
  const [timeTrack, setTimeTrack] = useTimeTrack(startSeconds);

  // useEffect to handle the game resume or start new game logic
  useEffect(() => {
    async function initOrResumeGame() {
      if (isLoading) return; // prevents initialisation while loading

      // resume game logic
      if (isResuming) {
        setPuzzleId(previousGameState.puzzleId); // set puzzleId from previousGameState
        setInitialGrid(previousGameState.initialGrid); // set initial grid for reseting
        setCurrentGrid(previousGameState.currentGrid); // set grid from previousGameState
        setSolutionGrid(previousGameState.solutionGrid); // keep solutionGrid from previousGameState
        setLevel(previousGameState.level); // set level from previousGameState

        const timeTrackInSec = convertToSeconds(previousGameState.timeTrack); // convert timeTrack to seconds
        setTimeTrack(timeTrackInSec); // set timeTrack from previousGameState

        console.log(
          `Resuming gameNumber: ${previousGameState.puzzleId} with level: ${previousGameState.level} and time passed: ${previousGameState.timeTrack}.`
        );
      }
      // start new game logic
      else {
        const newPuzzleId = await generatePuzzleId();
        setPuzzleId(newPuzzleId); // set new puzzleId

        await clearGameState();
        const { puzzleGrid, completeGrid } = await generateSudoku(level);

        setInitialGrid(puzzleGrid); // set new starting grid
        setCurrentGrid(puzzleGrid); // set new current grid
        setSolutionGrid(completeGrid); // set new solution grid
        setTimeTrack(startSeconds); // reset timeTrack

        saveGameState(
          puzzleGrid,
          puzzleGrid,
          completeGrid,
          level,
          newPuzzleId,
          startSeconds
        ); // save the new game state
      }
    }
    initOrResumeGame();
  }, [isLoading]); // only runs when isLoading exists and loads previous game state

  const generateSudoku = async () => {
    const sudoku = new SudokuGenerator(level);
    sudoku.generateCompleteGrid();
    const completeGrid = sudoku
      .getGrid()
      .flat()
      .map((num) => String(num));

    sudoku.removeNumbersFromGrid();
    const puzzleGrid = sudoku
      .getGrid()
      .flat()
      .map((num) => ({
        value: num === 0 ? "" : String(num),
        locked: num !== 0, // true if the cell was part of the original puzzle
        correct: true, // all cells are correct initially
      }));

    return { puzzleGrid, completeGrid };
  };

  // updating the navigation title based on the level
  useLayoutEffect(() => {
    navigation.setOptions({
      title: level ? `Difficulty: ${level}` : "Loading...", // sets the title
    });
  }, [level, navigation]); // whenever level changes, update the title

  // use saveGameState utility
  const handleSaveGameState = async (currentGrid) => {
    await saveGameState(
      initialGrid,
      currentGrid,
      solutionGrid,
      level,
      puzzleId,
      timeTrack
    );
  };

  return (
    <SudokuGridLogic
      initialGrid={initialGrid}
      currentGrid={currentGrid}
      solutionGrid={solutionGrid}
      puzzleId={puzzleId}
      level={level}
      timeTrack={timeTrack}
      onSaveGameState={handleSaveGameState}
    />
  );
}
