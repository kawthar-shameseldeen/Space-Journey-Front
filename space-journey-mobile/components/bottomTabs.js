import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import Icon from "react-native-vector-icons/FontAwesome";
import EventDetailsScreen from "../screens/event";
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
            iconName = "cog";
          }
          else if (route.name === "Live") {
            iconName = "cog";
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
      <Tab.Screen name="Live" component={EventDetailsScreen} />
    </Tab.Navigator>
  );
}
