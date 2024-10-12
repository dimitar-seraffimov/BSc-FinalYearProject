import { StyleSheet, Dimensions } from "react-native";

import { TouchableOpacity, Text, View } from "react-native";

const NumberPad = ({ onNumberSelect, numberCounts }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "X"];
  return (
    <View style={styles.numberPad}>
      {numbers.map((number, index) => (
        <TouchableOpacity
          key={number.toString()}
          style={styles.numberButton}
          onPress={() => onNumberSelect(number)}
        >
          <Text style={styles.numberButtonText}>{number}</Text>

          <Text style={styles.numberCountText}>{numberCounts[index]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NumberPad;

// calculating the cell size based on the specific screen dimensions
const { width } = Dimensions.get("window");
const gridSize = width * 0.9;
const borderAndCellTotal = 2;
const cellSize = (gridSize - borderAndCellTotal * 3) / 9;
const fontSize = cellSize * 0.7;

const styles = StyleSheet.create({
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: cellSize * 0.7,
  },
  numberButton: {
    width: cellSize * 1.45,
    height: cellSize * 1.45,
    borderRadius: cellSize,

    justifyContent: "center",
    alignItems: "center",
    paddingTop: cellSize * 0.55,
    // margin between the buttons
    margin: 5,
    marginVertical: 10,

    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(22, 161, 59, 0.7)",
  },
  numberButtonText: {
    fontSize: fontSize,
    fontWeight: "700",
    color: "white",
  },
  numberCountText: {
    fontSize: fontSize * 0.7,
    fontWeight: "500",
    color: "white",
  },
});
