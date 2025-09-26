import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import metrics from '../theme/metrics';

import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const googleIcon = require('../assets/images/googleIcon.png');
const appleIcon = require('../assets/images/appleIcon.png');

const LoginOptions = ({ optionText, oPress, iconType }) => {
  return (
    <TouchableOpacity style={styles.logInOptions} onPress={oPress}>
      {iconType === 'email' ? (
        <Feather
          name="mail"
          size={metrics.moderateScale(24)}
          color="white"
          style={styles.optionIcon}
        />
      ) : (
        <Image
          source={iconType === 'google' ? googleIcon : appleIcon}
          style={styles.optionImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.optionText}>{optionText}</Text>
    </TouchableOpacity>
  );
};
const GetStartedScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <LinearGradient colors={['#0a0a0f', '#0f0f1a']} style={styles.container}>
      <Text style={styles.GetStartedText}>Let’s Get Started!</Text>

      <LoginOptions
        optionText="Continue with Email"
        iconType="email"
        oPress={handleLogin}
      />

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <LoginOptions optionText="Continue with Google" iconType="google" />
      <LoginOptions optionText="Continue with Apple" iconType="apple" />
      <View style={styles.SignUpContainer}>
        <Text style={styles.SignUpText}>Already Have an Account ?</Text>
        <TouchableOpacity style={styles.SignUpButton} onPress={handleLogin}>
          <Text style={styles.highlight}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GetStartedText: {
    fontSize: metrics.moderateScale(20),
    fontFamily: 'Inter_18pt-Medium',
    lineHeight: metrics.verticalScale(25),
    color: '#fff',
    marginBottom: metrics.moderateScale(30),
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderColor: '#fff',
    marginVertical: metrics.verticalScale(10),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#666',
  },
  orText: {
    color: '#fff',
    fontFamily: 'Inter_18pt-Medium',
    marginHorizontal: metrics.moderateScale(10),
    lineHeight: metrics.verticalScale(20),
    fontSize: metrics.moderateScale(16),
  },

  highlight: {
    color: '#8a84f9',
  },
  logInOptions: {
    backgroundColor: '#333333',
    borderWidth: 1,
    width: '90%',
    height: metrics.moderateScale(56),
    borderRadius: metrics.moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.verticalScale(10),
  },

  optionIcon: {
    marginLeft: metrics.moderateScale(20),
  },
  optionImage: {
    marginLeft: metrics.moderateScale(20),
    width: metrics.moderateScale(24),
    height: metrics.moderateScale(24),
  },
  optionText: {
    color: '#fff',
    fontSize: metrics.moderateScale(15),
    lineHeight: metrics.verticalScale(20),
    marginLeft: metrics.scale(60),
    fontFamily: 'Inter_18pt-Regular',
  },

  SignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.moderateScale(30),
  },
  SignUpButton: {
    fontSize: metrics.moderateScale(13),
    marginLeft: metrics.moderateScale(5),
  },
  SignUpText: {
    color: '#fff',
    fontSize: metrics.moderateScale(13),
    lineHeight: metrics.verticalScale(18),
    fontFamily: 'Inter_18pt-Regular',
    color: '#B0B0B0',
  },
});
