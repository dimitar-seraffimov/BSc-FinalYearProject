import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/homeScreen";
import GameScreen from "./screens/gameScreen";
import ActivityScreen from "./screens/activityScreen";
import InstructionsScreen from "./screens/instructionsScreen";

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: "#fff", fontSize: 25 },
          headerTintColor: "green",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="In-Game Screen" component={GameScreen} />
        <Stack.Screen name="Activity Screen" component={ActivityScreen} />
        <Stack.Screen name="Instructions Screen" component={InstructionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
