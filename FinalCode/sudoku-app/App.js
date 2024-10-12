import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GameScreen from "./screens/gameScreen";
import InstructionsScreen from "./screens/instructionsScreen";
import HomeScreen from "./screens/homeScreen";
import HistoryScreen from "./screens/historyScreen";

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#000" },
          headerTitleStyle: {
            ...Platform.select({
              ios: {
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              },
              android: {
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
              },
            }),
          },
          headerTintColor: "green",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="In-Game Screen" component={GameScreen} />
        <Stack.Screen name="History Screen" component={HistoryScreen} />
        <Stack.Screen
          name="Instructions Screen"
          component={InstructionsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
