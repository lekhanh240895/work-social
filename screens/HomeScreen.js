import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { useColorScheme } from "nativewind";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  BellAlertIcon,
  PhotoIcon,
  ArrowRightCircleIcon,
} from "react-native-heroicons/solid";
import Posts from "../components/Posts";
import Avatar from "../components/Avatar";

const HomeScreen = ({ navigation }) => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-slate-200 dark:bg-black">
      <ScrollView>
        {/* Header */}
        <View className="py-5 border-b border-b-gray-400 bg-white dark:bg-slate-800">
          <View className="flex-row justify-between items-center h-14 p-4 mb-5">
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

            <View className="flex-row items-center space-x-3 ">
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

          {/* Navigation */}
          <View className="flex-row items-center justify-between space-x-2 px-4">
            <TouchableOpacity>
              <HomeIcon
                color={colorScheme === "dark" ? "white" : "black"}
                size={38}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <UsersIcon
                color={colorScheme === "dark" ? "white" : "black"}
                size={38}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <ChatBubbleBottomCenterTextIcon
                color={colorScheme === "dark" ? "white" : "black"}
                size={38}
              />
            </TouchableOpacity>
            <TouchableOpacity className="-rotate-12">
              <BellAlertIcon
                color={colorScheme === "dark" ? "white" : "black"}
                size={38}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Bar */}
        <View className="bg-white dark:bg-slate-800 flex-row justify-between items-center space-x-3 p-4 mb-2">
          <Avatar
            className="w-12 h-12"
            source={{ uri: "https://picsum.photos/500/500" }}
          />
          <TextInput
            className="flex-1 bg-slate-200 dark:bg-slate-600 dark:text-white px-4 rounded-full h-12"
            placeholder="Ngày làm việc của bạn thế nào?"
            placeholderTextColor={colorScheme === "dark" ? "white" : "default"}
          />
          <TouchableOpacity>
            <PhotoIcon
              color={colorScheme === "dark" ? "white" : "black"}
              size={40}
            />
          </TouchableOpacity>
        </View>

        {/* Work remind text */}
        <TouchableOpacity
          activeOpacity={colorScheme === "dark" && 0.7}
          className="bg-white dark:bg-slate-800 flex-row items-center justify-between mb-2 px-4 space-x-2 h-20"
          onPress={() => navigation.navigate("WorkScreen")}
        >
          <Text className="flex-1 dark:text-white text-lg font-bold italic">
            Đừng quên chấm công hôm nay nhé
          </Text>

          <ArrowRightCircleIcon
            color={colorScheme === "dark" ? "white" : "#2dd4bf"}
            size={48}
          />
        </TouchableOpacity>

        {/* Posts */}
        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
