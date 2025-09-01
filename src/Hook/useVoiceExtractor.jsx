import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

const OPENAI_API_KEY =
  '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';

export const useVoiceExtractor = schemaPrompt => {
  const [isListening, setIsListening] = useState(false);
  const [extractedData, setExtractedData] = useState({});

  const handleResults = async result => {
    if (result?.value?.length > 0) {
      const spokenText = result.value[0];
      console.log('🎤 Speech:', spokenText);

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

        console.log('✅ Extracted JSON:', extracted);
        setExtractedData(extracted);
      } catch (err) {
        console.error('❌ API Error:', err);
      }
    }
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      // 👉 listener yahi bind karenge
      Voice.onSpeechResults = handleResults;
      await Voice.start('en-US');
    } catch (error) {
      console.error('❌ Voice Start Error:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      // 👉 stop pe cleanup
      Voice.destroy().then(Voice.removeAllListeners);
    } catch (error) {
      console.error('❌ Voice Stop Error:', error);
    }
  };

  // screen change hone pe cleanup
  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return { isListening, extractedData, startListening, stopListening };
};
