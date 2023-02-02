import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const TakeSurvey = ({ route, navigation }) => {
  let { survey } = route.params;

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

  const toSurveyDetail = () => {
    navigation.navigate("SurveyDetail", { survey: survey });
  };

  const backToList = () => {
    navigation.navigate("SurveyList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.text, { fontFamily: "Quicksand-Bold", fontSize: 24, marginBottom: 20 }]}>Take Survey</Text>
        <Image style={{ width: 320, height: 140, resizeMode: "contain", borderRadius: 5, marginBottom: 20 }} source={require("../assets/img/bg.png")} />

        <View>
          <Text style={[styles.text, { fontFamily: "Quicksand-Bold", fontSize: 18, marginBottom: 10 }]}>{survey.title}.</Text>
          <Text style={[styles.text, { fontFamily: "Quicksand-Bold", fontSize: 16, marginBottom: 20, opacity: 0.5 }]}>{survey.subTitle}.</Text>
          <Text style={[styles.text, { fontFamily: "Quicksand-Bold", fontSize: 16, marginBottom: 5 }]}>Description : </Text>
          <Text style={[styles.text, { fontFamily: "Quicksand-Bold", fontSize: 16, marginBottom: 0, opacity: 0.5 }]}>{survey.description}.</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
          <TouchableOpacity onPress={backToList} style={{ width: 140, paddingVertical: 10, marginHorizontal: 10, backgroundColor: "#3E4154", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.text, { fontSize: 22, color: "white" }]}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toSurveyDetail} style={{ width: 140, paddingVertical: 10, marginHorizontal: 10, backgroundColor: "#34D399", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.text, { fontSize: 22, color: "white" }]}>Take</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  text: {
    fontFamily: "Quicksand-Semibold",
    // textAlign: "justify",
  },
  card: {
    width: 340,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderColor: "#DBDEE5",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default TakeSurvey;
