import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, TouchableOpacity, Text, FlatList, Image } from "react-native";

import styles from "../styles/styles";
import homeStyles from "../styles/homeScreenStyles";

import { useResumePrevious } from "../hooks/useResumeGame/useResumePrevious";
import { ConfirmationPopup } from "../components/popupMessages/confirmationPopup";

const levels = ["Easy", "Medium", "Hard", "Expert"];

function Levels({ activeLevel, setActiveLevel }) {
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

function HomeScreen({ navigation }) {
  const [activeLevel, setActiveLevel] = useState("Easy");
  const { hasPreviousGame, clearGameState, loadGameState } =
    useResumePrevious();
  // confirmation popup state for starting a new game
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadGameState();
    }, [loadGameState])
  );

  const handleStartNewGamePress = () => {
    if (hasPreviousGame) {
      // show confirmation if a previous game exists
      setIsConfirmationVisible(true);
    } else {
      // directly navigate if no previous game exists
      navigation.navigate("In-Game Screen", { level: activeLevel });
    }
  };

  const handleConfirmNewGame = () => {
    clearGameState(); // clear the previous game state
    setIsConfirmationVisible(false); // close the confirmation popup

    // navigate to start a new game
    navigation.navigate("In-Game Screen", {
      level: activeLevel,
      newGame: true,
    });
  };

  return (
    <View style={[styles.centeredView, styles.backgroundColor]}>
      <Image
        source={require("../assets/images/homeScreen.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          marginBottom: 30,
        }}
      />

      <Levels activeLevel={activeLevel} setActiveLevel={setActiveLevel} />

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={homeStyles.button}
          onPress={handleStartNewGamePress}
        >
          <Text style={homeStyles.buttonText}>New Game</Text>
        </TouchableOpacity>

        {/* Conditionally render the "Resume Previous" button */}

        {hasPreviousGame && (
          <TouchableOpacity
            style={homeStyles.button}
            onPress={() =>
              navigation.navigate("In-Game Screen", { resume: true })
            }
          >
            <Text style={homeStyles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
        <ConfirmationPopup
          visible={isConfirmationVisible}
          message={
            "Your saved progress will be lost. Are you sure you want to continue?  "
          }
          onConfirm={handleConfirmNewGame}
          onCancel={() => setIsConfirmationVisible(false)}
        />
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
          onPress={() => navigation.navigate("History Screen")}
        >
          <Text style={homeStyles.addButtonsText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[homeStyles.addButtons]}
          onPress={() => navigation.navigate("Instructions Screen")}
        >
          <Text style={homeStyles.addButtonsText}>Instructions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
