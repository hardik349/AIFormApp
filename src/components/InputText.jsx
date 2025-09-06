import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import metrics from '../theme/metrics';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const InputText = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        {icon === 'email' ? (
          <Feather
            name="mail"
            size={metrics.moderateScale(24)}
            color="white"
            style={styles.optionIcon}
          />
        ) : (
          <Feather
            name="lock"
            size={metrics.moderateScale(24)}
            color="white"
            style={styles.optionIcon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#fff'}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={icon === 'lock' ? true : false}
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
    height: metrics.moderateScale(56),
    flexDirection: 'row',
    backgroundColor: '#262626',
    alignItems: 'center',
    gap: metrics.moderateScale(10),
    borderRadius: metrics.moderateScale(12),
    borderWidth: 1,
  },
  input: {
    width: '85%',
    color: '#fff',
    fontSize: metrics.moderateScale(15),
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: metrics.verticalScale(20),
  },
  error: {
    color: 'red',
    fontSize: metrics.moderateScale(10),
    marginLeft: metrics.moderateScale(10),
  },
  optionIcon: {
    marginLeft: metrics.moderateScale(10),
  },
});
