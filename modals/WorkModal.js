import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { appSelector } from "../redux/selector";
import { hideWorkModal } from "../redux/slices/appSlice";

const WorkModal = () => {
  const { workModalShowed, selectedDay } = useSelector(appSelector);
  const [selectType, setSelectType] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setDate(new Date(selectedDay?.timestamp));
  }, [selectedDay]);

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    const hoursAndMinutes =
      padTo2Digits(currentDate.getHours()) +
      ":" +
      padTo2Digits(currentDate.getMinutes());

    if (selectType === "start") {
      setStartTime(hoursAndMinutes);
    } else if (selectType === "end") {
      setEndTime(hoursAndMinutes);
    }
  };

  const showMode = (currentMode, type) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = (type) => {
    showMode("time", type);
    setSelectType(type);
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
        className="w-full h-2/6 p-4 absolute bottom-0 bg-white rounded-tl-lg rounded-tr-lg mt-5"
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

        <View className="flex-row mt-4 space-x-2">
          <TouchableOpacity
            onPress={() => {
              showTimepicker("start");
            }}
            className="p-2 border border-slate-400 rounded "
          >
            <Text>{startTime ? startTime : "Giờ bắt đầu"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              showTimepicker("end");
            }}
            className="p-2 border border-slate-400 rounded "
          >
            <Text>{endTime ? endTime : "Giờ nghỉ"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WorkModal;
