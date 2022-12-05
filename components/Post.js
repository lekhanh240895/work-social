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
import { useColorScheme } from "nativewind";

const Post = () => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="bg-white dark:bg-slate-800 py-4 px-2 border-b-8 border-slate-200 dark:border-black">
      <View className="flex-row justify-between space-x-3 mb-2">
        <Avatar
          className="w-14 h-14"
          source={{ uri: "https://picsum.photos/500/500" }}
        />
        <View className="flex-1 space-y-1">
          <Text className="dark:text-white font-bold text-xl">Lê Khánh</Text>
          <Text className="text-gray-400">10 giờ</Text>
        </View>
        <TouchableOpacity>
          <EllipsisHorizontalIcon
            size="36"
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <Text className="dark:text-white text-lg mb-3">
        Mới cưới về cái sinh 3 luôn. Lấy đúng người thì mãi là trẻ con 🥰
      </Text>
      <Image
        source={{
          uri: "https://picsum.photos/500/500",
        }}
        className="max-w-full h-96"
      />
    </SafeAreaView>
  );
};

export default Post;
