import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';
import metrics from '../theme/metrics';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera } from 'react-native-image-picker';

const FormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { inspectorName } = route.params || {};

  const [info, setInfo] = useState({
    name: '',
    address: '',
    building: '',
    date: '',
  });

  const [filled, setFilled] = useState({
    name: 'initial',
    address: 'initial',
    building: 'initial',
    date: 'initial',
  });

  const { isListening, extractedData, startListening, stopListening } =
    useVoiceExtractor(
      'Extract in JSON: { "name": "...", "address": "...", "building": "...", "date": "..." }',
    );

  const timeoutRef = useRef(null);

  const setupAutoStopTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log('⏱️ Auto-stop timeout reached, stopping mic...');
      stopListening();
      setFilled(currentStatus => {
        const newStatus = { ...currentStatus };
        for (const key in info) {
          if (newStatus[key] === 'initial') {
            newStatus[key] = info[key] ? 'filled' : 'empty';
          }
        }
        return newStatus;
      });
    }, 15000);
  };

  const allFilled = Object.values(filled).every(status => status === 'filled');

  useEffect(() => {
    const autoStartMic = async () => {
      await startListening();
      setupAutoStopTimeout();
    };

    autoStartMic();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopListening();
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      setupAutoStopTimeout();
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isListening]); // Rerun this effect whenever isListening changes

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
          if (uri) setPhoto(uri); // Assuming setPhoto state exists
        }
      },
    );
  };

  useEffect(() => {
    if (extractedData) {
      console.log('📋 Form Extracted:', extractedData);
      setInfo(prev => {
        const newInfo = {
          ...prev,
          name: extractedData.name || prev.name,
          address: extractedData.address || prev.address,
          building: extractedData.building || prev.building,
          date: extractedData.date || prev.date,
        };

        setFilled(currentStatus => {
          const newStatus = { ...currentStatus };
          for (const key in extractedData) {
            if (extractedData[key]) {
              newStatus[key] = 'filled';
            } else if (newStatus[key] === 'initial') {
              newStatus[key] = newInfo[key] ? 'filled' : 'empty';
            }
          }
          return newStatus;
        });
        return newInfo;
      });
    }
  }, [extractedData]);

  useEffect(() => {
    for (const key in info) {
      if (filled[key] === 'empty' || filled[key] === 'initial') {
        if (info[key]) {
          setFilled(prev => ({ ...prev, [key]: 'filled' }));
        } else if (filled[key] === 'initial' && !info[key]) {
          setFilled(prev => ({ ...prev, [key]: 'empty' }));
        }
      }
    }
  }, [info]);

  const handleMicButtonPress = () => {
    if (isListening) {
      stopListening();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      startListening();
      setupAutoStopTimeout();
    }
  };

  const renderInput = (field, label, value, onChange, status) => (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{field}</Text>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={label}
          placeholderTextColor={'black'}
          value={value}
          onChangeText={onChange}
        />
        {status === 'filled' && (
          <Feather name="check" color="green" size={20} />
        )}
        {status === 'empty' && <Entypo name="cross" color="red" size={23} />}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Hello {'\n'}Inspector, {inspectorName}
      </Text>

      {renderInput(
        'Enter Builder Name',
        'Name',
        info.name,
        t => setInfo({ ...info, name: t }),
        filled.name,
      )}
      {renderInput(
        'Enter Address',
        'Address',
        info.address,
        t => setInfo({ ...info, address: t }),
        filled.address,
      )}
      {renderInput(
        'Enter Building Name',
        'Building',
        info.building,
        t => setInfo({ ...info, building: t }),
        filled.building,
      )}
      {renderInput(
        'Enter date',
        'Date (dd/mm/yyyy)',
        info.date,
        t => setInfo({ ...info, date: t }),
        filled.date,
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={handleMicButtonPress}
        >
          <Feather
            name={isListening ? 'mic' : 'mic-off'}
            color="white"
            size={22}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Image')}
        style={[
          styles.nextButtonView,
          !allFilled && { backgroundColor: '#979797ff' },
        ]}
        disabled={!allFilled}
      >
        <Text style={styles.buttonText}>Add Images</Text>
        <Feather name="arrow-right" size={22} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};
export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'flex-start',
    padding: metrics.moderateScale(20),
  },

  title: {
    fontSize: metrics.moderateScale(27),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(40),
  },

  text: {
    fontSize: metrics.moderateScale(14),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(15),
    opacity: metrics.moderateScale(0.6),
  },

  buttonText: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'white',
  },

  buttonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(25),
  },

  nextButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(14),
    paddingHorizontal: metrics.moderateScale(35),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomView: {
    flexDirection: 'row',
    marginTop: metrics.moderateScale(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },

  inputContainer: {
    width: '100%',
    marginBottom: metrics.verticalScale(10),
  },

  fieldContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: metrics.moderateScale(13),
    padding: metrics.moderateScale(2),
    marginTop: metrics.moderateScale(7),
  },
  textInput: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Medium',
    borderRadius: 10,
    borderBottomWidth: 0,
    borderWidth: 0,
    width: '90%',
    paddingHorizontal: metrics.verticalScale(8),
    marginEnd: metrics.verticalScale(5),
  },
  tick: { fontSize: 18 },
  cross: { fontSize: 18, color: 'red' },
});
