import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import {
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
  CalendarDaysIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import withDimensions from "./with-dimensions";

function TabBar({ state, descriptors, navigation }) {
  const { colorScheme } = useColorScheme();
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  const activeRouteIndex = state.index;

  const onTabBarPress = (routeIndex) => {
    Animated.spring(translateValue, {
      toValue: routeIndex * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start(); // the animation that animates the active tab circle
  };

  useEffect(() => {
    Animated.spring(translateValue, {
      toValue: activeRouteIndex * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  }, [activeRouteIndex]);

  useEffect(() => {
    translateValue.setValue(activeRouteIndex * tabWidth);
  }, [tabWidth]);

  const icon = (name, isFocused) => {
    const color = colorScheme === "dark" ? "white" : "black";
    switch (name) {
      case "Home":
        return <HomeIcon size={34} color={isFocused ? "#2dd4bf" : color} />;
      case "Dashboard":
        return <UsersIcon size={34} color={isFocused ? "#2dd4bf" : color} />;
      case "Messages":
        return (
          <ChatBubbleBottomCenterTextIcon
            size={34}
            color={isFocused ? "#2dd4bf" : color}
          />
        );
      case "Work":
        return (
          <CalendarDaysIcon size={34} color={isFocused ? "#2dd4bf" : color} />
        );
      default:
        return;
    }
  };

  return (
    <View className="flex-row h-20 py-2 items-center bg-white dark:bg-slate-800 border-t border-gray-200">
      <View className="absolute top-1">
        <Animated.View
          style={{
            width: tabWidth,
            transform: [{ translateX: translateValue }],
          }}
          className="h-full justify-center items-center"
        >
          <View className="w-12 h-12 bg-[#E1F5FE] rounded-full" />
        </Animated.View>
      </View>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = activeRouteIndex === index;

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

          onTabBarPress(index);
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
            className="flex-1 justify-center items-center z-10 space-y-2"
          >
            {icon(label, isFocused)}
            <Text className="dark:text-white">{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default withDimensions(TabBar);
