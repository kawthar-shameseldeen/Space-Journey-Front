import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { StatusBar } from 'react-native';

import store from "./data_store/redux/store"; 
import LoginScreen from "./screens/login";
import SignupScreen from "./screens/signup";
import HomeScreen from "./screens/home";
import NewEventScreen from "./screens/addEvent";
import EventDetailsScreen from "./screens/event";
// import LiveStreamScreen from "./screens/liveStream";
import BottomTabs from "./components/bottomTabs";
import { API_URL } from '@env';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
  
  
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event" component={EventDetailsScreen} />
        <Stack.Screen name="AddEvent" component={NewEventScreen} />
        {/* <Stack.Screen name="LiveStream" component={LiveStreamScreen} /> */}
        <Stack.Screen name="Tabs" component={BottomTabs} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
   
    </Provider> 
  );
}
