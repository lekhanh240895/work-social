import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";

import TabBar from "../components/TabBar";
import DashboardScreen from "./DashboardScreen";
import HomeScreen from "./HomeScreen";
import MessagesScreen from "./MessagesScreen";
import WorkScreen from "./WorkScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "white",
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Work" component={WorkScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;
