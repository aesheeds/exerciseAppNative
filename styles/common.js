import { Platform } from "react-native";

export const COLORS = {
  teal: "#39b7ad",
  tealDark: "#0f766e",
  green: "#4ade80",
  text: "#111827",
  muted: "#6b7280",
};

export const LAYOUT = {
  maxWidth: 520,
  buttonWidth: 260,
  radiusPill: 999,
  gap: 12,
  padding: 16,
  topPad: Platform.OS === "web" ? 24 : 16,
};