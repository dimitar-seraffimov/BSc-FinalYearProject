import { StyleSheet } from "react-native";

const stylesInstrScreen = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "green", // header text color
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  bulletPoint: {
    color: "green", // bullet point header color
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 15,
  },
});

export default stylesInstrScreen;
