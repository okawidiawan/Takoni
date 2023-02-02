import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useFonts } from "expo-font";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const Register = ({ navigation }) => {
  const [inputUsername, setInputUsername] = useState();
  const [inputName, setInputName] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [inputPhoneNumber, setInputPhoneNumber] = useState();
  const [inputCity, setInputCity] = useState();
  const [inputAddress, setInputAddress] = useState();

  // Datepicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inputBirthdate, setInputBirthdate] = useState("BIRTHDATE");
  // console.log(birthdate);

  // Dropdown
  const [sesOpen, setSesOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  const [inputSes, setInputSes] = useState();
  const [inputGender, setInputGender] = useState();

  const [sesLabel, setSessLabel] = useState([
    { label: "LOWER 1", value: "Lower 1" },
    { label: "LOWER 2", value: "Lower 2" },
    { label: "MIDDLE 1", value: "Middle 1" },
    { label: "MIDDLE 2", value: "Middle 2" },
    { label: "UPPER 1", value: "Upper 1" },
    { label: "UPPER 2", value: "Upper 2" },
  ]);

  const [genderLabel, setGenderLabel] = useState([
    { label: "MALE", value: "Male" },
    { label: "FEMALE", value: "Female" },
  ]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // console.log(ses);
  // console.log(gender);

  const handleConfirm = (date) => {
    // console.log("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split("T");
    // console.log(x);
    const x1 = x[0].split("-");
    // console.log(x1);
    let fDate = x1[0] + "-" + x1[1] + "-" + x1[2];

    setInputBirthdate(fDate);
    hideDatePicker();
  };

  const addNewUser = () => {
    axios
      .post(`http://192.168.100.14:8080/api/user/register`, {
        ...inputUsername,
        ...inputName,
        ...inputPassword,
        ...inputPhoneNumber,
        birthdate: inputBirthdate,
        ...inputCity,
        ...inputAddress,
        ses: inputSes,
        gender: inputGender,
      })
      .then(() => {
        console.log(inputName);
        Alert.alert("Success Create New Account");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Failed to Create Account");
        console.log(error);
      });
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

  // console.log(username);
  // console.log(name);
  // console.log(password);
  // console.log(phoneNumber);
  // console.log(city);
  // console.log(address);
  // console.log(birthdate);
  // console.log(ses);
  // console.log(gender);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", marginVertical: 20, paddingVertical: 30, backgroundColor: "#F4F7FF" }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
      {/* <View style={styles.container}> */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Join Takoni for {"\n"} Free</Text>
          <Text style={styles.headerSubTitle}>Register and discover your market.</Text>
        </View>

        <View>
          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="EMAIL / USERNAME" placeholderTextColor="#CBD1D9" onChangeText={(newValue) => setInputUsername({ username: newValue })} />
            <MaterialCommunityIcons name="email" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="NAME" placeholderTextColor="#CBD1D9" onChangeText={(newValue) => setInputName({ name: newValue })} />
            <MaterialCommunityIcons name="account" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="PASSWORD" placeholderTextColor="#CBD1D9" onChangeText={(newValue) => setInputPassword({ password: newValue })} secureTextEntry />
            <MaterialCommunityIcons name="account-key" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="PHONE NUMBER" placeholderTextColor="#CBD1D9" onChangeText={(newValue) => setInputPhoneNumber({ phoneNumber: newValue })} />
            <MaterialCommunityIcons name="phone" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TouchableOpacity style={{ backgroundColor: "white", paddingVertical: 20, paddingLeft: 60, borderRadius: 10, borderWidth: 1, borderColor: "#DBDEE5" }} title="Show Date Picker" onPress={showDatePicker}>
              {inputBirthdate === "BIRTHDATE" ? (
                <Text style={{ fontFamily: "Quicksand-Semibold", color: "#3E4154", fontSize: 18, opacity: 0.3 }}>{inputBirthdate}</Text>
              ) : (
                <Text style={{ fontFamily: "Quicksand-Semibold", color: "#3E4154", fontSize: 18 }}>{inputBirthdate}</Text>
              )}
            </TouchableOpacity>

            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />

            <MaterialCommunityIcons name="calendar-month" style={{ fontSize: 24, position: "absolute", top: 20, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="CITY" placeholderTextColor="#CBD1D9" onChangeText={(newValue) => setInputCity({ city: newValue })} />
            <MaterialCommunityIcons name="city" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="ADDRESS" placeholderTextColor="#CBD1D9" onChangeText={(newValue) => setInputAddress({ address: newValue })} />
            <MaterialCommunityIcons name="home" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            {/* <TextInput style={styles.inputText} placeholder="GENDER" placeholderTextColor="#CBD1D9"/> */}
            <DropDownPicker
              open={genderOpen}
              value={inputGender}
              items={genderLabel}
              setOpen={setGenderOpen}
              setValue={setInputGender}
              setItems={setGenderLabel}
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              placeholder="GENDER"
              zIndex={10}
              style={{ borderColor: "#DBDEE5", paddingLeft: 60, paddingVertical: 20 }}
              textStyle={{ fontFamily: "Quicksand-Semibold", fontSize: 18 }}
              placeholderStyle={{ color: "#3E4154", fontFamily: "Quicksand-Semibold", opacity: 0.3, fontSize: 18 }}
            />
            <Foundation name="male-female" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3, zIndex: 20 }} />
          </View>

          <View style={styles.inputGroup}>
            {/* <TextInput style={styles.inputText} placeholder="enter your SES" placeholderTextColor="#CBD1D9"/> */}
            <DropDownPicker
              open={sesOpen}
              value={inputSes}
              items={sesLabel}
              setOpen={setSesOpen}
              setValue={setInputSes}
              setItems={setSessLabel}
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              placeholder="SES"
              zIndex={10}
              style={{ borderColor: "#DBDEE5", paddingLeft: 60, paddingVertical: 20 }}
              textStyle={{ fontFamily: "Quicksand-Semibold", fontSize: 18 }}
              placeholderStyle={{ color: "#3E4154", fontFamily: "Quicksand-Semibold", opacity: 0.3, fontSize: 18 }}
            />
            <MaterialIcons name="attach-money" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3, zIndex: 20 }} />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, {}]} onPress={addNewUser}>
              <Text style={[styles.label, { color: "white", fontSize: 24, fontFamily: "Quicksand-Bold" }]}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: 18, fontFamily: "Quicksand", textAlign: "center" }]}>Or you already have an account, just</Text>
            <TouchableOpacity>
              <Text style={[styles.label, { fontSize: 22, fontFamily: "Quicksand-Bold", textAlign: "center", color: "#34D399" }]} onPress={onPressToLogin}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FF",
    justifyContent: "center",
    alignItems: "center",

    // alignItems: "center",
    // justifyContent: "flex-start",
    // borderWidth: 1,
  },

  card: {
    width: "100%",
    // color: "white",
    // backgroundColor: "white",
  },

  header: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 34,
    color: "#3E4154",
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
  },

  headerSubTitle: {
    fontSize: 20,
    color: "#3E4154",
    fontFamily: "Quicksand",
    textAlign: "center",
  },

  inputGroup: {
    // borderWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  inputText: {
    fontSize: 18,
    paddingLeft: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DBDEE5",
    fontFamily: "Quicksand-Semibold",
    color: "#3E4154",
  },

  buttonGroup: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#3E4154",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Register;
