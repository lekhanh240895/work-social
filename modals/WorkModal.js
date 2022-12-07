import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { appSelector } from "../redux/selector";
import { hideWorkModal } from "../redux/slices/appSlice";
import { CheckBox, Icon } from "@rneui/themed";

const WorkModal = () => {
  const { workModalShowed, selectedDay } = useSelector(appSelector);
  const [selectType, setSelectType] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();
  const [check2, setCheck2] = useState(false);

  useEffect(() => {
    setDate(new Date(selectedDay?.timestamp));
  }, [selectedDay]);

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  const dateWithouthSecond = new Date()
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .slice(0, 5);

  useEffect(() => {
    if (selectType === "start") {
      setStartTime(selectedTime);
    } else {
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

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={workModalShowed}
      onRequestClose={() => {
        dispatch(hideWorkModal());
      }}
    >
      <View
        className="w-full h-2/5 p-4 absolute bottom-0 bg-white rounded-tl-lg rounded-tr-lg mt-5"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
      >
        <TouchableOpacity
          className="absolute top-3 right-3 bg-slate-200 p-2 rounded-full z-10"
          onPress={() => dispatch(hideWorkModal())}
        >
          <XMarkIcon size={24} color="black" opacity={0.8} />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-center">
          Ngày: {selectedDay?.dateString}
        </Text>

        <View className="flex-row mt-5 space-x-10">
          <View className="flex-row space-x-4 items-center">
            <Text className="text-lg">Giờ bắt đầu:</Text>
            <TouchableOpacity
              onPress={() => {
                showTimepicker();
                setSelectType("start");
              }}
              className="p-2 border border-slate-400 rounded "
            >
              <Text>{startTime ? startTime : dateWithouthSecond}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-4 items-center">
            <Text className="text-lg">Giờ nghỉ:</Text>

            <TouchableOpacity
              onPress={() => {
                showTimepicker();
                setSelectType("end");
              }}
              className="p-2 border border-slate-400 rounded "
            >
              <Text>{endTime ? endTime : dateWithouthSecond}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-4 flex-row items-center space-x-4">
          <Text className="text-lg">Ngày công:</Text>
          <View className="flex-row items-center space-x-2">
            <CheckBox
              center
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="green"
                  size={25}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                />
              }
              checked={check2}
              onPress={() => setCheck2(!check2)}
              title="1"
              wrapperStyle={{
                justifyContent: "flex-start",
              }}
              containerStyle={{
                padding: 0,
                margin: 0,
              }}
              textStyle={{ fontSize: 22, marginLeft: 5 }}
            />
            <CheckBox
              center
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="green"
                  size={25}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                />
              }
              checked={check2}
              onPress={() => setCheck2(!check2)}
              title="1"
              wrapperStyle={{
                justifyContent: "flex-start",
              }}
              containerStyle={{
                padding: 0,
                margin: 0,
              }}
              textStyle={{ fontSize: 22, marginLeft: 5 }}
            />
          </View>
        </View>

        <View className="flex-row space-x-4 items-center my-4">
          <Text className="text-lg">Note:</Text>
          <TextInput
            placeholder="Ghi chú ngày làm việc của bạn"
            className="flex-1 bg-slate-200 p-4 rounded-lg"
          />
        </View>

        <View className="flex-row space-x-4 justify-end">
          <TouchableOpacity className="bg-slate-200 h-10 items-center justify-center w-16 rounded-lg">
            <Text className="text-base">Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 h-10 items-center justify-center w-16 rounded-lg"
            onPress={() => dispatch(hideWorkModal())}
          >
            <Text className="text-base text-white">Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WorkModal;
