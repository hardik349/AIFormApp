import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import metrics from '../theme/metrics';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial opacity 0

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      // After fade in complete, wait 1s then navigate
      setTimeout(() => {
        navigation.replace('GetStarted');
      }, 800);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.title}>
          Proof of <Text style={styles.highlight}>Concept</Text>
        </Text>
        <Text style={styles.subtitle}>Designed By</Text>
        <Image
          source={require('../assets/images/techies.png')}
          style={styles.image}
        />
      </Animated.View>
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
