import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from './navigation/screens/LoginScreen';
import LandingScreen from './navigation/screens/LandingScreen';
import SignupScreen from './navigation/screens/SignupScreen';
import HomeScreen from './navigation/screens/HomeScreen';
import RecoveryScreen from './navigation/screens/RecoveryScreen';
import useAuth from './hooks/useAuth';
import CliqueExperiment from './navigation/screens/CliqueExperiment';
import MainContainer from './navigation/MainContainer'
import ChatScreen from './navigation/screens/ChatScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  const { user } = useAuth;

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='MainContainer'>
            <Stack.Screen options={{ headerShown: false }} name='MainContainer' component={MainContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen options={{ headerShown: false }} name='Landing' component={LandingScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Signup' component={SignupScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Recovery' component={RecoveryScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Clique' component={CliqueExperiment} />
            <Stack.Screen options={{ headerShown: false }} name='MainContainer' component={MainContainer} />
            <Stack.Screen options={{ headerShown: false }} name='Chat' component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
