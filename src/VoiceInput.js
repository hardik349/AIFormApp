import React, { useEffect, useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Voice from '@react-native-voice/voice';

const VoiceInput = ({ onSpeechRecognized }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setIsListening(true);
    setRecognizedText('');
    setError('');
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setIsListening(false);
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    if (e.value && e.value.length > 0) {
      const text = e.value[0];
      setRecognizedText(text);
      onSpeechRecognized(text);
    }
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    setIsListening(false);
  };

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone to enable voice input.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
          return true;
        } else {
          console.log('Microphone permission denied');
          setError('Microphone permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        setError('Error requesting permission: ' + err.message);
        return false;
      }
    }
    return true; // iOS doesn't need explicit runtime request here for this library
  };

  const startListening = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      return;
    }
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isListening ? 'Listening...' : 'Press to Speak'}
      </Text>
      <Text style={styles.recognizedText}>Recognized: {recognizedText}</Text>
      {error ? <Text style={styles.errorText}>Error: {error}</Text> : null}
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
    </View>
  );
};

export default VoiceInput;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  recognizedText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
