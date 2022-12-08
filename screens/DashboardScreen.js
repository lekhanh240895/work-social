import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  CheckBadgeIcon,
  CheckIcon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/solid";
import { UserPlusIcon } from "react-native-heroicons/outline";
import { useColorScheme } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import Posts from "../components/Posts";
import { useState } from "react";

const DashboardScreen = ({ navigation }) => {
  const { colorScheme } = useColorScheme();
  const [isFollowed, setIsFollowed] = useState(false);

  const renderHeader = () => {
    return (
      <>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity
            className="bg-slate-200 dark:bg-slate-600 p-2 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>

          <View className="flex-1 flex-row space-x-1 items-center justify-center">
            <Text className="text-2xl font-bold">khanhleeee</Text>
            <CheckBadgeIcon size={24} color="#2dd4bf" />
          </View>

          <TouchableOpacity>
            <EllipsisHorizontalIcon size={34} color="black" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View className="px-4 mt-2 flex-row items-center justify-between space-x-4">
          <View>
            <LinearGradient
              start={[0, 0.5]}
              end={[1, 0.1]}
              colors={["#8124BD", "#F2AD02", "#E60235"]}
              style={{ borderRadius: 100 }}
            >
              <View classNam="rounded-full">
                <Image
                  source={{ uri: "https://picsum.photos/500/500" }}
                  className="w-24 h-24 object-cover rounded-full m-1"
                />
              </View>
            </LinearGradient>
          </View>

          <View className="flex-row space-x-5">
            <View className="items-center">
              <Text className="text-xl font-bold">265</Text>
              <Text className="text-base">Posts</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">974K</Text>
              <Text className="text-base">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">444K</Text>
              <Text className="text-base">Following</Text>
            </View>
          </View>
        </View>

        <View className="px-4 mt-2">
          <Text className="text-xl font-bold">Lê Khánh</Text>
          <Text className="text-base text-gray-400">Influencer</Text>
          <Text className="text-base">
            writer of Vợ Người Ta - best music song 2022
          </Text>
        </View>

        <View className="px-4 my-4 flex-row space-x-2">
          {isFollowed ? (
            <TouchableOpacity
              className="flex-row space-x-1 px-2 flex-1 h-9 justify-center items-center rounded-md bg-gray-200"
              onPress={() => setIsFollowed(!isFollowed)}
            >
              <Text className="text-base font-semibold text-black">
                Following
              </Text>
              <CheckIcon size={16} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-row space-x-1 px-2 flex-1 h-9 justify-center items-center rounded-md bg-primary"
              onPress={() => setIsFollowed(!isFollowed)}
            >
              <Text className="text-base font-semibold text-white">Follow</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity className="px-2 flex-1 h-9 justify-center items-center rounded-md bg-gray-200">
            <Text className="text-base font-semibold">Message</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-2 flex-1 h-9 justify-center items-center rounded-md bg-gray-200">
            <Text className="text-base font-semibold">Email</Text>
          </TouchableOpacity>
          <TouchableOpacity className="h-9 p-2 justify-center items-center rounded-md bg-gray-200">
            <UserPlusIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* User Posts */}
      <Posts headerComponent={renderHeader} />
    </SafeAreaView>
  );
};

export default DashboardScreen;
