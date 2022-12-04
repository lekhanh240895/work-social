import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Avatar = ({
  source = {
    uri: "https://picsum.photos/500/500",
  },
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
      <Image {...props} source={source} className="w-12 h-12 rounded-full" />
    </TouchableOpacity>
  );
};

export default Avatar;
