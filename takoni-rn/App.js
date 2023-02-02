import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import InitialNavigation from "./navigations/InitialNavigation";
import store from "./store";
import Welcome from "./screens/Welcome";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <InitialNavigation />
      {/* <Welcome /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
