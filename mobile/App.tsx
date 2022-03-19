import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";
import socketIOClient from "socket.io-client";
import CountDown from "react-native-countdown-component";
const ENDPOINT = "http://192.168.15.137:3333";
const the = require("./src/assets/teresina.json");
const tim = require("./src/assets/timon.json");

export default function App() {
  const [city, setCity] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("news", (data) => {
      setCity(data.place);
      setTimer(data.timer);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {city === "Timon" ? (
        <Text style={styles.text}>Timon - Teresina</Text>
      ) : (
        <Text style={styles.text}>Teresina - Timon</Text>
      )}
      <CountDown
        until={timer}
        size={30}
        digitStyle={{
          backgroundColor: "#f8f8f8",
          borderWidth: 2,
          borderColor: "#ddd",
        }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["H", "M", "S"]}
        timeLabels={{ h: undefined, m: undefined, s: undefined }}
        separatorStyle={{ color: "#000" }}
        showSeparator
      />
      {city === "Timon" ? (
        <LottieView
          source={tim}
          style={{
            height: Dimensions.get("screen").height * 0.25,
            marginTop: 10,
          }}
          ref={(Animation) => {
            Animation?.reset();
            Animation?.play();
          }}
        />
      ) : (
        <LottieView
          source={the}
          style={{
            height: Dimensions.get("screen").height * 0.25,
            marginTop: 10,
          }}
          ref={(Animation) => {
            Animation?.reset();
            Animation?.play();
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
