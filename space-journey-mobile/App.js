import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

// import store from "./store/store"; // Assuming you have a Redux store setup

import LoginScreen from "./screens/login";
import SignupScreen from "./screens/signup";
import HomeScreen from "./screens/home";
import NewEventScreen from "./screens/addEvent";
import EventDetailsScreen from "./screens/event";
import LiveStreamScreen from "./screens/liveStream";
import BottomTabs from "./components/bottomTabs";
import { API_URL } from '@env';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    // <Provider store={store}>
    // <LinearGradient colors={["#f3cfd6", "#90c2d8"]} style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // If you want to hide the header by default
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event" component={EventDetailsScreen} />
        <Stack.Screen name="AddEvent" component={NewEventScreen} />
        <Stack.Screen name="LiveStream" component={LiveStreamScreen} />
        <Stack.Screen name="Tabs" component={BottomTabs} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    // </LinearGradient>
    /* </Provider> */
  );
}
