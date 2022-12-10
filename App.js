import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import colors from "./assets/colors";
import NewTodosScreen from "./components/NewTodoScreen";
import SettingsScreen from "./components/SettingsScreen";
import TodoScreen from "./components/TodoScreen";
import TodosScreen from "./components/TodosScreen";
import ThemeContext from "./contexts/ThemeContext";
import TodosContext from "./contexts/TodosContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme === null) {
          await AsyncStorage.setItem("theme", "light");
          return;
        }
        setTheme(storedTheme);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos === null) {
          await AsyncStorage.setItem("todos", JSON.stringify([]));
          return;
        }
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const styles = getThemedStyles(theme);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <TodosContext.Provider value={[todos, setTodos]}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor:
                    theme === "light" ? colors.gray[100] : colors.gray[900],
                },
                headerTintColor:
                  theme === "light" ? colors.gray[900] : colors.gray[100],
              }}
            >
              <Stack.Screen
                name="Todos"
                component={TodosScreen}
                options={({ navigation }) => ({
                  headerRight: () => (
                    <Pressable
                      onPressOut={() => navigation.navigate("Settings")}
                      style={styles.settingsButton}
                    >
                      <Icon
                        name="gear"
                        size={20}
                        color={
                          theme === "light"
                            ? colors.gray[900]
                            : colors.gray[100]
                        }
                      />
                    </Pressable>
                  ),
                })}
              />
              <Stack.Screen name="Todo" component={TodoScreen} />
              <Stack.Screen name="New Todo" component={NewTodosScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </TodosContext.Provider>
    </ThemeContext.Provider>
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
      height: 48,
      justifyContent: "center",
      width: 48,
    },
  });
}
