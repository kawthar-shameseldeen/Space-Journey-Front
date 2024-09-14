import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import Icon from "react-native-vector-icons/FontAwesome";
import EventDetailsScreen from "../screens/event";
// import LiveStreamScreen from "../screens/liveStream.js";
import NewEventScreen from "../screens/addEvent.js";
const Tab = createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Event") {
            iconName = "space-shuttle";
          } else if (route.name === "Live") {
            iconName = "camera";
          } else if (route.name === "AddEvent") {
            iconName = "calendar-o";
          }
          

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#61dbfb",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#121212",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Event" component={EventDetailsScreen} />
      {/* <Tab.Screen name="Live" component={LiveStreamScreen} /> */}
      <Tab.Screen name="AddEvent" component={NewEventScreen} />
    </Tab.Navigator>
  );
}
