import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import metrics from '../theme/metrics';
import { s } from 'react-native-size-matters';

const InputText = ({ placeholder, value, onChangeText, onBlur, error }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#333'}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {
    height: metrics.moderateScale(80),
    marginHorizontal: metrics.moderateScale(20),
  },
  inputcontainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: metrics.moderateScale(10),
    borderRadius: metrics.moderateScale(12),
    borderWidth: 1,
  },
  input: {
    fontSize: metrics.moderateScale(20),
    fontFamily: 'Raleway-Medium',
    width: '100%',
    paddingHorizontal: metrics.verticalScale(8),
    color: 'black',
  },
  error: {
    color: 'red',
    fontSize: metrics.moderateScale(13),
    marginLeft: metrics.moderateScale(10),
  },
});
