import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';
import metrics from '../theme/metrics';

const WelcomeScreen2 = () => {
  const navigation = useNavigation();
  const [inspectorName, setInspectorName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const {
    isListening,
    extractedData,
    errorMsg,
    startListening,
    stopListening,
  } = useVoiceExtractor(
    `You are a strict JSON extractor and multilingual. Extract ONLY inspector name in JSON. Example: { "name": "Ajay" }`,
  );

  useEffect(() => {
    if (!isListening && !extractedData?.name) {
      setProcessing(false);
    } else if (!isListening && inspectorName === '') {
      setProcessing(true);
    }
  }, [isListening]);

  useEffect(() => {
    if (extractedData?.name) {
      console.log('👮 Inspector detected:', extractedData.name);
      setInspectorName(extractedData.name);
      setProcessing(false);
    }
  }, [extractedData]);

  const goToForm = () => {
    if (inspectorName.trim() !== '') {
      setError('');
      navigation.navigate('Form', { inspectorName });
    } else {
      setError('Please provide inspector name first');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={metrics.moderateScale(22)}
          color="black"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/images/building.jpg')}
        style={styles.buildingImage}
      />

      <Text style={styles.title}>Inspector Name</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Ionicons
            name="person"
            size={metrics.moderateScale(15)}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Inspector Name"
            value={inspectorName}
            onChangeText={text => {
              setInspectorName(text);
              if (text.trim() !== '') {
                setError('');
              }
            }}
            placeholderTextColor={'gray'}
          />

          <View style={styles.rightSection}>
            {processing ? (
              <ActivityIndicator size="small" color="blue" />
            ) : inspectorName ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : null}
          </View>
        </View>

        {errorMsg ? (
          <Text style={[styles.errorText, { color: 'orange' }]}>
            {errorMsg}
          </Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.micContainer}
        onPress={isListening ? stopListening : startListening}
      >
        <Ionicons
          name="mic"
          size={35}
          color={isListening ? 'red' : 'gray'}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.listeningText}>
          {isListening ? 'Listening... Say something!' : 'Tap to Speak'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goToFormBtn} onPress={goToForm}>
        <Text style={styles.goToFormText}>Create Form</Text>
        <Ionicons name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  buildingImage: {
    marginTop: metrics.verticalScale(150),
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    marginBottom: 10,
    marginLeft: 20,
    color: '#333',
  },
  inputContainer: {
    marginHorizontal: metrics.moderateScale(20),
    marginTop: metrics.verticalScale(15),
    height: 80,
  },
  inputRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: metrics.verticalScale(5),
    borderColor: '#ccc',
    borderRadius: 8,
    paddingRight: metrics.moderateScale(12),
  },
  errorText: {
    color: 'red',
    fontSize: metrics.moderateScale(14),
    marginLeft: metrics.moderateScale(12),
    fontFamily: 'Raleway-Medium',
  },

  icon: {
    marginLeft: 10,
  },
  input: {
    width: '80%',
    height: metrics.moderateScale(50),
    fontSize: metrics.moderateScale(15),
    marginLeft: metrics.moderateScale(5),
    fontFamily: 'Raleway-Bold',
  },
  rightSection: {
    width: '20%',
    height: metrics.moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: metrics.moderateScale(10),
  },
  goToFormBtn: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#ffffffff',
    padding: metrics.verticalScale(10),
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  goToFormText: {
    color: '#333',
    fontSize: metrics.moderateScale(16),
    fontFamily: 'Raleway-Medium',
    marginRight: 10,
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
});
