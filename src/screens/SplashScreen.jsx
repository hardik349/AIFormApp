import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import metrics from '../theme/metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Proof of <Text style={styles.highlight}>Concept</Text>
      </Text>
      <Text style={styles.subtitle}>Designed By</Text>
      <Image
        source={require('../assets/images/techies.png')}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
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
    marginTop: metrics.moderateScale(10),
    fontFamily: 'Inter_18pt-Medium',
    color: '#fff',
  },
  highlight: {
    color: '#8a84f9',
  },
  image: {
    width: metrics.moderateScale(128),
    height: metrics.moderateScale(48),
    resizeMode: 'contain',
    marginTop: metrics.moderateScale(20),
  },
});
