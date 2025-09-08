import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import metrics from '../theme/metrics';

const HandleBack = ({ handleBack }) => {
  return (
    <TouchableOpacity onPress={handleBack} style={styles.backContainer}>
      <Ionicons
        name="chevron-back"
        size={metrics.moderateScale(24)}
        color="white"
        style={styles.backIcon}
        onPress={handleBack}
      />
    </TouchableOpacity>
  );
};

export default HandleBack;

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: '#262626',
    borderRadius: metrics.moderateScale(10),
    position: 'absolute',
    padding: metrics.moderateScale(5),
    top: metrics.moderateScale(10),
    left: metrics.moderateScale(20),
  },
});
