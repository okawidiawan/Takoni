import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { useDispatch, useSelector } from "react-redux";
import SurveyList from "../screens/SurveyList";
import Welcome from "../screens/Welcome";
import TakeSurvey from "../components/TakeSurvey";
import SurveyDetails from "../screens/SurveyDetails";

const Stack = createNativeStackNavigator();

const InitialNavigation = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  const checkToken = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch({ type: "SET_LOGIN" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        {/* <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} /> */}
        {!isLogin ? <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} /> : <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />}
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false, headerTitleAlign: "center", headerTitle: "Survey List" }} name="SurveyList" component={SurveyList} />
        <Stack.Screen options={{ headerTitleAlign: "center", headerTitle: "Take Survey" }} name="TakeSurvey" component={TakeSurvey} />
        <Stack.Screen options={{ headerTitleAlign: "center", headerTitle: "Survey Detail" }} name="SurveyDetail" component={SurveyDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default InitialNavigation;
