import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "nativewind";
import { MagnifyingGlassIcon, Bars3Icon } from "react-native-heroicons/solid";
import { PhotoIcon } from "react-native-heroicons/outline";
import Posts from "../components/Posts";
import Avatar from "../components/Avatar";

const HomeScreen = ({ navigation }) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-slate-200 dark:bg-black">
      {/* Header */}
      <View className="border-b border-b-gray-400 bg-white dark:bg-slate-800">
        <View className="px-2 flex-row justify-between items-center">
          <View>
            {colorScheme === "dark" ? (
              <TouchableOpacity className="bg-transparent -m-5">
                <Image
                  source={require("../assets/images/ws-dark-removebg-preview.png")}
                  className="w-20 h-20"
                />
              </TouchableOpacity>
            ) : (
              <Image
                source={require("../assets/images/ws-removebg-preview.png")}
                className="w-20 h-20"
              />
            )}
          </View>

          <View className="flex-row items-center space-x-3">
            <TouchableOpacity className="p-2 bg-slate-200  dark:bg-gray-600 rounded-full">
              <MagnifyingGlassIcon
                color={colorScheme === "dark" ? "white" : "black"}
                size={29}
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-slate-200 dark:bg-gray-600 rounded-full">
              <Bars3Icon
                color={colorScheme === "dark" ? "white" : "black"}
                size={29}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Status Bar */}
      <View className="bg-white dark:bg-slate-800 flex-row justify-between items-center space-x-3 p-4 mb-2">
        <Avatar
          className="w-12 h-12"
          source={{ uri: "https://picsum.photos/500/500" }}
        />

        <TouchableOpacity
          className="flex-1"
          onPress={() => navigation.navigate("WorkModal", {})}
        >
          <TextInput
            className=" bg-slate-200 dark:bg-slate-600 dark:text-white px-4 rounded-lg h-12"
            placeholder="Ngày làm việc của bạn thế nào?"
            placeholderTextColor={colorScheme === "dark" ? "white" : "default"}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("WorkModal", {})}>
          <PhotoIcon
            color={colorScheme === "dark" ? "white" : "black"}
            size={40}
          />
        </TouchableOpacity>
      </View>

      {/* Posts */}
      <View className="flex-1">
        <Posts />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
