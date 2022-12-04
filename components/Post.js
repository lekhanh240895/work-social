import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { ClockIcon } from "react-native-heroicons/outline";
import { useColorScheme } from "nativewind";

const Post = ({ item }) => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="bg-white dark:bg-slate-800 last:border-b-0 border-b-8 border-slate-200 dark:border-black">
      <View className="px-4 my-3">
        <View className="flex-row justify-between space-x-3 mb-2">
          <Avatar
            className="w-14 h-14 object-cover"
            source={{ uri: "https://picsum.photos/500/500" }}
          />
          <View className="flex-1 space-y-2">
            <Text className="dark:text-white font-semibold text-xl ">
              Lê Khánh
            </Text>
            <View className="flex-row space-x-2">
              <ClockIcon size={18} color="gray" />
              <Text className="text-gray-400">
                <Text>{item.date} - </Text>
                <Text className="text-gray-400">
                  {item.startTime} - {item.endTime}
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <EllipsisHorizontalIcon
              size="26"
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        {item.status && (
          <Text className="dark:text-white text-lg">{item.status}</Text>
        )}
      </View>

      <Image
        source={{
          uri: "https://picsum.photos/500/500",
        }}
        className="w-full h-96"
        resizeMode="cover"
      />
    </SafeAreaView>
  );
};

export default Post;
