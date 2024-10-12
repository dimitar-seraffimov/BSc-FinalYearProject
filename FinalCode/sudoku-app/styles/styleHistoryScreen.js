import { StyleSheet, Dimensions } from "react-native";

// use screen's width to adapt the layout dynamically
const { width } = Dimensions.get("window");

const stylesHistory = StyleSheet.create({
  // FlatList styles below
  background: {
    backgroundColor: "black",
    flex: 1, // fill the screen
  },
  // styles for each list item
  listItem: {
    margin: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9, // 90% of the screen width
    marginBottom: 10,
    marginHorizontal: 20,

    borderColor: "green",
    borderRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 8,

    flexDirection: "column",
  },

  // text styles
  text: {
    fontSize: 17,
    color: "white",
    fontWeight: "400",
    marginBottom: 5,
  },
  dataText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  flexItem: {
    flex: 1,
    marginBottom: 10,
  },

  // Modal styles below
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",

    width: width * 0.95,
    height: width * 1.35,
    borderColor: "green",
    borderWidth: 2,
  },
  textModal: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: width * 0.25,
  },
  buttonClose: {
    backgroundColor: "red",
    marginTop: 30,
  },
  textButton: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default stylesHistory;
