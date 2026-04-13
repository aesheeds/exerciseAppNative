import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { COLORS, LAYOUT } from "../styles/common";

function pad2(n) {
  return String(n).padStart(2, "0");
}

export default function DurationExercise({ navigation, route }) {
  const { exercise, exercises } = route.params;

  const [ms, setMs] = useState(0);
  const intervalRef = useRef(null);

  const suggestedExercise = useMemo(
    () => exercises.find((e) => e.id === exercise.suggestedId),
    [exercises, exercise.suggestedId]
  );

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setMs((t) => t + 100), 100);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setMs(0);
  };

  const goToSuggested = () => {
    if (!suggestedExercise) return;
    const screen =
      suggestedExercise.type === "duration"
        ? "DurationExercise"
        : "RepetitionExercise";
    navigation.push(screen, { exercise: suggestedExercise, exercises });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100); // 0-9

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>{exercise.name} Duration</Text>

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

        <Text style={styles.timer}>
          {pad2(minutes)}:{pad2(seconds)}:{tenths}00
        </Text>

        <View style={styles.stackButtons}>
          <Button
            title="Start"
            onPress={start}
            disabled={intervalRef.current !== null}
            buttonStyle={styles.smallButton}
            containerStyle={styles.smallContainer}
            titleStyle={styles.pillTitle}
          />
          <Button
            title="Reset"
            onPress={reset}
            buttonStyle={styles.smallButton}
            containerStyle={styles.smallContainer}
            titleStyle={styles.pillTitle}
          />
        </View>

        <Button
          title="Home"
          onPress={() => navigation.popToTop()}
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
    backgroundColor: COLORS.rose,
    borderRadius: LAYOUT.radiusPill,
    paddingVertical: 10,
  },
  suggestedTitle: {
    fontWeight: "700",
    color: "#881337",
  },
  timer: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 6,
    color: COLORS.text,
  },
  stackButtons: {
    gap: 10,
    alignItems: "center",
  },
  smallContainer: {
    width: 110,
  },
  smallButton: {
    backgroundColor: COLORS.pink,
    borderRadius: 14,
    paddingVertical: 10,
  },
  homeButton: {
    backgroundColor: COLORS.pink,
    borderRadius: LAYOUT.radiusPill,
    paddingVertical: 14,
  },
  pillTitle: {
    fontWeight: "700",
  },
});