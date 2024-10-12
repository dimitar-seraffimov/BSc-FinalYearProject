import React, { useState } from "react";
import { View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import styles from "../styles/styles";
import homeStyles from "../styles/homeStyles";

const levels = ["Easy", "Medium", "Hard", "Expert"];

function Levels() {
  const [activeLevel, setActiveLevel] = React.useState("Easy"); // default level
  const handlePress = (level) => {
    setActiveLevel(level);
  };

  return (
    <View style={[homeStyles.tabsContainer]}>
      <FlatList
        data={levels}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={homeStyles.tab(activeLevel, item)}
            onPress={() => handlePress(item)}
          >
            <Text style={homeStyles.tabText(activeLevel, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          paddingHorizontal: 16,
          columnGap: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
        horizontal={true}
      />
    </View>
  );
}

function HomeScreen(props) {
  console.log(props);

  return (
    <View style={[styles.centeredView, styles.backgroundColor]}>
      <Image
        source={require("../assets/homeScreen.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          marginBottom: 30,
        }}
      />

      <Levels />

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={homeStyles.button}
          onPress={() => props.navigation.navigate("In-Game Screen")}
        >
          <Text style={homeStyles.buttonText}>Start New Game</Text>
        </TouchableOpacity>
      </View>

      {/* Previous Activity and Instructions Screen buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={homeStyles.addButtons}
          onPress={() => props.navigation.navigate("Activity Screen")}
        >
          <Text style={homeStyles.addButtonsText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[homeStyles.addButtons]}
          onPress={() => props.navigation.navigate("Instructions Screen")}
        >
          <Text style={homeStyles.addButtonsText}>Instructions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
