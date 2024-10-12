import { StyleSheet } from "react-native";

export const getHighlightStyles = ({
  isSelected,
  isLocked,
  filledBySolver,
  highlighted,
  correct,
}) => {
  // style for selected cell
  const selectedCellStyle = isSelected ? styles.selectedCellInner : null;
  // style for the locked cells
  const lockedCellStyle = isLocked ? styles.lockedCell : {};
  // style for the cells filled by the solver
  const filledBySolverStyle = filledBySolver ? styles.filledBySolver : {};
  // style for highlighting the selectedNumber
  const highlightedStyle = highlighted ? styles.highlightedStyle : {};
  // style for incorrect cells -> red background if cell is incorrect
  const incorrectStyle = correct ? {} : styles.incorrectStyle;

  return {
    selectedCellStyle,
    lockedCellStyle,
    filledBySolverStyle,
    highlightedStyle,
    incorrectStyle,
  };
};

const styles = StyleSheet.create({
  selectedCellInner: {
    backgroundColor: "green",
    borderRadius: 20,
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  lockedCell: {
    backgroundColor: "rgba(135, 137, 141, 0.25)",
    borderRadius: 20,
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  filledBySolver: {
    backgroundColor: "rgba(102, 102, 102)", // if the cell is filled by the solver -> transparent/grey
  },
  highlightedStyle: {
    backgroundColor: "green",
    borderRadius: 20,
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  incorrectStyle: {
    backgroundColor: "red",
    borderRadius: 20,
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
});
