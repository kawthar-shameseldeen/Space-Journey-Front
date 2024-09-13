import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.API_URL 

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password }); 
      setLoading(false);

      if (response.data && response.data.token) {
       
        console.log("Login successful, token:", response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
        
       
        navigation.navigate("Tabs");
      } else {
        console.log("Login response did not contain token:", response.data);
      }
    } catch (err) {
      setLoading(false);
      
    
      console.error("Login failed:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
      } else if (err.request) {
        console.error("Request made but no response received:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      
      
      console.error("Error details:", err.message || "Unknown error");

      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your Account details</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#61dbfb" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#61dbfb" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.LoginbuttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.signupTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>Don't Have Account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 10,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#61dbfb",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    height: 50,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingLeft: 10,
    fontSize: 16,
  },
  LoginbuttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#61dbfb",
    borderRadius: 60,
    width: "40%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  signupTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "#61dbfb",
    marginTop: 20,
    paddingLeft: 10,
  },
});

export default LoginScreen;
