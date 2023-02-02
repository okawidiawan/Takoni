import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Question from "../components/Question";

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

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center" }} data={question} renderItem={({ item }) => <Question navigation={navigation} question={item} />} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SurveyDetails;
