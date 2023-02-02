import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onPressToRegister = () => {
    navigation.navigate("Register");
  };

  const login = async () => {
    try {
      let { data } = await axios.post(`http://192.168.100.14:8080/api/authenticate`, {
        username: username,
        password: password,
      });
      let { token } = data;
      let bearerToken = `Bearer ${token}`;
      await AsyncStorage.setItem("Authorization", bearerToken);
      dispatch({ type: "SET_LOGIN" });
    } catch (error) {
      console.log(error);
      Alert.alert("Something Wrong");
    }
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
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome back to,</Text>
          {/* <Text style={styles.headerTitle}>Takoni</Text> */}
          <Image style={{ width: 90, height: 40, resizeMode: "contain", opacity: 0.8 }} source={require("../assets/img/Logo-Lower-Green.png")} />
          {/* <View style={styles.headerBorder} /> */}
          <Text style={styles.headerSubTitle}>Login to continue to your account</Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="USERNAME" placeholderTextColor="#CBD1D9" onChangeText={setUsername} value={username} />
            <MaterialCommunityIcons name="email" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.inputText} placeholder="PASSWORD" placeholderTextColor="#CBD1D9" onChangeText={setPassword} value={password} secureTextEntry />
            <MaterialCommunityIcons name="account-key" style={{ fontSize: 24, position: "absolute", top: 18, left: 40, color: "#3E4154", opacity: 0.3 }} />
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, {}]} onPress={login}>
            <Text style={[styles.label, { color: "white" }]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: "white", borderWidth: 1, borderColor: "#DBDEE5" }]} onPress={onPressToRegister}>
            <Text style={styles.label}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FF",
    // alignItems: "stretch",
    justifyContent: "center",
    // borderWidth: 1,
    // backgroundColor: "red",
  },

  card: {
    width: "100%",
    color: "white",
    // backgroundColor: "white",
  },

  header: {
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#F4F7FF",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 20,
    // paddingLeft: 20,
  },

  headerTitle: {
    fontSize: 34,
    fontFamily: "Quicksand-Bold",
    color: "#3E4154",
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
    marginBottom: 20,
  },

  label: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
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
    width: "100%",
    // backgroundColor: "red",
    // flexDirection: "row",
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

export default Login;
