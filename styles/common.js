import { Platform } from "react-native";

export const COLORS = {
  pink: "#ec4899",
  pinkDark: "#be185d",
  rose: "#fda4af",
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
