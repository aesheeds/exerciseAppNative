import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { COLORS, LAYOUT } from "../styles/common";

export default function RepetitionExercise({ navigation, route }) {
  const { exercise, exercises } = route.params;
  const [count, setCount] = useState(0);

  const suggestedExercise = useMemo(
    () => exercises.find((e) => e.id === exercise.suggestedId),
    [exercises, exercise.suggestedId]
  );

  const goToSuggested = () => {
    if (!suggestedExercise) return;
    const screen =
      suggestedExercise.type === "duration"
        ? "DurationExercise"
        : "RepetitionExercise";
    navigation.push(screen, { exercise: suggestedExercise, exercises });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>{exercise.name} Repetition</Text>

        <Button
          title={
            suggestedExercise
              ? `Suggested: ${suggestedExercise.name}`
              : "Suggested: (none)"
          }
          onPress={goToSuggested}
          disabled={!suggestedExercise}
          buttonStyle={styles.suggestedButton}
          titleStyle={styles.suggestedTitle}
          containerStyle={styles.btnContainer}
        />

        <Text h4 style={styles.counter}>Rep Count: {count}</Text>

        <View style={styles.row}>
          <Button
            title="Add"
            onPress={() => setCount((c) => c + 1)}
            buttonStyle={styles.smallButton}
            containerStyle={styles.smallContainer}
            titleStyle={styles.pillTitle}
          />
          <Button
            title="Reset"
            onPress={() => setCount(0)}
            buttonStyle={styles.smallButton}
            containerStyle={styles.smallContainer}
            titleStyle={styles.pillTitle}
          />
        </View>

        <Button
          title="Home"
          type="solid"
          onPress={() => navigation.navigate("Home", { exercises })}
          buttonStyle={styles.homeButton}
          titleStyle={styles.pillTitle}
          containerStyle={styles.btnContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: LAYOUT.topPad,
    paddingHorizontal: LAYOUT.padding,
  },
  content: {
    width: "100%",
    maxWidth: LAYOUT.maxWidth,
    alignItems: "center",
    gap: 14,
  },
  title: {
    fontWeight: "800",
    marginTop: 18,
    textAlign: "center",
    color: COLORS.text,
  },
  btnContainer: {
    width: LAYOUT.buttonWidth,
  },
  suggestedButton: {
    backgroundColor: COLORS.green,
    borderRadius: LAYOUT.radiusPill,
    paddingVertical: 10,
  },
  suggestedTitle: {
    fontWeight: "700",
    color: "#064e3b",
  },
  counter: {
    marginTop: 6,
    fontWeight: "800",
    color: COLORS.text,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  smallContainer: {
    width: 110,
  },
  smallButton: {
    backgroundColor: COLORS.teal,
    borderRadius: 14,
    paddingVertical: 10,
  },
  homeButton: {
    backgroundColor: COLORS.teal,
    borderRadius: LAYOUT.radiusPill,
    paddingVertical: 14,
  },
  pillTitle: {
    fontWeight: "700",
  },
});