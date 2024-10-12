import { TouchableOpacity, Text, View } from "react-native";
import styles from "../../styles/styles";
import { getCellStyle } from "../../styles/sudokuGridStyle";
import { getHighlightStyles } from "../../styles/celllHighlightStyle";

const SudokuCell = ({
  id,
  cell,
  onSelectCell,
  isSelected,
  isLocked,
  filledBySolver,
  highlighted,
}) => {
  const { value, correct } = cell;
  const cellStyle = getCellStyle(id);
  const highlightStyles = getHighlightStyles({
    isSelected,
    isLocked,
    filledBySolver,
    highlighted,
    correct,
  });

  return (
    <TouchableOpacity
      style={[cellStyle, styles.backgroundColor]}
      onPress={() => onSelectCell(id)}
    >
      <View style={[styles.cellInner, ...Object.values(highlightStyles)]}>
        <Text style={styles.cellText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SudokuCell;
