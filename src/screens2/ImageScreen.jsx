import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import metrics from '../theme/metrics';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ImageScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add {'\n'}Building Images</Text>

      <TouchableOpacity style={[styles.imageButtonView]}>
        <Text style={styles.buttonText2}>Capture Image</Text>
        <Feather name="arrow-right" size={22} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Image')}
        style={[styles.nextButtonView]}
      >
        <Text style={styles.buttonText}>Submit Form</Text>
        <Feather name="arrow-right" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'flex-start',
    padding: metrics.moderateScale(20),
  },

  title: {
    fontSize: metrics.moderateScale(27),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(40),
  },

  text: {
    fontSize: metrics.moderateScale(14),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(15),
    opacity: metrics.moderateScale(0.6),
  },

  imageButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#ffffffff',
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(35),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
  },

  nextButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(14),
    paddingHorizontal: metrics.moderateScale(35),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonText: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'white',
  },
  buttonText2: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'black',
  },
});
