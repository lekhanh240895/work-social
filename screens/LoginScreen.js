import {
  Text,
  SafeAreaView,
  Image,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useColorScheme } from "nativewind";

const LoginScreen = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark");

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleColorScheme();
  };
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-800 items-center justify-center">
      <View className="absolute left-5 top-5">
        {isEnabled ? (
          <Image
            source={require("../assets/images/moon-removebg.png")}
            className="w-12 h-12"
          />
        ) : (
          <Image
            source={require("../assets/images/sun.png")}
            className="w-12 h-12"
          />
        )}
      </View>

      <Switch
        className="absolute top-5 right-5 scale-150"
        trackColor={{ false: "#767577", true: "#fff" }}
        thumbColor={isEnabled ? "#2dd4bf" : "#f4f3f4"}
        ios_backgroundColor="#fff"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      {isEnabled ? (
        <Image
          source={require("../assets/images/ws-dark-removebg-preview.png")}
          className="w-72 h-72"
        />
      ) : (
        <Image
          source={require("../assets/images/ws-removebg-preview.png")}
          className="w-72 h-72"
        />
      )}

      <Text className="dark:text-white text-3xl font-extrabold mb-1 -mt-10">
        Work Social
      </Text>
      <Text className="dark:text-slate-200 text-lg mb-5">
        Mạng xã hội công việc
      </Text>

      <TouchableOpacity
        className="bg-teal-400 dark:bg-white p-4 mb-3 w-72 rounded-md"
        activeOpacity={isEnabled ? 0.8 : 0.5}
        onPress={() => navigation.navigate("Main")}
      >
        <Text className="text-white dark:text-black text-center">
          Đăng nhập bằng username/email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-teal-400 dark:bg-white p-4 mb-3 w-72 rounded-md"
        activeOpacity={isEnabled ? 0.8 : 0.5}
        onPress={() => navigation.navigate("Main")}
      >
        <Text className="text-white dark:text-black text-center">
          Đăng nhập bằng Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-teal-400 dark:bg-white p-4 mb-3 w-72 rounded-md"
        activeOpacity={isEnabled ? 0.8 : 0.5}
        onPress={() => navigation.navigate("Main")}
      >
        <Text className="text-white dark:text-black text-center">
          Đăng nhập bằng Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;