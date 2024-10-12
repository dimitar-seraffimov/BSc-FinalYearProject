import { StyleSheet, StatusBar, Dimensions } from "react-native";

// Calculate cell size based on screen dimensions
const { width } = Dimensions.get("window");
const gridSize = width * 0.9;
const borderAndCellTotal = 2;
const cellSize = (gridSize - borderAndCellTotal * 3) / 9;
const fontSize = cellSize * 0.65;

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "black",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  grid: {
    maxWidth: gridSize,
    maxHeight: gridSize,
  },
  selectedCellInner: {
    backgroundColor: "green",
    borderRadius: 20,
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: fontSize,
    color: "white",
    height: cellSize,
    textAlignVertical: "center",
  },
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
  },
  numberButton: {
    width: cellSize,
    height: cellSize,
    borderRadius: cellSize,

    // center the number inside the button
    justifyContent: "center",
    alignItems: "center",

    // margin between the buttons and color
    margin: 11,
    backgroundColor: "rgba(22, 161, 59, 0.7)",
  },
  numberButtonText: {
    fontSize: fontSize,
    color: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  genText: {
    fontSize: 25,
    color: "white",
    textAlignVertical: "center",
    flexWrap: "wrap",
    marginHorizontal: 8,
  },
});

export default styles;
