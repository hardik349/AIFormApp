import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import metrics from '../theme/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputText from '../components/InputText';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Login');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LinearGradient
          colors={['#0a0a0f', '#0f0f1a']}
          style={styles.container}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backContainer}>
            <Ionicons
              name="chevron-back"
              size={metrics.moderateScale(24)}
              color="white"
              style={styles.backIcon}
              onPress={handleBack}
            />
          </TouchableOpacity>

          <Text style={styles.WelcomeText}>Create Your Account 🔐</Text>
          <Text style={styles.WelcomeSubText}>
            Join now and unlock 1000+ voice effects {'\n'}instantly
          </Text>

          <InputText
            placeholder="Email"
            value=""
            error=""
            icon="email"
            onChangeText={() => {}}
          />
          <InputText
            placeholder="Password"
            value=""
            error=""
            icon="lock"
            onChangeText={() => {}}
          />
          <InputText
            placeholder="Password"
            value=""
            error=""
            icon="lock"
            onChangeText={() => {}}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.SignUpContainer}>
            <Text style={styles.SignUpText}>Already Have an Account ? </Text>
            <TouchableOpacity style={styles.SignUpButton} onPress={handleLogin}>
              <Text style={styles.highlight}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  backContainer: {
    backgroundColor: '#262626',
    borderRadius: metrics.moderateScale(10),
    position: 'absolute',
    padding: metrics.moderateScale(5),
    top: metrics.moderateScale(10),
    left: metrics.moderateScale(20),
  },
  WelcomeText: {
    color: '#fff',
    fontSize: metrics.moderateScale(22),
    fontFamily: 'Inter_18pt-Medium',
    lineHeight: metrics.verticalScale(28),
    marginTop: metrics.moderateScale(70),
    textAlign: 'center',
  },
  WelcomeSubText: {
    color: '#B0B0B0',
    fontSize: metrics.moderateScale(15),
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: metrics.verticalScale(20),
    marginBottom: metrics.moderateScale(30),
    textAlign: 'center',
  },
  highlight: {
    color: '#8a84f9',
  },
  ForgotText: {
    color: '#fff',
    textAlign: 'right',
    marginRight: metrics.moderateScale(20),
    fontSize: metrics.moderateScale(13),
    lineHeight: metrics.verticalScale(18),
    fontFamily: 'Inter_18pt-Regular',
  },
  loginButton: {
    backgroundColor: '#8a84f9',
    gap: metrics.moderateScale(12),
    borderRadius: metrics.moderateScale(12),
    height: metrics.moderateScale(48),
    marginHorizontal: metrics.moderateScale(20),
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(16),
    marginTop: metrics.moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: metrics.moderateScale(16),
    lineHeight: metrics.verticalScale(21),
    fontFamily: 'Inter_24pt-Medium',
  },
  SignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.moderateScale(30),
    marginBottom: metrics.verticalScale(20),
  },
  SignUpButton: {
    fontSize: metrics.moderateScale(13),
    marginLeft: metrics.moderateScale(2),
  },
  SignUpText: {
    color: '#B0B0B0',
    fontSize: metrics.moderateScale(13),
    lineHeight: metrics.verticalScale(18),
    fontFamily: 'Inter_18pt-Regular',
  },
});
