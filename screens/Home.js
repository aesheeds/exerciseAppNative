import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { COLORS, LAYOUT } from "../styles/common";

export default function Home({ navigation, route }) {
  const { exercises } = route.params;

  const goToExercise = (exercise) => {
    const screen =
      exercise.type === "duration" ? "DurationExercise" : "RepetitionExercise";
    navigation.push(screen, { exercise, exercises });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>Exercises</Text>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          renderItem={({ item }) => (
            <Button
              title={item.name}
              onPress={() => goToExercise(item)}
              buttonStyle={styles.pillButton}
              titleStyle={styles.pillTitle}
              containerStyle={styles.btnContainer}
            />
          )}
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
  },
  title: {
    fontWeight: "800",
    marginBottom: 18,
    color: COLORS.text,
  },
  list: {
    paddingBottom: 12,
    alignItems: "center",
  },
  btnContainer: {
    width: LAYOUT.buttonWidth,
  },
  pillButton: {
    backgroundColor: COLORS.teal,
    borderRadius: LAYOUT.radiusPill,
    paddingVertical: 14,
  },
  pillTitle: {
    fontWeight: "700",
  },
});