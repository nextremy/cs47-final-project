import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors";
import ThemeContext from "../contexts/ThemeContext";
import TodosContext from "../contexts/TodosContext";
import Icon from "react-native-vector-icons/Octicons";

export default function SettingsScreen() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [_, setTodos] = useContext(TodosContext);

  async function toggleTheme() {
    if (theme === "light") {
      AsyncStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      AsyncStorage.setItem("theme", "light");
      setTheme("light");
    }
  }

  async function clearTodos() {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify([]));
      setTodos([]);
    } catch (error) {
      console.error(error);
    }
  }

  const styles = getThemedStyles(theme);
  return (
    <View style={styles.container}>
      <Pressable onPressOut={toggleTheme} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Icon
            name={theme === "light" ? "sun" : "moon"}
            color={theme === "light" ? colors.gray[900] : colors.gray[100]}
            size={14}
            style={styles.icon}
          />
        </View>
        <Text style={styles.toggleThemeButtonText}>Toggle theme</Text>
      </Pressable>
      <Pressable onPressOut={clearTodos} style={styles.button}>
        <View style={styles.iconWrapper}>
          <Icon
            name={"trash"}
            color={theme === "light" ? colors.red[700] : colors.red[300]}
            size={14}
            style={styles.icon}
          />
        </View>
        <Text style={styles.clearTodosButtonText}>Clear todos</Text>
      </Pressable>
    </View>
  );
}

function getThemedStyles(theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? colors.gray[100] : colors.gray[900],
      flex: 1,
    },
    button: {
      alignItems: "center",
      flexDirection: "row",
      height: 48,
      paddingHorizontal: 16,
    },
    iconWrapper: {
      height: 24,
      width: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    toggleThemeButtonText: {
      color: theme === "light" ? colors.gray[900] : colors.gray[100],
      fontSize: 16,
      marginLeft: 8,
    },
    clearTodosButtonText: {
      color: theme === "light" ? colors.red[700] : colors.red[300],
      fontSize: 16,
      marginLeft: 8,
    },
  });
}
