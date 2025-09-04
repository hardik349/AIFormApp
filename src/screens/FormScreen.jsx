import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import metrics from '../theme/metrics';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const FormScreen = () => {
  const [currentField, setCurrentField] = useState(0);
  const [formData, setFormData] = useState({
    builderName: '',
    address: '',
    buildingName: '',
    date: '',
    images: [],
  });

  const navigation = useNavigation();

  const [micStatus, setMicStatus] = useState('idle');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const listenTimeoutRef = useRef(null);
  const micStatusRef = useRef(micStatus);

  const fields = [
    {
      label: 'Builder Name',
      key: 'builderName',
      placeholder: 'Enter builder name',
    },
    { label: 'Address', key: 'address', placeholder: 'Enter address' },
    {
      label: 'Building Name',
      key: 'buildingName',
      placeholder: 'Enter building name',
    },
    { label: 'Date', key: 'date', placeholder: 'YYYY-MM-DD' },
    { label: 'Building Images', key: 'images', placeholder: '' },
  ];

  const { isListening, extractedData, startListening, stopListening } =
    useVoiceExtractor(
      'Extract in JSON: { "builderName": "...", "address": "...", "buildingName": "...", "date": "...", "command": "..." }',
    );

  const currentFieldData = fields[currentField];

  const handleMicPress = () => {
    if (isListening) {
      stopListening();
      setMicStatus('stopped');
    } else {
      startListening();
      setMicStatus('listening');
    }
  };

  const handleOpenCamera = () => {
    launchCamera(
      { mediaType: 'photo', cameraType: 'back', saveToPhotos: true },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage);
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, uri],
          }));
        }
      },
    );
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        date: formatted,
      }));
    }
  };

  useEffect(() => {
    if (!extractedData) return;

    if (extractedData.command) {
      const command = extractedData.command.toLowerCase();
      if (command.includes('open camera')) {
        handleOpenCamera();
        stopListening?.();
        setMicStatus('idle');
        return;
      }
    }

    if (
      extractedData[currentFieldData.key] &&
      currentFieldData.key !== 'images' &&
      formData[currentFieldData.key] !== extractedData[currentFieldData.key]
    ) {
      setFormData(prev => ({
        ...prev,
        [currentFieldData.key]: extractedData[currentFieldData.key],
      }));
      stopListening?.();
      setMicStatus('stopped');
    }
  }, [extractedData]);

  const handleNext = () => {
    if (currentField < fields.length - 1) {
      setCurrentField(currentField + 1);
    } else {
      alert('Form submitted! ' + JSON.stringify(formData));
      console.log('Form Data:', formData);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const isFieldFilled =
    currentFieldData.key === 'images'
      ? formData.images.length > 0
      : formData[currentFieldData.key].trim().length > 0;

  useEffect(() => {
    micStatusRef.current = micStatus;
  }, [micStatus]);

  useEffect(() => {
    if (listenTimeoutRef.current) {
      clearTimeout(listenTimeoutRef.current);
      listenTimeoutRef.current = null;
    }

    if (micStatus === 'listening') {
      listenTimeoutRef.current = setTimeout(() => {
        if (micStatusRef.current === 'listening') {
          stopListening?.();
          setMicStatus('idle');
          setFormData(prev => ({
            ...prev,
            [fields[currentField].key]:
              fields[currentField].key === 'images' ? [] : '',
          }));
          Toast.show({
            type: 'error',
            text1: 'Network error... Try again',
            position: 'top',
            visibilityTime: 3000,
          });
        }
      }, 5000);
    }

    return () => {
      if (listenTimeoutRef.current) {
        clearTimeout(listenTimeoutRef.current);
        listenTimeoutRef.current = null;
      }
    };
  }, [micStatus, stopListening]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <Text style={styles.label}>{currentFieldData.label}</Text>

        {currentFieldData.key === 'images' ? (
          <>
            <View style={styles.imageGrid}>
              <ScrollView horizontal>
                {formData.images.map((uri, index) => (
                  <Image
                    key={index.toString()}
                    source={{ uri }}
                    style={styles.imageThumbnail}
                  />
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleOpenCamera}
            >
              <Text style={styles.buttonText}>
                {formData.images.length === 0 ? 'Open Camera' : 'Add Image'}
              </Text>
              <Feather
                name={formData.images.length === 0 ? 'camera' : 'plus'}
                size={22}
                color="black"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {currentFieldData.key === 'date' ? (
              <View style={styles.dateRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="YYYY-MM-DD"
                  value={formData.date}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.calendarIconContainer}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Feather
                    name="calendar"
                    size={26}
                    color="black"
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                style={styles.input}
                placeholder={currentFieldData.placeholder}
                value={formData[currentFieldData.key]}
                onChangeText={text =>
                  setFormData({ ...formData, [currentFieldData.key]: text })
                }
              />
            )}
          </>
        )}

        <View style={styles.bottomView}>
          <TouchableOpacity
            style={[
              styles.buttonView,
              { backgroundColor: currentField > 0 ? '#000000ff' : '#ccc' },
            ]}
            onPress={() => {
              if (currentField > 0) {
                setCurrentField(prev => prev - 1);
              }
            }}
            disabled={currentField === 0}
          >
            <Feather name="arrow-left" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonView,
              { backgroundColor: isFieldFilled ? '#000000ff' : '#ccc' },
            ]}
            onPress={handleNext}
            disabled={!isFieldFilled}
          >
            <Feather name="arrow-right" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity style={styles.micContainer} onPress={handleMicPress}>
        <Ionicons
          name="mic"
          size={35}
          color={micStatus === 'listening' ? 'red' : 'gray'}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.listeningText}>
          {micStatus === 'listening'
            ? 'Listening... Say something!'
            : 'Tap to Speak'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={formData.date ? new Date(formData.date) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: metrics.moderateScale(20),
  },
  label: {
    fontSize: metrics.moderateScale(24),
    marginBottom: metrics.verticalScale(12),
    fontFamily: 'Raleway-Bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: metrics.moderateScale(50),
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: metrics.moderateScale(15),
    marginBottom: metrics.verticalScale(30),
    fontSize: 18,
    backgroundColor: '#fff',
    fontFamily: 'Raleway-Medium',
  },
  micContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffff',
    borderWidth: 2,
    borderRadius: metrics.moderateScale(12),
    padding: metrics.moderateScale(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listeningText: {
    fontSize: metrics.moderateScale(16),
    fontFamily: 'Raleway-Bold',
    color: '#333',
  },
  buttonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(8),
    paddingHorizontal: metrics.moderateScale(20),
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageButton: {
    flexDirection: 'row',
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#fff',
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'black',
    marginRight: 10,
  },

  flatListContainer: {
    paddingBottom: metrics.verticalScale(20),
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: metrics.verticalScale(20),
  },

  imageThumbnail: {
    width: (width - metrics.moderateScale(80)) / 2,
    height: (width - metrics.moderateScale(80)) / 2,
    margin: metrics.moderateScale(8),
    borderRadius: metrics.moderateScale(10),
    backgroundColor: '#f0f0f0',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.verticalScale(15),
  },

  input: {
    flex: 1,
    height: metrics.moderateScale(50),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: metrics.moderateScale(8),
    paddingHorizontal: metrics.moderateScale(10),
    fontSize: metrics.moderateScale(16),
    color: '#333',
  },

  calendarIconContainer: {
    marginLeft: metrics.moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormScreen;
