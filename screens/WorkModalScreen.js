import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import {
  ClockIcon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { PhotoIcon } from "react-native-heroicons/outline";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Slider } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";

import { appSelector } from "../redux/selector";
import Avatar from "../components/Avatar";
import { useColorScheme } from "nativewind";
import { addWork, updateWork } from "../redux/slices/worksSlice";

const WorkModalScreen = ({ navigation, route }) => {
  const { selectedDay } = useSelector(appSelector);
  const { colorScheme } = useColorScheme();
  const [selectType, setSelectType] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState(null);
  const [value, setValue] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("");
  const { dayMarked } = route.params || {};
  const dispatch = useDispatch();

  console.log({ date });

  useEffect(() => {
    const dateWithouthSecond = new Date()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .slice(0, 5);

    if (dayMarked) {
      const { startTime, endTime, workCount, status } = dayMarked;
      setStartTime(startTime);
      setEndTime(endTime);
      setValue(workCount);
      setStatus(status);
    } else {
      setStartTime(dateWithouthSecond);
      setEndTime(dateWithouthSecond);
    }
  }, [dayMarked]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    setDate(new Date(selectedDay?.timestamp));
  }, [selectedDay]);

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  useEffect(() => {
    if (selectType === "start") {
      setStartTime(selectedTime);
    } else if (selectType === "end") {
      setEndTime(selectedTime);
    }
  }, [selectedTime]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    const hoursAndMinutes =
      padTo2Digits(currentDate.getHours()) +
      ":" +
      padTo2Digits(currentDate.getMinutes());

    setSelectedTime(hoursAndMinutes);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleSave = () => {
    const workDate = {
      id: Date.now(),
      date: selectedDay.dateString,
      workCount: value,
      startTime,
      endTime,
      status,
      attachments: [selectedImage],
      selected: true,
    };
    if (dayMarked) {
      dispatch(
        updateWork({
          ...workDate,
          id: dayMarked.id,
        })
      );
    } else {
      dispatch(addWork(workDate));
    }
    navigation.goBack();
    setStatus(0);
    setValue(1);
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-800">
      {/* Header */}
      <View className="fixed top-0 w-full p-4 bg-white dark:bg-slate-800 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity
              className="bg-slate-200 dark:bg-slate-600 p-2 rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <Text className="dark:text-white text-lg">Chấm công</Text>
          </View>

          <TouchableOpacity className="bg-primary py-2 px-4 rounded items-center justify-center">
            <Text
              className="dark:text-white text-white text-base"
              onPress={handleSave}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View className="flex-1 px-4 mt-5">
          <Text className="dark:text-white text-2xl font-semibold text-center">
            Ngày: {selectedDay?.dateString}
          </Text>

          <View className="flex-row mt-5 space-x-10">
            <View className="flex-row space-x-4 items-center">
              <Text className="dark:text-white text-lg">Giờ bắt đầu:</Text>
              <TouchableOpacity
                onPress={() => {
                  showTimepicker();
                  setSelectType("start");
                }}
                className="p-2 border border-slate-400 rounded "
              >
                <Text className="dark:text-white">{startTime}</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row space-x-4 items-center">
              <Text className="dark:text-white text-lg">Giờ nghỉ:</Text>

              <TouchableOpacity
                onPress={() => {
                  showTimepicker();
                  setSelectType("end");
                }}
                className="p-2 border border-slate-400 rounded "
              >
                <Text className="dark:text-white">{endTime}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-4 flex-row items-center">
            <Text className="dark:text-white text-lg w-32">
              <Text>Số công: </Text>
              <Text className="dark:text-white text-xl font-bold">{value}</Text>
            </Text>

            <View className="flex-1">
              <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={2}
                minimumValue={0}
                step={0.5}
                allowTouchTrack
                trackStyle={{
                  height: 4,
                  width: "100%",
                }}
                thumbStyle={{
                  height: 26,
                  width: 26,
                  backgroundColor: "transparent",
                }}
                thumbProps={{
                  children: (
                    <View className="absolute bottom-0 bg-slate-800 rounded-full">
                      <ClockIcon size={26} color="white" />
                    </View>
                  ),
                }}
              />
            </View>
          </View>

          <View className="flex-1">
            <View className="flex-row space-x-2 my-4 items-stretch">
              <Avatar
                source={{ uri: "https://picsum.photos/500/500" }}
                className="w-14 h-14"
              />
              <View className="space-y-1">
                <Text className="dark:text-white">Lê Khánh</Text>
                <Text className="dark:text-white bg-slate-200 px-2 py-1 rounded-lg text-gray-600">
                  Công khai
                </Text>
              </View>
            </View>

            <TextInput
              placeholder="Ngày làm việc của bạn như thế nào?"
              className="text-base leading-6 mb-4"
              multiline={true}
              underlineColorAndroid="transparent"
              placeholderTextColor={colorScheme === "dark" && "white"}
              style={{
                color: colorScheme === "dark" && "white",
              }}
              value={status}
              onChangeText={setStatus}
              autoFocus={true}
            />

            {selectedImage && (
              <View className="mb-4">
                <Image
                  source={{ uri: selectedImage }}
                  className="w-full h-96"
                  resizeMode="cover"
                />

                <TouchableOpacity
                  className="bg-slate-200 p-2 absolute top-2 right-2 rounded-full"
                  onPress={() => setSelectedImage("")}
                >
                  <XMarkIcon size={28} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <SafeAreaView className="absolute bottom-0 w-full bg-white dark:bg-slate-800 border-t border-gray-300">
        <View className="px-4 py-1 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={pickImageAsync}
            className="bg-white dark:bg-gray-600 p-2 rounded-full"
          >
            {colorScheme === "dark" ? (
              <PhotoIcon size={24} color="white" />
            ) : (
              <PhotoIcon size={40} color="#2dd4bf" />
            )}
          </TouchableOpacity>

          <TouchableOpacity className="bg-slate-200 dark:bg-gray-600 p-2 rounded-full">
            <EllipsisHorizontalIcon
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WorkModalScreen;
