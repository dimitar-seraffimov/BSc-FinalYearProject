import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

function ActivityScreen() {
  return (
    <View style={[styles.centeredView, styles.backgroundColor]}>
      <Text style={[styles.genText]}>
        In the final application, this screen will provide a list with the
        user's activity history.
      </Text>
    </View>
  );
}

export default ActivityScreen;
