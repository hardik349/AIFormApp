import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import metrics from '../theme/metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);
  return (
    <LinearGradient colors={['#0a0a0f', '#0f0f1a']} style={styles.container}>
      <Text style={styles.title}>
        Proof of <Text style={styles.highlight}>Concept</Text>
      </Text>
      <Text style={styles.subtitle}>
        Powered By <Text style={styles.highlight}>AI</Text>
      </Text>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: metrics.moderateScale(34),
    fontFamily: 'Inter_18pt-Medium',
    lineHeight: metrics.verticalScale(41),
    color: '#fff',
  },
  subtitle: {
    fontSize: metrics.moderateScale(16),
    lineHeight: metrics.verticalScale(41),
    fontFamily: 'Inter_18pt-Medium',
    color: '#fff',
  },
  highlight: {
    color: '#8a84f9',
  },
});
