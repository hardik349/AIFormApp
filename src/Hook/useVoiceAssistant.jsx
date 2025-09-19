// useVoiceAssistant.js
import { useState, useEffect, useRef } from 'react';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const FIELDS = ['name', 'address', 'building', 'date'];

export const useVoiceAssistant = () => {
  const [formData, setFormData] = useState({});
  const [currentField, setCurrentField] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [pendingValue, setPendingValue] = useState(null);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  // 🔑 refs to always hold latest values (avoid stale closures)
  const fieldRef = useRef(currentField);
  const pendingRef = useRef(pendingValue);

  useEffect(() => {
    fieldRef.current = currentField;
  }, [currentField]);

  useEffect(() => {
    pendingRef.current = pendingValue;
  }, [pendingValue]);

  useEffect(() => {
    // ---- Results ----
    Voice.onSpeechResults = e => {
      if (e.value && e.value.length > 0) {
        setPendingValue(e.value[0]); // store recognized text
      }
    };

    // ---- Error ----
    Voice.onSpeechError = err => {
      const msg = err?.error?.message || JSON.stringify(err);
      console.warn('Speech error:', msg);
      setIsListening(false);
      setIsShuttingDown(false);
    };

    // ---- End (mic fully stopped) ----
    Voice.onSpeechEnd = () => {
      setIsListening(false);
      setIsShuttingDown(false);

      const field = fieldRef.current;
      const value = pendingRef.current;

      if (field && value) {
        // ✅ Save recognized value
        setFormData(prev => ({
          ...prev,
          [field]: value.trim(),
        }));
      }

      // ✅ clear AFTER saving (so next listen doesn’t reuse old value)
      setPendingValue(null);
      pendingRef.current = null;

      // Ask next field or finish
      if (field) {
        const nextIndex = FIELDS.indexOf(field) + 1;
        if (nextIndex < FIELDS.length) {
          setTimeout(() => askField(FIELDS[nextIndex]), 800);
        } else {
          Tts.speak('Form completed. Thank you!');
          setCurrentField(null);
        }
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []); // register only once

  const startListening = async () => {
    try {
      // ✅ reset old value before starting new listen
      setPendingValue(null);
      pendingRef.current = null;

      setIsListening(true);
      setIsShuttingDown(false);
      await Voice.start('en-US');
    } catch (e) {
      console.error('Error starting voice:', e);
    }
  };

  const stopListening = async () => {
    try {
      setIsShuttingDown(true);
      await Voice.stop();
    } catch (e) {
      console.error('Error stopping voice:', e);
      setIsShuttingDown(false);
    }
  };

  const askField = field => {
    setCurrentField(field);
    Tts.speak(`Please say your ${field}`);
    setTimeout(() => startListening(), 1000); // give user time before listening
  };

  const startForm = () => {
    setFormData({});
    askField(FIELDS[0]); // start from the first field
  };

  return {
    formData,
    currentField,
    isListening,
    isShuttingDown,
    startForm,
    stopListening,
  };
};
