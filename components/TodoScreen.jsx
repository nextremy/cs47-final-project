import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import colors from "../assets/colors";
import ThemeContext from "../contexts/ThemeContext";
import TodosContext from "../contexts/TodosContext";

export default function TodoScreen(props) {
  const [theme, _setTheme] = useContext(ThemeContext);
  const [todos, setTodos] = useContext(TodosContext);
  const { text } = props.route.params;
  const timestamp = new Date(props.route.params.timestamp);

  async function deleteTodo() {
    try {
      const newTodos = todos.filter(
        (todo) => todo.timestamp !== timestamp.toISOString(),
      );
      setTodos(newTodos);
      await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
      props.navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  const date = `${timestamp.getFullYear()}-${
    timestamp.getMonth() + 1
  }-${timestamp.getDate()}`;
  const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
  const styles = getThemedStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.timestamp}>{`${date} at ${time}`}</Text>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPressOut={deleteTodo} style={styles.deleteButton}>
        <Icon
          name="trash"
          color={theme === "light" ? colors.gray[100] : colors.gray[900]}
          size={18}
        />
        <Text style={styles.deleteButtonText}>Delete</Text>
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
    timestamp: {
      color: theme === "light" ? colors.gray[700] : colors.gray[300],
      marginTop: 16,
      paddingHorizontal: 16,
      textAlignVertical: "center",
    },
    text: {
      fontSize: 18,
      marginTop: 8,
      paddingHorizontal: 16,
      color: theme === "light" ? colors.gray[900] : colors.gray[100],
    },
    deleteButton: {
      alignItems: "center",
      backgroundColor: theme === "light" ? colors.red[700] : colors.red[300],
      borderRadius: 8,
      flexDirection: "row",
      height: 48,
      justifyContent: "center",
      marginHorizontal: 16,
      marginTop: 16,
    },
    deleteButtonText: {
      color: theme === "light" ? colors.gray[100] : colors.gray[900],
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 8,
    },
  });
}
