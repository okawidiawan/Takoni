import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";

const Register = ({ navigation }) => {
  // Datepicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select Date");

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Lower 1", value: "Lower 1" },
    { label: "Lower 2", value: "Lower 2" },
    { label: "Middle 1", value: "Middle 1" },
    { label: "Middle 2", value: "Middle 2" },
    { label: "Upper 1", value: "Upper 1" },
    { label: "Upper 2", value: "Upper 2" },
  ]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split("T");
    console.log(x);
    const x1 = x[0].split("-");
    console.log(x1);
    let fDate = x1[0] + "/" + x1[1] + "/" + x1[2];
    console.log(fDate);
    setSelectedDate(fDate);
    hideDatePicker();
  };

  const onPressToLoginAfteRegister = () => {
    navigation.navigate("Login");
  };

  const onPressToLogin = () => {
    navigation.navigate("Login");
  };

  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    Quicksand: require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", marginVertical: 20, paddingVertical: 30 }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Join Takoni,</Text>
          <Text style={styles.headerTitle}>for free</Text>
          <View style={styles.headerBorder} />
          <Text style={styles.headerSubTitle}>Register and discover your target market.</Text>
        </View>

        <View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.inputText} placeholder="enter your username" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.inputText} placeholder="enter your name" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.inputText} placeholder="enter your password" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.inputText} placeholder="enter your phone number" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthdate</Text>
            <TouchableOpacity style={{ backgroundColor: "#F4F7FF", paddingVertical: 6, paddingLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: "#DBDEE5" }} title="Show Date Picker" onPress={showDatePicker}>
              <Text style={{ fontFamily: "Quicksand-Semibold", color: "#3E4154", fontSize: 16 }}>{selectedDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.inputText} placeholder="enter your city" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.inputText} placeholder="enter your address" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>SES</Text>
            {/* <TextInput style={styles.inputText} placeholder="enter your SES" placeholderTextColor="#CBD1D9"></TextInput> */}
            <DropDownPicker open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, {}]} onPress={onPressToLoginAfteRegister}>
              <Text style={[styles.label, { color: "white", padding: 5 }]}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: 14, fontFamily: "Quicksand", textAlign: "center" }]}>Or you already have an account, just</Text>
            <TouchableOpacity>
              <Text style={[styles.label, { fontSize: 14, fontFamily: "Quicksand-Bold", textAlign: "center" }]} onPress={onPressToLogin}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FF",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // borderWidth: 1,
  },

  card: {
    width: "90%",
    color: "white",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
  },

  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#3E4154",
    paddingVertical: 20,
    paddingLeft: 20,
  },

  headerBorder: {
    width: 200,
    height: 5,
    backgroundColor: "#34D399",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
  },

  headerTitle: {
    fontSize: 24,
    color: "white",
    fontFamily: "Quicksand-Bold",
  },

  headerSubTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Quicksand",
  },

  inputGroup: {
    // borderWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Quicksand-Semibold",
  },

  inputText: {
    fontSize: 16,
    paddingLeft: 10,
    height: 35,
    backgroundColor: "#F4F7FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DBDEE5",
    fontFamily: "Quicksand-Semibold",
    color: "#3E4154",
  },

  buttonGroup: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#3E4154",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: 10,
  },
});

export default Register;
