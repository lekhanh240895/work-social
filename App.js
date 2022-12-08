import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import WorkModalScreen from "./screens/WorkModalScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            statusBarStyle: "dark",
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="WorkModal"
            component={WorkModalScreen}
            options={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
