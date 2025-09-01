import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

  // Validation state
  const [errors, setErrors] = useState({});

  const { listening, startListening, stopListening } = useVoiceRecognition(
    async spokenText => {
      console.log('Heard (in InspectionForm):', spokenText);

      // Normalize text to lowercase for commands
      const lower = spokenText.toLowerCase();

      if (lower.includes('open camera')) {
        handleOpenCamera();
        return;
      }

      if (lower.includes('submit')) {
        handleSubmit();
        return;
      }

      // Otherwise try parsing into form fields
      const parsed = await parseWithAI(spokenText);
      console.log('Parsed (in InspectionForm):', parsed);
      if (parsed.buildingName) setBuildingName(parsed.buildingName);
      if (parsed.address) setAddress(parsed.address);
      if (parsed.dateTime) setDateTime(parsed.dateTime);
    },
  );

  // 🔹 Auto-start listening when screen mounts
  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
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

  const validateForm = () => {
    const newErrors = {};
    if (!buildingName) newErrors.buildingName = 'Building name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!dateTime) newErrors.dateTime = 'Date & Time is required';
    if (!photo) newErrors.photo = 'Photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success ✅', 'All details submitted successfully!');
      console.log('Submitted Data:', {
        buildingName,
        address,
        dateTime,
        photo,
      });
    } else {
      Alert.alert('Validation Failed ❌', 'Please fill all required fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME, {userName}</Text>

      {/* Mic Icon + Listening text */}
      <TouchableOpacity
        style={styles.micContainer}
        onPress={listening ? stopListening : startListening}
      >
        <Ionicons
          name="mic"
          size={40}
          color={listening ? 'red' : 'gray'}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.listeningText}>
          {listening ? 'Listening... Say something!' : 'Tap to Speak'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.text}>Enter Building Name</Text>
      <TextInput
        placeholder="Building Name"
        value={buildingName}
        onChangeText={setBuildingName}
        style={styles.textInput}
      />
      {errors.buildingName && (
        <Text style={styles.errorText}>{errors.buildingName}</Text>
      )}

      <Text style={styles.text}>Enter Address</Text>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.textInput}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <Text style={styles.text}>Enter Date/Time</Text>
      <TextInput
        placeholder="Date & Time"
        value={dateTime}
        onChangeText={setDateTime}
        style={styles.textInput}
      />
      {errors.dateTime && (
        <Text style={styles.errorText}>{errors.dateTime}</Text>
      )}

      <Text style={styles.text}>Add Image</Text>
      {photo && (
        <Image
          source={{ uri: photo }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      )}
      {errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}

      {/* Manual fallback buttons */}
      <Button title="📷 Open Camera" onPress={handleOpenCamera} />
      <Button title="✅ Submit" onPress={handleSubmit} />
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
    marginBottom: metrics.verticalScale(20),
  },

  micContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.verticalScale(20),
  },

  listeningText: {
    fontSize: metrics.moderateScale(16),
    fontFamily: 'Raleway-Medium',
    color: '#333',
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

  errorText: {
    color: 'red',
    fontSize: metrics.moderateScale(12),
    marginTop: 4,
  },
});
