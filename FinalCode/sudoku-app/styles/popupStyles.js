import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // dim background
  },
  modalView: {
    width: "80%",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",

    borderColor: "white",
    borderWidth: 0.5,
  },
  modalViewNewGame: {
    width: "90%",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",

    borderColor: "white",
    borderWidth: 0.5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100, // Ensure a minimum width for the button
    alignItems: "center", // Center text within the button
    marginHorizontal: 10, // Add space between buttons
  },
  confirmButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default styles;
