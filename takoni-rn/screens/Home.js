import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import axios from "axios";
import Survey from "../components/Survey";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const [surveys, setSurvey] = useState([]);
  const [user, setUser] = useState([]);

  const getUser = async () => {
    axios
      .get(`http://192.168.100.14:8080/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await AsyncStorage.getItem("Authorization"),
        },
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    getUser();
  }, []);

  // console.log(surveys);
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

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "SET_LOGOUT" });
    } catch (error) {
      console.log(error);
      Alert.alert("Something Wrong");
    }
  };

  const toSurveyList = () => {
    navigation.navigate("SurveyList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{ width: 100, height: 40, resizeMode: "contain" }} source={require("../assets/img/Logo-Lower-Green.png")} />
      </View>
      <View style={{ marginTop: 50, width: 150, height: 150, overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
        {user.gender === "Male" ? (
          <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={require("../assets/img/pic-male.png")} />
        ) : (
          <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={require("../assets/img/pic-female.png")} />
        )}
      </View>
      <View style={styles.nameSection}>
        <View style={styles.nameSectionL}>
          <Text style={[styles.nameSectionText, { fontSize: 30, fontFamily: "Quicksand" }]}>Welcome,</Text>
          <Text style={styles.nameSectionText}>{user.name}</Text>
        </View>
      </View>
      {/* <TouchableOpacity onPress={logout}>
        <Feather name="power" size={24} color="#34D399" />
      </TouchableOpacity> */}
      <TouchableOpacity style={{ backgroundColor: "#34D399", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 50, marginTop: 50 }} onPress={toSurveyList}>
        <Text style={[styles.nameSectionText, { fontSize: 28, color: "white" }]}>Take a Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 80, justifyContent: "center", alignItems: "center" }}>
        <Feather name="power" color="#34D399" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <Text style={[styles.nameSectionText, { fontSize: 18, color: "#3E4154" }]}>logout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#F4F7FF",
  },

  header: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#F4F7FF",
  },

  nameSection: {
    width: "90%",
    paddingHorizontal: 20,
    // paddingVertical: 15,
    // borderColor: "#DBDEE5",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },

  nameSectionL: {
    width: "100%",
  },

  nameSectionText: {
    fontSize: 34,
    fontFamily: "Quicksand-Semibold",
    textAlign: "center",
    // backgroundColor: "red",
  },

  takeSurveyBtn: {
    backgroundColor: "#6ee7b7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  takeSurveyText: {
    fontSize: 20,
    fontFamily: "Quicksand-Semibold",
    // color: "white",
  },
});

export default Home;
