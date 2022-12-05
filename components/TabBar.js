import { useColorScheme } from "nativewind";
import { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import {
  CalendarDaysIcon,
  HomeIcon,
  UsersIcon,
} from "react-native-heroicons/solid";

export default function MyTabBar({ state, descriptors, navigation }) {
  const { colorScheme } = useColorScheme();
  const translateValue = useRef(new Animated.Value(0)).current;
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;

  const onTabBarPress = (routeIndex) => {
    Animated.spring(translateValue, {
      toValue: routeIndex * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start(); // the animation that animates the active tab circle
  };

  const icon = (name, isFocused) => {
    const color = colorScheme === "dark" ? "white" : "black";
    switch (name) {
      case "Home":
        return <HomeIcon size={34} color={isFocused ? "#2dd4bf" : color} />;
      case "Dashboard":
        return <UsersIcon size={34} color={isFocused ? "#2dd4bf" : color} />;
      case "Work":
        return (
          <CalendarDaysIcon size={34} color={isFocused ? "#2dd4bf" : color} />
        );
      default:
        return;
    }
  };

  return (
    <View className="flex-row justify-between p-5 bg-white dark:bg-slate-800 ">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }

          onTabBarPress(index + 1);
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="items-center"
          >
            <View className="bg-[#E1F5FE] rounded-full p-2">
              {icon(label, isFocused)}
            </View>
            <Text className="dark:text-white">{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
