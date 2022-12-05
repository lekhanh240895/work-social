import { SafeAreaView } from "react-native";
import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <SafeAreaView className="flex-1">
      <Post />
      <Post />
      <Post />
      <Post />
    </SafeAreaView>
  );
};

export default Posts;
