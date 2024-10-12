import { StyleSheet, Dimensions, Platform } from "react-native";

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
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: fontSize,
    color: "white",
    // for iOS, text centered horizontally
    textAlign: "center",
    ...Platform.select({
      ios: {
        lineHeight: cellSize, // vertically center text on iOS
      },
      android: {
        textAlignVertical: "center", // works on Android only
      },
    }),
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
  solveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 20,
  },
  solveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  numberCountsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  numberCountText: {
    fontSize: 16,
    color: "white",
  },
  hintPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: cellSize * 0.5,
  },
  hintButton: {
    width: cellSize * 1.2,
    height: cellSize * 1.2,
    borderRadius: cellSize,

    justifyContent: "center",
    alignItems: "center",

    // margin between the buttons
    margin: 20,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(22, 161, 59, 0.7)",
  },
});

export default styles;
