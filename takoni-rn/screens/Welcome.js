import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

const Welcome = ({ navigation }) => {
  const onPressToLogin = () => {
    navigation.navigate("InitialNavigation");
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
      <StatusBar style="auto" />
      <Text style={[styles.heroText, { fontSize: 50 }]}>Welcome to</Text>
      <Image style={{ width: 150, height: 60, resizeMode: "contain" }} source={require("../assets/img/Logo-Lower-Green.png")} />
      {/* <Text style={[styles.heroText, { fontSize: 20, fontFamily: "Quicksand", textAlign: "center" }]}>find your target market{"\n"}right now!</Text> */}
      <TouchableOpacity style={styles.btn} onPress={onPressToLogin}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FF",
  },
  heroText: {
    fontFamily: "Quicksand-Semibold",
    fontSize: 30,
  },

  btn: {
    marginTop: 100,
    backgroundColor: "#34D399",
    paddingHorizontal: 70,
    paddingVertical: 18,
    borderRadius: 50,
  },

  btnText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 24,
    color: "white",
  },
});

export default Welcome;
