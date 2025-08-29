import { useState, useEffect, useRef } from 'react';
import Voice from '@react-native-voice/voice';
const useVoiceRecognition = onSpeechRecognized => {
  const [listening, setListening] = useState(false);
  const onSpeechRecognizedRef = useRef(onSpeechRecognized);
  useEffect(() => {
    onSpeechRecognizedRef.current = onSpeechRecognized;
  }, [onSpeechRecognized]);
  useEffect(() => {
    const handleSpeechResults = e => {
      const spokenText = e.value?.[0] || '';
      console.log('Heard (from hook):', spokenText);
      onSpeechRecognizedRef.current(spokenText);
      setListening(false);
    };
    const handleSpeechError = e => {
      console.error('Speech error (from hook):', e);
      setListening(false);
    };
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = handleSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const startListening = async () => {
    try {
      setListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setListening(false);
    }
  };
  const stopListening = async () => {
    try {
      setListening(false);
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };
  return { listening, startListening, stopListening };
};
export default useVoiceRecognition;
