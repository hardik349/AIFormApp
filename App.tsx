import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './src/screens/HomeScreen'
import InspectionForm from './src/screens/InspectionForm'

const Stack = createStackNavigator()
const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="InspectForm" component={InspectionForm}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;