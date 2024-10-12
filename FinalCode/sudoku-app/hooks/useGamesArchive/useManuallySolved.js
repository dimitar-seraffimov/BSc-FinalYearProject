import React, { useState, useEffect } from "react";
import { saveSolvedGames } from "../../utils/saveSolvedGames";

// this hook checks if the grid is correctly solved by the user
export const useManuallySolved = (
  currentGrid,
  solutionGrid,
  historyLength,
  handleOutcome,
  puzzleId,
  level,
  timeTrack
) => {
  const [finalPopup, setShowFinalPopup] = useState(false);
  const [popupFinalMessage, setFinalPopupMessage] = useState("");

  useEffect(() => {
    if (historyLength > 0) {
      const puzzleFilled = currentGrid.every(
        (cell) => cell.value !== null && cell.value !== ""
      );

      const gridsMatch = currentGrid.every(
        (cell, index) => cell.value === solutionGrid[index]
      );

      if (puzzleFilled) {
        if (gridsMatch) {
          saveSolvedGames(puzzleId, level, timeTrack, solutionGrid); // save the solved game
          handleOutcome({
            success: true,
            message: `Well done! \n You solved level ${level} for ${timeTrack}.`,
          });
        } else {
          handleOutcome({
            success: false,
            message: "The puzzle is incorrect! \n Use validate for clues.",
          });
        }
      }
    }
  }, [currentGrid]);

  return {
    finalPopup,
    popupFinalMessage,
    setShowFinalPopup,
  };
};

// export default useManuallySolved;
