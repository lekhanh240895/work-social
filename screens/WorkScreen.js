import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Overlay } from "@rneui/themed";
import { setSelectedDay } from "../redux/slices/appSlice";
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { worksSelector } from "../redux/selector";

const WorkScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colorScheme } = useColorScheme();
  const [visible, setVisible] = useState(false);
  const { worksList } = useSelector(worksSelector);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const totalWorkCount = useMemo(
    () =>
      worksList?.reduce((total, workdate) => (total += workdate.workCount), 0),
    [worksList]
  );

  const dotColor = (num) => {
    switch (num) {
      case 0:
        return "#ef4444";
      case 0.5:
        return "#6e748b";
      case 1:
        return "#2dd4bf";
      case 1.5:
        return "#fb923c";
      case 2:
        return "#6366f1";
      default:
        return;
    }
  };

  const renderMarkedDates = () => {
    const obj = {};
    worksList?.forEach((workDate) => {
      obj[workDate.date] = {
        // dotColor: dotColor(workDate.workCount),
        selected: workDate.selected,
        selectedColor: dotColor(workDate.workCount),
        marked: true,
      };
    });
    return obj;
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-800">
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

        <Text className="text-2xl dark:text-white font-bold text-center uppercase">
          Bảng chấm công
        </Text>

        <TouchableOpacity>
          <EllipsisHorizontalIcon size={34} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 my-5 space-y-5">
        <Calendar // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            const dayMarked = worksList?.find(
              (workdate) => workdate.date === day.dateString
            );
            dispatch(setSelectedDay(day));
            navigation.navigate("WorkModal", {
              dayMarked,
            });
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            dispatch(setSelectedDay(day));
            dispatch(showWorkModal());
          }}
          markedDates={renderMarkedDates()}
          theme={{
            backgroundColor: "inherit",
            calendarBackground: "inherit",
            textDisabledColor: colorScheme === "dark" ? "#898888" : "#b5b5b5",
            dayTextColor: colorScheme === "dark" ? "white" : "black",
            arrowColor: colorScheme === "dark" ? "white" : "default",
            monthTextColor: colorScheme === "dark" ? "white" : "default",
          }}
        />

        <View className="text-xl dark:text-white text-center space-y-4">
          <Text className="text-xl dark:text-white text-center">
            Số công trong tháng 12 của bạn
          </Text>
          <Text className="text-5xl font-extrabold dark:text-white text-center">
            {totalWorkCount}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={toggleOverlay}
        className="absolute bottom-6 right-6 bg-slate-600 p-3 rounded-full"
      >
        <Icon name="question" color="white" type="antdesign" size={34} />
      </TouchableOpacity>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: "90%",
          borderRadius: 8,
          padding: 0,
        }}
      >
        <View className="w-full h-96">
          <Text className="p-4 text-xl dark:text-white font-semibold text-center">
            Kí hiệu công làm việc
          </Text>

          <TouchableOpacity
            onPress={toggleOverlay}
            className="absolute top-3 right-3"
          >
            <XMarkIcon size={30} color="black" />
          </TouchableOpacity>

          <View className="flex-1 p-4 space-y-4">
            <View className="flex-row items-center space-x-3">
              <View className="w-40 h-4 rounded-full bg-[#00adf5] mt-1" />
              <Text className="text-lg dark:text-white">:</Text>
              <Text className="text-lg dark:text-white">Ngày hôm nay</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-40 h-4 rounded-full bg-red-500 mt-1" />
              <Text className="text-lg dark:text-white">:</Text>
              <Text className="text-lg dark:text-white">0 ngày công</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-40 h-4 rounded-full  mt-1 bg-slate-500" />
              <Text className="text-lg dark:text-white">:</Text>
              <Text className="text-lg dark:text-white">0.5 ngày công</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-40 h-4 rounded-full mt-1 bg-primary" />
              <Text className="text-lg dark:text-white">:</Text>
              <Text className="text-lg dark:text-white">1 ngày công</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-40 h-4 rounded-full  mt-1 bg-orange-400" />
              <Text className="text-lg dark:text-white">:</Text>
              <Text className="text-lg dark:text-white">1.5 ngày công</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <View className="w-40 h-4 rounded-full  mt-1 bg-indigo-500" />
              <Text className="text-lg dark:text-white">:</Text>
              <Text className="text-lg dark:text-white">2 ngày công</Text>
            </View>
          </View>

          <Text className="text-lg p-2">
            <Text className="text-bold underline">Chú ý</Text>
            <Text>: Chọn ngày để bắt đầu chấm công</Text>
          </Text>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default WorkScreen;
