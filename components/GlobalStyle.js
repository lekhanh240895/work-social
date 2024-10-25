import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  AndroidSafeView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
