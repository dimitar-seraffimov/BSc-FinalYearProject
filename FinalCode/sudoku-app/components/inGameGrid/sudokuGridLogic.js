import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../styles/styles";

import NumberPad from "./numberPad";
import SudokuCell from "./sudokuCells";

import { useHintPad } from "../../hooks/inGameHooks/useHintPad";
import { useNumberPad } from "../../hooks/inGameHooks/useNumberPad";
import { useNumberCounts } from "../../hooks/inGameHooks/useNumberCounts";
import { useValidate } from "../../hooks/inGameHooks/useValidate";
import { useSudokuSolver } from "../../hooks/inGameHooks/useSudokuSolver";
import { useCellSelection } from "../../hooks/inGameHooks/useCellSelection";

import { usePuzzleHistory } from "../../hooks/useInputHistory/usePuzzleHistory";
import { useManuallySolved } from "../../hooks/useGamesArchive/useManuallySolved";
import { useResumePrevious } from "../../hooks/useResumeGame/useResumePrevious";

import { CustomPopContinue } from "../popupMessages/customPopContinue";
import { ConfirmationPopup } from "../popupMessages/confirmationPopup";

const SudokuGridLogic = ({
  initialGrid,
  currentGrid,
  solutionGrid,
  puzzleId,
  level,
  timeTrack,
  onSaveGameState,
}) => {
  // state to store the grid
  const [grid, setGrid] = useState(currentGrid);
  // hook to manage the history of the puzzle
  const { history, setHistory, clearHistory } = usePuzzleHistory(puzzleId);
  // hook to count the number of occurrences of each number in the grid
  const numberCounts = useNumberCounts(grid);
  // state to store puzzle's solved status
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);

  // update the grid state, when the currentGrid prop changes (when entering the screen)
  useEffect(() => {
    setGrid(currentGrid);
  }, [currentGrid]);

  // useFocusEffect to save game screen on losing focus - exit to another screen
  useFocusEffect(
    useCallback(() => {
      // on unmount
      return () => {
        // calls the function stored in the ref, which saves the game state on screen exit
        if (!isPuzzleSolved) {
          onSaveGameState(grid); // save only if the puzzle is not solved
        }
      };
    }, [timeTrack]) // saving the game state on exiting the screen
  );

  // hook to manage the cell selection logic
  const {
    selectedCell,
    selectedNumber,
    handleSelectCell: handleCellSelection,
    setSelectedNumber,
  } = useCellSelection();

  // function to handle the cell selection, passing it to the useCellSelection.js hook
  const handleSelectCell = (id) => {
    const cell = grid[id];
    // adjust grid state to reset correctness
    const newGrid = grid.map((cell) => ({ ...cell, correct: true }));
    setGrid(newGrid);

    // use the refined hook's method for selecting a cell
    handleCellSelection(id, cell.value, cell.locked);
  };

  // callback function to update the grid and history from the useNumberPad.js hook
  const updateGridAndHistory = (newGrid) => {
    setHistory([...history, newGrid]); // update history with the passed grid state
    setGrid(newGrid); // update local grid state
    onSaveGameState(newGrid); // save the updated game state
  };

  // using useNumberPad.js hook for num pad selection logic
  const { handleNumberPadSelection } = useNumberPad(
    setSelectedNumber,
    updateGridAndHistory
  );

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const requestConfirmation = (action) => {
    setPendingAction(() => action);
    setConfirmationVisible(true);
  };

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setConfirmationVisible(false);
  };

  const cancelAction = () => {
    setPendingAction(null);
    setConfirmationVisible(false);
  };

  // custom hook to show "validated" message
  const { popupVisible, validateGrid, setPopupVisible } = useValidate(
    grid,
    solutionGrid
  );

  // wrapping the action to be validated with requestConfirmation()
  const wrappedHandleValidateAndSetGrid = () =>
    requestConfirmation(handleValidateAndSetGrid);

  // using useValidate.js hook for the validation feature
  const handleValidateAndSetGrid = () => {
    const newGrid = validateGrid();
    setGrid(newGrid); // updates the grid state with  validated grid
  };

  // wrapping the action to be validated with requestConfirmation()
  const wrappedHandleRestart = () => requestConfirmation(handleRestart);

  // using the useHintPad hook for "clue" features
  const { handleRestart, handleStepBack } = useHintPad({
    initialGrid,
    setGrid,
    history,
    setHistory,
  });

  // wrapping the action to be validated with requestConfirmation()
  const wrappedHandleSolvePuzzle = () => requestConfirmation(handleSolvePuzzle);

  // using the useSudokuSolver hook to solve the current puzzle
  const { solvePuzzle } = useSudokuSolver(grid);
  // controlling the visibility of the "no solution" popup
  const [noSolutionPopupVisible, setNoSolutionPopupVisible] = useState(false);

  // function to solve the puzzle with the integrated sudoku solver and update the grid state
  const handleSolvePuzzle = () => {
    const { autoSolved, newGrid } = solvePuzzle();
    if (autoSolved) {
      setGrid(newGrid);
      setIsPuzzleSolved(true); // set the puzzle as solved
    } else {
      setNoSolutionPopupVisible(true); // show the "no solution" popup if not solved
    }
  };

  // controll the popup and its message
  const [popupFinalMessage, setFinalPopupMessage] = useState("");

  // handle popup dismiss, close the popup and call the function to clear the game state
  const handlePopupDismiss = useCallback(() => {
    setShowFinalPopup(false);
    setTimeout(() => {
      handleClearGameState();
    }, 3000); // go to home screen after 3 seconds
  }, []);

  const handleOutcome = useCallback(({ success, message }) => {
    if (success) {
      setFinalPopupMessage(message);
      setShowFinalPopup(true);
      setIsPuzzleSolved(true);
    } else {
      setFinalPopupMessage(message);
      setShowFinalPopup(true);
      setIsPuzzleSolved(false);
    }
  }, []);

  // call the hook and pass handleOutcome
  const { finalPopup, setShowFinalPopup } = useManuallySolved(
    grid,
    solutionGrid,
    history.length,
    handleOutcome,
    puzzleId,
    level,
    timeTrack
  );

  // function to clear the game state and navigate to the home screen
  const navigation = useNavigation();
  const { clearGameState } = useResumePrevious();

  const handleClearGameState = () => {
    clearGameState(); // calls function from the hook
    clearHistory(); // clears the history
    navigation.navigate("Home");
  };

  const renderItem = ({ item, index }) => (
    <SudokuCell
      id={index}
      key={index}
      cell={item}
      onSelectCell={handleSelectCell}
      isSelected={selectedCell === index}
      isLocked={item.locked} // passes the locked status to the SudokuCell component
      filledBySolver={item.filledBySolver} // passes the filledBySolver status to the SudokuCell component
      highlighted={selectedNumber === item.value} // passes the highlighted prop based on the selectedNumber
      setSelectedNumber={setSelectedNumber} // passes setSelectedNumber to SudokuCell
      correct={item.correct} // passes the "correct" status to the SudokuCell component
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.centeredView, styles.backgroundColor]}
    >
      <View style={{ alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 27, color: "white", fontWeight: "bold" }}>
          {timeTrack}
        </Text>
      </View>

      <FlatList
        data={grid}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={9}
        scrollEnabled={false}
        style={styles.grid}
      />
      <NumberPad
        onNumberSelect={(number) =>
          handleNumberPadSelection(number, selectedCell, grid, history)
        }
        numberCounts={numberCounts} // using the hook's output
      />
      <View style={styles.hintPad}>
        <TouchableOpacity
          onPress={wrappedHandleRestart}
          style={styles.hintButton}
          disabled={history.length < 1} // disable the button if there's no history
        >
          <Icon
            name="refresh"
            size={26}
            color={history.length < 1 ? "red" : "white"} // change the icon color if disabled
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleStepBack} style={styles.hintButton}>
          <FontAwesome5
            name="backward"
            size={18}
            color={history.length < 1 ? "red" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={wrappedHandleValidateAndSetGrid}
          style={styles.hintButton}
        >
          <FontAwesome5
            name="question"
            size={20}
            color={history.length < 1 ? "red" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={wrappedHandleSolvePuzzle}
          style={styles.hintButton}
          disabled={history.length < 1}
        >
          <Icon
            name="done-all"
            size={26}
            color={history.length < 1 ? "red" : "white"}
          />
        </TouchableOpacity>
        <ConfirmationPopup
          visible={confirmationVisible}
          message="Are you sure?"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />

        {popupVisible && (
          <CustomPopContinue
            visible={popupVisible}
            message="All inputs are correct!"
            onDismiss={() => setPopupVisible(false)}
          />
        )}

        {noSolutionPopupVisible && (
          <CustomPopContinue
            visible={noSolutionPopupVisible}
            message="No solution exists!"
            onDismiss={() => setNoSolutionPopupVisible(false)}
          />
        )}

        <CustomPopContinue
          visible={finalPopup}
          message={popupFinalMessage}
          onDismiss={handlePopupDismiss}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SudokuGridLogic;
