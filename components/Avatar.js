import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Avatar = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
      <Image {...props} className="w-12 h-12 rounded-full" />
    </TouchableOpacity>
  );
};

export default Avatar;
