import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import colors from "../assets/colors";
import ThemeContext from "../contexts/ThemeContext";
import TodosContext from "../contexts/TodosContext";

export default function TodosScreen(props) {
  const [todos, _setTodos] = useContext(TodosContext);
  const [theme, _setTheme] = useContext(ThemeContext);

  const styles = getThemedStyles(theme);
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => props.navigation.navigate("Todo", item)}
            style={styles.todo}
          >
            <Text style={styles.todoText}>{item.text}</Text>
          </Pressable>
        )}
      />
      <Pressable
        onPressOut={() => props.navigation.navigate("New Todo")}
        style={styles.addTodoButton}
      >
        <Icon
          name="plus"
          color={theme === "light" ? colors.gray[100] : colors.gray[900]}
          size={24}
        />
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
    settingsButton: {
      alignItems: "center",
      backgroundColor: theme === "light" ? colors.blue[700] : colors.blue[300],
      borderRadius: 8,
      height: 48,
      justifyContent: "center",
      marginBottom: 8,
      marginHorizontal: 16,
      marginTop: 16,
      padding: 8,
    },
    settingsButtonText: {
      color: theme === "light" ? colors.gray[100] : colors.gray[900],
      fontSize: 16,
      fontWeight: "700",
    },
    todo: {
      borderRadius: 8,
      minHeight: 48,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    todoText: {
      color: theme === "light" ? colors.gray[900] : colors.gray[100],
      fontSize: 16,
    },
    addTodoButton: {
      alignItems: "center",
      backgroundColor: theme === "light" ? colors.blue[700] : colors.blue[300],
      borderRadius: 9999,
      bottom: 32,
      elevation: 4,
      height: 64,
      justifyContent: "center",
      position: "absolute",
      right: 32,
      width: 64,
    },
  });
}
