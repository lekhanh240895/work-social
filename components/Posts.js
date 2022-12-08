import { FlatList } from "react-native";
import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { worksSelector } from "../redux/selector";
const Posts = ({ headerComponent = null }) => {
  const { worksList } = useSelector(worksSelector);

  const renderItem = ({ item }) => <Post item={item} />;
  return (
    <FlatList
      data={worksList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={headerComponent}
    />
  );
};

export default Posts;
