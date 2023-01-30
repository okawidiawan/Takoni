import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SurveyList = () => {
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
        setSurvey(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSurvey();
  }, []);

  return (
    <View>
      <Text>Survey List</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SurveyList;
