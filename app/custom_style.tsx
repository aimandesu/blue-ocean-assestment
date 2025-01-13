import { useColorScheme, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  lightContainer: {
    backgroundColor: "#FAF9F6",
  },
  darkContainer: {
    backgroundColor: "#272420",
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
});

const useThemeStyles = () => {
  const colorScheme = useColorScheme();

  return {
    themeTextStyle:
      colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText,
    themeContainerStyle:
      colorScheme === "light" ? styles.lightContainer : styles.darkContainer,
    statusBarStyle: colorScheme === "light" ? "#0039a6" : "#272420",
  };
};

export default useThemeStyles;
