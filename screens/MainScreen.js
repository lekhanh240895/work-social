import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";
import {
  CalendarDaysIcon,
  HomeIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import MyTabBar from "../components/TabBar";

import DashboardScreen from "./DashboardScreen";
import HomeScreen from "./HomeScreen";
import WorkScreen from "./WorkScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ color }) => {
      //     switch (route.name) {
      //       case "Home":
      //         return <HomeIcon size={34} color={color} />;
      //       case "Dashboard":
      //         return <UsersIcon size={34} color={color} />;
      //       case "Work":
      //         return <CalendarDaysIcon size={34} color={color} />;
      //       default:
      //         return;
      //     }
      //   },
      //   headerShown: false,
      //   tabBarStyle: {
      //     backgroundColor: colorScheme === "dark" ? "#1e293b" : "white",
      //   },
      //   tabBarShowLabel: false,
      //   tabBarActiveTintColor: "#2dd4bf",
      //   tabBarInactiveTintColor: colorScheme === "dark" ? "white" : "black",
      // })}
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "white",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2dd4bf",
        tabBarInactiveTintColor: colorScheme === "dark" ? "white" : "black",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Work" component={WorkScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;
