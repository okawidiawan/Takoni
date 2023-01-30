import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

const Survey = ({ survey }) => {
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
      <Text style={styles.title}>{survey.title}</Text>
      <Text style={styles.subTitle}>{survey.subTitle}</Text>
      <Text style={styles.description}>{survey.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 350,
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    marginBottom: 20,
    borderColor: "#DBDEE5",
    borderRadius: 10,
  },
  title: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
  },
  subTitle: {
    fontFamily: "Quicksand-Semibold",
    fontSize: 14,
    marginBottom: 20,
  },
  description: {
    fontFamily: "Quicksand",
    fontSize: 12,
  },
});

export default Survey;
