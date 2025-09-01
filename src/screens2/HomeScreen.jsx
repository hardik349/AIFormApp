import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import metrics from '../theme/metrics';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Initialize Form</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <View style={styles.buttonView}>
          <Feather name="arrow-right" size={22} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffff',
  },

  title: {
    fontSize: metrics.moderateScale(30),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(10),
  },

  buttonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(8),
    paddingHorizontal: metrics.moderateScale(20),
  },

  
});
