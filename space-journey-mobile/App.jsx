import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/login.jsx';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './screens/signup.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen} 
          options={{ title: 'Sign Up' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
