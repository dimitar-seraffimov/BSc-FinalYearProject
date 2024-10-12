import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles/styles";

const SudokuCell = ({ value, onSelectCell, id, isSelected }) => {
  // check if the cell is on the right edge
  const isRightEdgeOfGrid = id % 9 === 8;
  // check if the cell is on the bottom edge
  const isBottomEdgeOfGrid = Math.floor(id / 9) === 8;

  // check if the cell is on the right edge of a 3x3 region
  const isRightEdge = id % 9 === 2 || id % 9 === 5;
  // check if the cell is on the bottom edge of a 3x3 region
  const isBottomEdge = Math.floor(id / 9) % 3 === 2 && Math.floor(id / 9) < 8;

  //  style for selected cell
  const selectedCellStyle = isSelected ? styles.selectedCellInner : null;

  // combine the base cell style with conditional styles for the right and bottom edges
  const cellStyle = {
    ...styles.cell,
    borderRightWidth: isRightEdgeOfGrid ? 0 : isRightEdge ? 1 : 1,
    borderBottomWidth: isBottomEdgeOfGrid ? 0 : isBottomEdge ? 1 : 1,
    borderRightColor: isRightEdge ? "white" : "green", // green for the 3x3 region borders
    borderBottomColor: isBottomEdge ? "white" : "green",
  };

  return (
    <TouchableOpacity
      style={[cellStyle, styles.backgroundColor]}
      onPress={() => onSelectCell(id)}
    >
      <View style={[styles.cellInner, selectedCellStyle]}>
        <Text style={styles.cellText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SudokuCell;
