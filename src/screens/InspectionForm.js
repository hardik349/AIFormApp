import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import metrics from '../theme/metrics';
import { parseWithAI } from '../utils/parseWithAI';
import useVoiceRecognition from '../utils/useVoiceRecognition';
import { launchCamera } from 'react-native-image-picker';
const InspectionForm = ({ route }) => {
  const { userName } = route.params;

  const [buildingName, setBuildingName] = useState('');
  const [address, setAddress] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSpeechRecognized = async spokenText => {
    console.log('Heard (in InspectionForm):', spokenText);
    const parsed = await parseWithAI(spokenText);
    console.log('Parsed (in InspectionForm):', parsed);
    if (parsed.buildingName) setBuildingName(parsed.buildingName);
    if (parsed.address) setAddress(parsed.address);
    if (parsed.dateTime) setDateTime(parsed.dateTime);
  };

  const { listening, startListening, stopListening } = useVoiceRecognition(
    handleSpeechRecognized,
  );

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'mixed',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri;
          if (uri) setPhoto(uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME, {userName.toUpperCase()}</Text>
      <Text style={styles.text}>Enter Building Name</Text>

      <TextInput
        placeholder="Building Name"
        value={buildingName}
        onChangeText={setBuildingName}
        style={styles.textInput}
      />
      <Text style={styles.text}>Enter Address</Text>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.textInput}
      />
      <Text style={styles.text}>Enter Date/Time</Text>
      <TextInput
        placeholder="Date & Time"
        value={dateTime}
        onChangeText={setDateTime}
        style={styles.textInput}
      />
      <Text style={styles.text}>Add Image</Text>
      {photo && (
        <Image
          source={{ uri: photo }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      )}
      <Button title="📷 Open Camera" onPress={handleOpenCamera} />

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
    padding: metrics.moderateScale(20),
  },

  title: {
    fontSize: metrics.moderateScale(25),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(40),
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
    marginTop: metrics.verticalScale(15),
  },

  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
