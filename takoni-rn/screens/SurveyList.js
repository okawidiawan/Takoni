import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import Survey from "../components/Survey";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SurveyList = ({ navigation }) => {
  const [surveys, setSurvey] = useState([]);

  const getSurvey = async () => {
    axios
      .get(`http://192.168.100.14:8080/api/user/survey`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await AsyncStorage.getItem("Authorization"),
        },
      })
      .then(({ data }) => {
        // console.log("Reload");
        setSurvey(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSurvey();
  }, []);

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

  const toSurveyList = () => {
    // console.log("Halooo");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", alignItems: "center", paddingTop: 30, marginBottom: 15 }}>
        <TouchableOpacity onPress={toSurveyList}>
          <Ionicons name="ios-chevron-back" size={34} color="black" style={{}} />
        </TouchableOpacity>

        <Text style={styles.text}>Survey List</Text>

        <TouchableOpacity onPress={getSurvey}>
          <MaterialCommunityIcons name="reload" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center" }} data={surveys} renderItem={({ item }) => <Survey navigation={navigation} survey={item} />} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FF",
    // backgroundColor:"red"
  },
  text: {
    fontFamily: "Quicksand-Bold",
    fontSize: 28,
  },
});

export default SurveyList;
