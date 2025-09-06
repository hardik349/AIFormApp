import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import InspectionListScreen from '../screens/InpectionsListScreen';
import SplashScreen from '../screens/SplashScreen';
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InspectionList" component={InspectionListScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
