import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import RepetitionExercise from "./screens/RepetitionExercise";
import DurationExercise from "./screens/DurationExercise";

import { exercises } from "./data/exercises";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerBackVisible: true }}>
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ exercises }}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="RepetitionExercise"
          component={RepetitionExercise}
          options={{ title: "RepetitionExercise" }}
        />

        <Stack.Screen
          name="DurationExercise"
          component={DurationExercise}
          options={{ title: "DurationExercise" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}