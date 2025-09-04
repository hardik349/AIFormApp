import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import metrics from '../theme/metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (route.params?.userName) {
      setUserName(route.params.userName);
    } else {
      const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUserName(storedUser);
        }
      };
      loadUser();
    }
  }, [route.params]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  const handleInspectionForm = () => {
    navigation.navigate('InspectionList');
  };
  const handleInspectionStart = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffffff" />
      {/* Header */}

      <Header userName={userName} handleLogout={handleLogout} />

      {/* Body */}
      <TouchableOpacity
        onPress={handleInspectionForm}
        style={styles.InspectionBtn}
      >
        <Text style={styles.InspectionTxt}>Inspection Forms</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleInspectionStart}
        style={styles.InspectionStartBtn}
      >
        <Text style={styles.InspectionTxt}> Start Inspection</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },

  InspectionBtn: {
    position: 'absolute',
    width: '90%',
    bottom: metrics.moderateScale(80),
    backgroundColor: 'black',
    padding: metrics.moderateScale(10),
    borderRadius: metrics.moderateScale(10),
    marginHorizontal: metrics.moderateScale(20),
    marginTop: metrics.moderateScale(20),
  },
  InspectionTxt: {
    fontSize: metrics.moderateScale(16),
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
  InspectionStartBtn: {
    position: 'absolute',
    width: '90%',
    bottom: metrics.moderateScale(20),
    backgroundColor: 'black',
    padding: metrics.moderateScale(10),
    borderRadius: metrics.moderateScale(10),
    marginHorizontal: metrics.moderateScale(20),
    marginTop: metrics.moderateScale(20),
  },
});
