import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ChartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chart Screen</Text>
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
