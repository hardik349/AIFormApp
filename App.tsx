import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast, { BaseToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import InspectionListScreen from './src/screens/InpectionsListScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('Error checking AsyncStorage:', error);
        setIsLoggedIn(false);
      }
      setChecked(true);
    };

    checkLoginStatus();
  }, []);

  if (!checked) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Login'}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="InspectionList"
            component={InspectionListScreen}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast
        config={{
          error: props => (
            <BaseToast
              {...props}
              style={{
                borderLeftColor: 'red',
                backgroundColor: '#fff5f5',
                borderRadius: 12,
              }}
              text1Style={{
                color: 'red',
                fontSize: 15,
                fontWeight: '600',
              }}
            />
          ),
        }}
      />
    </>
  );
};

export default App;
