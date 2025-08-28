import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import metrics from '../theme/metrics';

const InspectionForm = ({ route }) => {
  const { userName } = route.params;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [listening, setListening] = useState(false);

  const stopListening = async () => {
    setListening(false);
    await Voice.stop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME, {userName.toUpperCase()}!</Text>
      <Text style={styles.text}>Enter your name</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
      />

      <Text style={styles.text}>Enter your address</Text>

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.textInput}
      />

      <Button
        title={listening ? 'Listening...' : '🎤 Start Voice Fill'}
        onPress={listening ? stopListening : startListening}
      />
    </View>
  );
};

export default InspectionForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: metrics.moderateScale(20),
  },

  title: {
    fontSize: metrics.moderateScale(20),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
  },

  textInput: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Medium',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderWidth: 1,
    width: '100%',
    marginTop: metrics.verticalScale(8),
    paddingHorizontal: metrics.verticalScale(8),
  },
  text: {
    fontSize: metrics.moderateScale(14),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
  },
});
