import React from "react";
import { Pressable, Text } from "react-native";
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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <Pressable onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
                <Text style={{ color: "#ec4899", fontSize: 22 }}>←</Text>
              </Pressable>
            ) : null,
        })}
      >
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