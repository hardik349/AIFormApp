// import { StyleSheet, Platform } from 'react-native';
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import HomeScreen from '../screens/HomeScreen';
// import ChartScreen from '../screens/ChartScreen';
// import SettingScreen from '../screens/SettingScreen';
// import metrics from '../theme/metrics';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           position: 'absolute',
//           backgroundColor: '#1e1e1e',
//           marginHorizontal: metrics.moderateScale(20),
//           left: metrics.moderateScale(10),
//           right: metrics.moderateScale(10),
//           bottom: metrics.moderateScale(15),
//           borderRadius: metrics.moderateScale(15),
//           height: metrics.moderateScale(60),
//           paddingBottom: metrics.moderateScale(6),
//           paddingTop: metrics.moderateScale(10),
//           borderTopWidth: 0,

//           ...Platform.select({
//             ios: {
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.1,
//               shadowRadius: 6,
//             },
//             android: {
//               elevation: 6,
//             },
//           }),
//         },
//         tabBarIcon: ({ color, focused }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Chart') {
//             iconName = focused ? 'stats-chart' : 'stats-chart-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }

//           return (
//             <Ionicons
//               name={iconName}
//               size={metrics.moderateScale(24)}
//               color={color}
//             />
//           );
//         },
//         tabBarActiveTintColor: '#8a84f9',
//         tabBarInactiveTintColor: '#B0B0B0',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Chart" component={ChartScreen} />
//       <Tab.Screen name="Settings" component={SettingScreen} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabs;

// const styles = StyleSheet.create({});

import { StyleSheet, Platform, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ChartScreen from '../screens/ChartScreen';
import SettingScreen from '../screens/SettingScreen';
import metrics from '../theme/metrics';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 1,
          justifyContent: 'center',

          height: metrics.moderateScale(64),
        },
        tabBarBackground: () => (
          <View style={styles.tabBarContainer}>
            <View style={styles.bottomLayer} />

            <View style={styles.iconLayer} />
          </View>
        ),
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chart') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={metrics.moderateScale(24)}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#A099FF',
        tabBarInactiveTintColor: '#7d7d7dff',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    height: metrics.moderateScale(80),
  },
  bottomLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: metrics.moderateScale(73),
    backgroundColor: '#0f0f1a',
  },
  iconLayer: {
    position: 'absolute',
    left: metrics.moderateScale(10),
    right: metrics.moderateScale(10),
    bottom: metrics.moderateScale(15),
    height: metrics.moderateScale(56),
    marginHorizontal: metrics.moderateScale(12),
    borderRadius: metrics.moderateScale(15),
    backgroundColor: '#262626',
  },
});
