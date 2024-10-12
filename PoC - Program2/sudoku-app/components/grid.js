import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";

import styles from "../styles/styles";
import NumberPad from "./number_pad";
import SudokuCell from "./cells";

const SudokuGrid = () => {
  const [grid, setGrid] = useState(Array.from({ length: 81 }, () => ""));
  const [selectedCell, setSelectedCell] = useState(null);

  const handleSelectNumber = (number) => {
    if (selectedCell != null) {
      const newGrid = [...grid];
      newGrid[selectedCell] = number !== "X" ? String(number) : "";
      setGrid(newGrid);
      setSelectedCell(null);
    }
  };

  const handleSelectCell = (id) => {
    setSelectedCell(id);
  };

  const renderItem = ({ item, index }) => (
    <SudokuCell
      id={index}
      value={item}
      onSelectCell={handleSelectCell}
      isSelected={selectedCell === index}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.centeredView, styles.backgroundColor]}
    >
      <FlatList
        data={grid}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={9}
        scrollEnabled={false}
        style={styles.grid}
      />
      <NumberPad onNumberSelect={handleSelectNumber} />
    </KeyboardAvoidingView>
  );
};

export default SudokuGrid;
