import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
import metrics from '../theme/metrics';
import Feather from 'react-native-vector-icons/Feather';

import Voice from '@react-native-voice/voice';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  const handleContinue = () => {
    if (userName.trim() === '') {
      Alert.alert('Input Required', 'Please enter your name to continue.');
      return;
    }
    navigation.navigate('InspectForm', { userName: userName.trim() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your name</Text>

      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.textInput}
      />

      <View style={styles.bottomView}>
        <View style={styles.buttonView}>
          <Feather name="mic" size={22} color="white" />
        </View>

        <TouchableOpacity onPress={handleContinue}>
          <View style={styles.buttonView}>
            <Feather name="arrow-right" size={22} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: metrics.moderateScale(20),
  },

  textInput: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Medium',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderWidth: 1,
    width: '100%',
    marginTop: metrics.verticalScale(8),
    paddingHorizontal: metrics.verticalScale(8),
  },
  title: {
    fontSize: metrics.moderateScale(20),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
  },
  buttonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(8),
    paddingHorizontal: metrics.moderateScale(20),
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: metrics.moderateScale(30),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
