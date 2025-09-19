import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FormScreen from '../screens/FormScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import InspectionListScreen from '../screens/InpectionsListScreen';
import SplashScreen from '../screens/SplashScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import AddDetailsScreen from '../screens/AddDetailsScreen';
import BottomTabs from './BottomTabs';
import RecordDetailsScreen from '../screens/RecordDetailScreen';
import AddDetailScreen2 from '../screens/AddDetailScreen2';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="BottomTab" component={BottomTabs} />
        <Stack.Screen name="InspectionList" component={InspectionListScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="AddDetails" component={AddDetailsScreen} />
        <Stack.Screen name="AddDetails2" component={AddDetailScreen2} />

        <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
