import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
const events = [
  { id: "1", date: "May 18", title: "Solar eruptions" },
  { id: "2", date: "May 22", title: "Lunar eclipse" },
];

const EventCard = ({ event, navigation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log(API_URL);

          navigation.navigate("Event", {
            eventName: event.title,
            eventDescription: `Detailed description about the ${event.title} event.`,
          });
        }}
      >
        <Text style={styles.viewMoreButton}>View more</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ user }) => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.userName}>{user?.name ? user.name : "User"}</Text>
        </View>
        <Icon
          name="bell"
          size={24}
          color="#61dbfb"
          style={styles.notificationIcon}
        />
      </View>

 
      <Text style={styles.flakeEventsTitle}>Flake Events</Text>

    
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard event={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "#fff",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#CFE7F7",
  },
  notificationIcon: {
    padding: 10,
  },
  flakeEventsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  eventsList: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    color: "#61dbfb",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  viewMoreButton: {
    backgroundColor: "#CFE7F7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    color: "black",
    fontWeight: "bold",
  },
  welcomeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
