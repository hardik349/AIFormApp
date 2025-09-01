import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './src/screens2/HomeScreen';
import FormScreen from './src/screens2/FormScreen';
import WelcomeScreen from './src/screens2/WelcomeScreen';
import WelcomeScreen2 from './src/screens2/WelcomeScreen2';
import ImageScreen from './src/screens2/ImageScreen';
import InspectionForm from './src/screens/InspectionForm'


const Stack = createStackNavigator()
const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator  initialRouteName= "Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen2}/>
        <Stack.Screen name="Form" component={FormScreen}/>
        <Stack.Screen name="Image" component={ImageScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;