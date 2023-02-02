import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFonts } from "expo-font";

const Question = ({ question }) => {
  const [inputAnswer, setInputAnswer] = useState();
  const [isDone, setIsDone] = useState();

  const submitAnswer = async (input) => {
    axios
      .post(
        `http://192.168.100.14:8080/api/add/survey/question/answer`,
        {
          ...input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem("Authorization"),
          },
        }
      )
      .then(({ data }) => {
        setInputAnswer(data);
        Alert.alert("Thanks for Answer");

        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error!");
      });
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontFamily: "Quicksand-Bold", fontSize: 16, textAlign: "justify", opacity: 0.8, marginBottom: 20 }}>{question.questionText}</Text>
          <TextInput multiline={true} style={styles.inputText} onChangeText={(newValue) => setInputAnswer({ question: { id: question.id }, answerText: newValue })} />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => submitAnswer(inputAnswer)}>
          <Text style={{ fontSize: 22, color: "white", fontFamily: "Quicksand-Bold" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 1,
    padding: 20,
    width: 350,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#DBDEE5",
  },

  inputText: {
    fontSize: 18,
    height: 120,
    backgroundColor: "#F4F7FF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DBDEE5",
    fontFamily: "Quicksand-Semibold",
    color: "#3E4154",
    width: "100%",
    padding: 10,
  },

  btn: {
    // marginVertical: 10,
    marginTop: 20,
    backgroundColor: "#34D399",
    width: 140,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Question;
