import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../assets/colors";
import ThemeContext from "../contexts/ThemeContext";
import TodosContext from "../contexts/TodosContext";

export default function NewTodoScreen(props) {
  const [theme, _setTheme] = useContext(ThemeContext);
  const [todos, setTodos] = useContext(TodosContext);
  const [input, setInput] = useState("");

  async function storeTodo(newTodo) {
    try {
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
    } catch (error) {
      console.error(error);
    }
  }

  const styles = getThemedStyles(theme);
  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        onChangeText={setInput}
        placeholder="Write your new todo..."
        placeholderTextColor={
          theme === "light" ? colors.gray[700] : colors.gray[300]
        }
        style={styles.textInput}
      />
      <Pressable
        onPressOut={() => {
          if (input === "") return;
          storeTodo({
            text: input.trim(),
            timestamp: new Date().toISOString(),
          });
          props.navigation.goBack();
        }}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </Pressable>
    </View>
  );
}

function getThemedStyles(theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? colors.gray[100] : colors.gray[900],
      flex: 1,
      padding: 16,
    },
    textInput: {
      color: theme === "light" ? colors.gray[900] : colors.gray[100],
      flex: 1,
      fontSize: 18,
      textAlignVertical: "top",
    },
    createButton: {
      alignItems: "center",
      backgroundColor: theme === "light" ? colors.blue[700] : colors.blue[300],
      borderRadius: 8,
      color: theme === "light" ? colors.gray[100] : colors.gray[900],
      height: 56,
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    createButtonText: {
      fontSize: 18,
      fontWeight: "700",
      color: theme === "light" ? colors.gray[100] : colors.gray[900],
    },
  });
}
