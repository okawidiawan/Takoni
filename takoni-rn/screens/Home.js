import React, { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
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
    navigation.navigate("TakeSurvey");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{ width: 100, height: 25, resizeMode: "contain" }} source={require("../assets/img/Logo-Lower-Green.png")} />
      </View>
      <View style={styles.nameSection}>
        <View style={styles.nameSectionL}>
          <Text style={[styles.nameSectionText, { fontSize: 16, fontFamily: "Quicksand" }]}>Welcome,</Text>
          <Text style={styles.nameSectionText}>{user.name}</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Feather name="power" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.takeSurveyText, { marginTop: 20, marginBottom: 30 }]}>Take a Survey</Text>
      {/* <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity style={styles.takeSurveyBtn} onPress={toSurveyList}>
          <Text style={styles.takeSurveyText}>Take a Survey</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} data={surveys} renderItem={({ item }) => <Survey survey={item} />} keyExtractor={(item) => item.id} />
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
    paddingVertical: 15,
    borderColor: "#DBDEE5",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },

  nameSectionL: {},
  nameSectionText: {
    fontSize: 20,
    fontFamily: "Quicksand-Semibold",
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
