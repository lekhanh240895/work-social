import { View, Text, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import WorkModal from "../modals/WorkModal";
import { appSelector } from "../redux/selector";
import { showWorkModal } from "../redux/slices/appSlice";

const WorkScreen = () => {
  const { workModalShowed } = useSelector(appSelector);
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 bg-white py-10">
      <Text className="text-2xl font-bold text-center uppercase">
        Bảng chấm công
      </Text>

      <View className="flex-1 my-5 space-y-5">
        <Calendar // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            dispatch(showWorkModal());
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("Long press", day);
          }}
          markedDates={{
            "2022-12-16": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
            "2022-12-17": { marked: true },
            "2022-12-18": { marked: true, dotColor: "red", activeOpacity: 0 },
            "2022-12-19": { disabled: true, disableTouchEvent: true },
          }}
        />

        <Text className="text-xl font-bold text-center capitalize">
          Số công trong tháng 12 là 1
        </Text>
      </View>

      <Text className="px-2 text-lg font-bold">Ghi chú chấm công:</Text>
      <View className="px-2 flex-row justify-between space-x-2 flex-wrap">
        <View className="flex-row items-center space-x-1">
          <View className="w-16 h-4 bg-red-500" />
          <Text className="text-lg">: 0</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <View className="w-16 h-4 bg-primary" />
          <Text className="text-lg">: 0.5</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <View className="w-16 h-4 bg-slate-500" />
          <Text className="text-lg">: 1</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <View className="w-16 h-4 bg-pink-400" />
          <Text className="text-lg">: 1.5</Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <View className="w-16 h-4 bg-yellow-400" />
          <Text className="text-lg">: 2</Text>
        </View>
      </View>

      <WorkModal />
    </SafeAreaView>
  );
};

export default WorkScreen;
