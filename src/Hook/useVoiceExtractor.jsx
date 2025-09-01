import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import NetInfo from '@react-native-community/netinfo';

const OPENAI_API_KEY = '';

export const useVoiceExtractor = schemaPrompt => {
  const [isListening, setIsListening] = useState(false);
  const [extractedData, setExtractedData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleResults = async result => {
    if (result?.value?.length > 0) {
      const spokenText = result.value[0];
      console.log(' Speech:', spokenText);

      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        setErrorMsg('No internet connection');
        return;
      }

      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: schemaPrompt },
              { role: 'user', content: spokenText },
            ],
            temperature: 0,
          }),
        });

        const data = await res.json();
        console.log('🔹 AI Raw Response:', data);

        let extracted = {};
        const content =
          data?.choices?.[0]?.message?.content ||
          data?.choices?.[0]?.message ||
          '';

        if (content) {
          try {
            extracted = JSON.parse(content.trim());
          } catch {
            const match = content.match(/\{[\s\S]*\}/);
            if (match) extracted = JSON.parse(match[0]);
          }
        }

        console.log(' Extracted JSON:', extracted);
        setExtractedData(extracted);
        setErrorMsg('');
      } catch (err) {
        console.error(' API Error:', err);
      }
    }
  };

  // const startListening = async () => {
  //   try {
  //     setIsListening(true);

  //     Voice.onSpeechResults = handleResults;
  //     Voice.onSpeechEnd = () => setIsListening(false);
  //     Voice.onSpeechError = () => setIsListening(false);
  //     await Voice.start('en-US');
  //   } catch (error) {
  //     console.error(' Voice Start Error:', error);
  //     setErrorMsg('Voice recognition failed');
  //   }
  // };

  const startListening = async () => {
    try {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        setErrorMsg('No internet connection');
        return; // stop here, don't start Voice
      }

      setIsListening(true);
      setErrorMsg(''); // clear any previous error

      Voice.onSpeechResults = handleResults;
      Voice.onSpeechEnd = () => setIsListening(false);
      Voice.onSpeechError = () => setIsListening(false);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Voice Start Error:', error);
      setErrorMsg('Voice recognition failed');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);

      Voice.destroy().then(Voice.removeAllListeners);
    } catch (error) {
      console.error(' Voice Stop Error:', error);
    }
  };

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    isListening,
    extractedData,
    errorMsg,
    setErrorMsg,
    startListening,
    stopListening,
  };
};
