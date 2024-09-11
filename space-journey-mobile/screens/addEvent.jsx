import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import {jwtDecode} from "jwt-decode"; 
import axios from "axios";  
import { API_URL } from '@env';  

const NewEventScreen = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState(null); 
  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); 
      if (token) {
        const decodedToken = jwtDecode(token); 
        setUserId(decodedToken.username); 
        console.log("User ID:", decodedToken.username); 
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  
  useEffect(() => {
    fetchUserId();
  }, []);

  const handleAddEvent = async () => {
    
    const eventData = {
      title,
      date: date.toISOString().split("T")[0],  
      time,
      description,
      location,
      userId, 
    };

    try {
      
      const response = await axios.post(`${API_URL}/api/events`, eventData);

    
      console.log("Event added successfully:", response.data);

      Alert.alert("Success", "Event added successfully!");

      
      setTitle("");
      setTime("");
      setDescription("");
      setLocation("");
      setDate(new Date());

    } catch (error) {
   
      console.error("Error adding event:", error);
      Alert.alert("Error", "Failed to add the event. Please try again.");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>New Event</Text>

      <View style={styles.inputContainer}>
        <Icon name="pencil" size={20} color="#61dbfb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#61dbfb"
        />
      </View>

      
      <View style={styles.inputContainer}>
        <Icon name="calendar" size={20} color="#61dbfb" style={styles.icon} />
        <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
          <Text style={styles.input}>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <View style={styles.inputContainer}>
        <Icon name="clock-o" size={20} color="#61dbfb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
          placeholderTextColor="#61dbfb"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="align-left" size={20} color="#61dbfb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#61dbfb"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color="#61dbfb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="#61dbfb"
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#61dbfb",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  dateButton: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#61dbfb",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    height: 60,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default NewEventScreen;
