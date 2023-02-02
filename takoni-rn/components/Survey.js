import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const Survey = ({ survey, navigation }) => {
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    Quicksand: require("../assets/fonts/Quicksand-Regular.ttf"),
  });
  let date = moment(survey.surveyDate).format("LLL");

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const toTakeSurvey = () => {
    navigation.navigate("TakeSurvey", { survey: survey });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ justifyContent: "space-between", height: "100%" }} onPress={toTakeSurvey}>
        <Image style={{ width: 310, height: 130, resizeMode: "contain", borderWidth: 1, borderColor: "#DBDEE5", borderRadius: 5 }} source={require("../assets/img/bg.png")} />

        <View>
          <Text numberOfLines={2} style={styles.title}>
            {survey.title}
          </Text>
          <Text numberOfLines={2} style={styles.subTitle}>
            {survey.subTitle}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text numberOfLines={2} style={[styles.description, { opacity: 0.3 }]}>
            {date}
          </Text>
          <TouchableOpacity style={{ backgroundColor: "#34D399", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8 }} onPress={toTakeSurvey}>
            <Text style={{ fontFamily: "Quicksand-Bold", color: "white" }}>Take Survey</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 350,
    borderColor: "#DBDEE5",
    height: 350,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    flex: 1,
    marginBottom: 20,
    overflow: "hidden",
    borderRadius: 10,
  },

  title: {
    fontFamily: "Quicksand-Bold",
    fontSize: 22,
  },

  subTitle: {
    fontFamily: "Quicksand-Semibold",
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.5,
  },

  description: {
    fontFamily: "Quicksand-Semibold",
    fontSize: 14,
  },
});

export default Survey;
