import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";

import { useSolvedArchive } from "../hooks/useGamesArchive/useSolvedArchive";

import stylesHistory from "../styles/styleHistoryScreen";
import { getCellStyle } from "../styles/sudokuGridStyle";
import styles from "../styles/styles";

export default function HistoryScreen() {
  const { solvedGames, isLoading } = useSolvedArchive();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setSelectedItem] = useState(null);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <FlatList
        data={solvedGames}
        keyExtractor={(item, index) => `${item.puzzleId}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setIsModalVisible(true);
            }}
          >
            <View style={stylesHistory.listItem}>
              {/* row container for Puzzle ID and Level */}
              <View style={stylesHistory.rowContainer}>
                <Text style={[stylesHistory.dataText, stylesHistory.flexItem]}>
                  <Text style={stylesHistory.text}>Game Number: </Text>{" "}
                  {item.puzzleId}
                </Text>
                <Text style={[stylesHistory.dataText, stylesHistory.flexItem]}>
                  <Text style={stylesHistory.text}>Game Level: </Text>

                  {item.level}
                </Text>
              </View>
              {/* timeTrack under the row */}
              <Text style={stylesHistory.dataText}>
                <Text style={stylesHistory.text}>Completion Time: </Text>

                {item.timeTrack}
              </Text>
              <Text style={stylesHistory.dataText}>
                <Text style={stylesHistory.text}>Date Solved: </Text>

                {item.solvedDate}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Text style={stylesHistory.text}>No previous games...</Text>
            <Text style={stylesHistory.text}>
              Complete a game to see it here!
            </Text>
          </View>
        )}
        style={stylesHistory.background}
        contentContainerStyle={solvedGames.length === 0 ? { flex: 1 } : null}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={stylesHistory.centeredView}>
          <View style={stylesHistory.modalView}>
            <Text style={stylesHistory.textModal}>
              Solution to Sudoku Game: {item?.puzzleId}
            </Text>
            <View style={{ flexDirection: "column" }}>
              {Array(9)
                .fill()
                .map((_, rowIndex) => (
                  <View key={rowIndex} style={{ flexDirection: "row" }}>
                    {Array(9)
                      .fill()
                      .map((__, cellIndex) => {
                        const index = rowIndex * 9 + cellIndex; // calculate the index in the 1D array
                        const cellValue = item?.solutionGrid[index]; // get the cell value using the calculated index
                        const cellStyle = getCellStyle(index); // conditional styling
                        return (
                          <View
                            key={cellIndex}
                            style={[styles.cell, cellStyle]}
                          >
                            <Text style={styles.cellText}>{cellValue}</Text>
                          </View>
                        );
                      })}
                  </View>
                ))}
            </View>
            <TouchableOpacity
              style={[stylesHistory.button, stylesHistory.buttonClose]}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Text style={stylesHistory.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
