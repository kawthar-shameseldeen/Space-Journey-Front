import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';  

const SignupScreen = ({ navigation }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
  
      const response = await axios.post(`${API_URL}/api/register`, {
        username,
        email,
        password,
        location,
      });

      const { token } = response.data; 

   
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');

      
      Alert.alert('Signup Error', error.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Enter your Account details</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.inputContainer}>
        <Icon username="user" size={20} color="#61dbfb" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon username="envelope" size={20} color="#61dbfb" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon username="lock" size={20} color="#61dbfb" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon username="map-marker" size={20} color="#61dbfb" />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#aaa"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.SignupbuttonContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
          <Text style={styles.signupButtonText}>{loading ? 'Signing up...' : 'Sign up'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already Have Account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#61dbfb',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16,
  },
  SignupbuttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    backgroundColor: '#61dbfb',
    borderRadius: 60,
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#61dbfb',
    marginTop: 20,
    paddingLeft: 60,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
