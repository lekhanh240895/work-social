import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const withDimensions = (BaseComponent) => (props) => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
  });
  //setting the initial width;

  const handleOrientationChange = ({ window }) => {
    const { width } = window;
    setDimensions({ width });
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      handleOrientationChange
    );
    //when the component is mounted and the dimensions change, we will go to the handleOrientationChange function;
    return () => subscription?.remove();
    // when the component is unmounted, we will remove the event listener;
  }, []);

  return <BaseComponent dimensions={{ width: dimensions.width }} {...props} />;
};

export default withDimensions;
