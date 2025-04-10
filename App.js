import React, { useState, useEffect } from "react";

import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";

const API_KEY = "5bd2e0405c5b05e7f1dcda04a58619b5";

export default function App() {

  const [location, setLocation] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  const [loaded, setLoaded] = useState(true);

  useEffect(() => {

    const DataLocation = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {

        setErrorMsg("Permission to access location was denied");

        return;

      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);

      console.log(location, "Mohan");

    };

    DataLocation();

  }, []);

  async function fectWeatherData(location) {

    let lat = location.coords.latitude;

    let long = location.coords.longitude;

    console.log(lat, long);

    setLoaded(false);

    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

    console.log(API);

    try {

      const response = await fetch(API);

      if (response.status == 200) {

        const data = await response.json();

        console.log(data, "12");

        setWeatherData(data);

      } else {

        setWeatherData(null);

      }

      setLoaded(true);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fectWeatherData(location);

    console.log(weatherData, "345");

  }, [location]);

  return (

    <View style={styles.weatherContainer}>

      <View style={styles.headerContainer}>

        <Text style={styles.tempText}>

          {weatherData && weatherData.main.temp}˚

        </Text>

      </View>

      <View

        style={{

          flex: 1,

          justifyContent: "flex-end",

          marginLeft: 30,

          marginBottom: 40,

        }}

      >

        <Text style={{ fontSize: 40, color: "#FFFFFF" }}>

          {weatherData && weatherData.weather[0].main}

        </Text>

        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>

          {weatherData && weatherData.weather[0].description}

        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  weatherContainer: {

    flex: 1,

    backgroundColor: "orange",

  },

  headerContainer: {

    flexDirection: "row",

    marginTop: 100,

    justifyContent: "space-around",

  },

  tempText: {

    fontSize: 72,

    color: "#FFFFFF",

  },

});