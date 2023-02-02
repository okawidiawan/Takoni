import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Question from "../components/Question";
import { Ionicons } from "@expo/vector-icons";

const SurveyDetails = ({ navigation, route }) => {
  const [question, setQuestion] = useState();
  let { survey } = route.params;

  const getQuestion = async () => {
    axios
      .get(`http://192.168.100.14:8080/api/question/${survey.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await AsyncStorage.getItem("Authorization"),
        },
      })
      .then(({ data }) => {
        setQuestion(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   console.log(question);
  const backToSurveyList = () => {
    navigation.navigate("SurveyList");
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", width: 350, justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={backToSurveyList}>
          <Ionicons name="ios-chevron-back" size={34} color="black" style={{}} />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Quicksand-Bold", fontSize: 28 }}>Question List</Text>
        <TouchableWithoutFeedback style={{ opacity: 0 }}>
          <Ionicons name="ios-chevron-back" size={34} color="black" style={{ opacity: 0 }} />
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ justifyContent: "center", marginTop: 30, paddingBottom: 30 }}
        data={question}
        renderItem={({ item }) => <Question navigation={navigation} question={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#F4F7FF",
    // paddingBottom: 30,
  },
});

export default SurveyDetails;
