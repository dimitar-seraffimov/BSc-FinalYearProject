import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

function InstructionsScreen() {
  return (
    <View style={[styles.centeredView, styles.backgroundColor]}>
      <Text style={styles.genText}>
        In the final application, this screen will provide the user with
        instructions:
        {"\n"}- on how to play the game &
        {"\n"}- navigate the application.
      </Text>
    </View>
  );
}

export default InstructionsScreen;
