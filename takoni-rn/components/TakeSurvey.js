import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const TakeSurvey = ({ route, navigation }) => {
  let { survey } = route.params;
  //   console.log(survey.id);
  //   console.log(route);
  //   console.log(navigation);
  const toSurveyDetail = () => {
    navigation.navigate("SurveyDetail", { survey: survey });
  };
  return (
    <View style={styles.container}>
      <Text>Take a Survey</Text>
      <TouchableOpacity onPress={toSurveyDetail}>
        <Text>Take</Text>
      </TouchableOpacity>
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

export default TakeSurvey;
