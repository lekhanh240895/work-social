import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, View, Text, SafeAreaView } from "react-native";
import { appSelector } from "../redux/selector";
import { hideWorkModal } from "../redux/slices/appSlice";

const WorkModal = () => {
  const { workModalShowed } = useSelector(appSelector);
  const dispatch = useDispatch();
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={workModalShowed}
      onRequestClose={() => {
        dispatch(hideWorkModal());
      }}
    >
      <View className="w-full h-1/4 absolute bottom-0 bg-slate-200 rounded-tl-lg rounded-tr-lg">
        <Text>Modal is open!</Text>
      </View>
    </Modal>
  );
};

export default WorkModal;
