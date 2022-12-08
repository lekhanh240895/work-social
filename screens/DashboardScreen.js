import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  Bars3Icon,
  CheckBadgeIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import { useColorScheme } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";

const DashboardScreen = ({ navigation }) => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
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
        <TouchableOpacity>
          <Bars3Icon size={34} color="black" />
        </TouchableOpacity>
      </View>

      <View className="mt-4 items-center">
        <View className="mb-4">
          <Image
            source={{ uri: "https://picsum.photos/500/500" }}
            className="w-24 h-24 object-cover rounded-full"
          />
        </View>

        <TouchableOpacity>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            colors={["#EFBB35", "#4AAE9B"]}
            style={{ borderRadius: 5 }}
          >
            <View style={styles.circleGradient}>
              <Text style={styles.visit}>Login</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View className="flex-row space-x-3 items-center">
          <Text className="text-2xl font-bold">Lê Khánh</Text>
          <CheckBadgeIcon size={34} color="#2dd4bf" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },
  visit: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "white",
    color: "#008f68",
    fontSize: 12,
  },
});
