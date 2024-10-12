import { StyleSheet, StatusBar, Dimensions } from "react-native";

// Calculate cell size based on screen dimensions
const { width } = Dimensions.get("window");
const gridSize = width * 0.9;
const borderAndCellTotal = 2;
const cellSize = (gridSize - borderAndCellTotal * 3) / 9;
const fontSize = cellSize * 0.65;

const homeStyles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: (activeJobType, item) => ({
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: activeJobType === item ? "green" : "white",
    backgroundColor: activeJobType === item ? "green" : "#000",
  }),
  tabText: (activeJobType, item) => ({
    color: activeJobType === item ? "white" : "#C1C0C8",
    fontWeight: "bold",
    fontSize: 17,
  }),
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 20,
  },
  addButtons: {
    flexDirection: "row",
    backgroundColor: "#e8e8eb",
    width: "34%",

    justifyContent: "center",
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  addButtonsText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default homeStyles;
