import React, { useCallback } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

const Login = ({ navigation }) => {
  const onPressRegister = () => {
    console.log("Oke");
    console.log(navigation);
    navigation.navigate("Register");
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
          <Text style={styles.headerTitle}>Takoni</Text>
          <View style={styles.headerBorder} />
          <Text style={styles.headerSubTitle}>Login to continue to your account</Text>
        </View>

        <View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.inputText} placeholder="enter your username" placeholderTextColor="#CBD1D9"></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.inputText} placeholder="enter your password" placeholderTextColor="#CBD1D9"></TextInput>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, { backgroundColor: "white", borderWidth: 1, borderColor: "#DBDEE5" }]} onPress={onPressRegister}>
              <Text style={styles.label}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {}]}>
              <Text style={[styles.label, { color: "white" }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FF",
    alignItems: "center",
    justifyContent: "center",
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
    paddingBottom: 20,
  },

  label: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Quicksand-Semibold",
  },

  inputText: {
    fontSize: 16,
    paddingLeft: 10,
    height: 40,
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
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: 10,
  },
});

export default Login;
