import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const Question = ({ question }) => {
  const [inputAnswer, setInputAnswer] = useState();
  const [answer, setAnswer] = useState();

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //           Authorization: await AsyncStorage.getItem("Authorization"),
  //     },
  //   };

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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   console.log(inputAnswer);

  // const addQuestion = (input) => {
  //   axios
  //     .post(
  //       `http://192.168.100.14:8080/api/add/survey/question`,
  //       {
  //         ...input,
  //       },
  //       config
  //     )
  //     .then((response) => {
  //       // console.log(response);
  //       // setQuestions([...questions, input]);
  //       setQuestions((state) => {
  //         return [...state, input];
  //       });
  //       getQuestionBySurveyId();
  //     })
  //     .catch((error) => {
  //     });
  // };

  // const onCHangeHandler = (e) => {
  //   let { name, value } = e.target;
  //   setInputQuestion((state) => {
  //     return { ...state, survey: { id: surveyById.id }, [name]: value };
  //   });
  // };

  const addAnswer = (input) => {};

  return (
    <View style={styles.container}>
      <Text>{question.questionText}</Text>
      <TextInput style={{ width: 200, height: 50, borderWidth: 1 }} onChangeText={(newValue) => setInputAnswer({ question: { id: question.id }, answerText: newValue })} />
      <TouchableOpacity onPress={() => submitAnswer(inputAnswer)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default Question;
