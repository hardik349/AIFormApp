import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { executeCommand } from '../utils/CommandExecutor';

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

export const useJarvisVoice = () => {
  const [isListening, setIsListening] = useState(false);

  const handleResults = async result => {
    const spokenText = result?.value?.[0] || '';
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
            {
              role: 'system',
              content: `
                You are Jarvis, an AI assistant. Convert user speech to one of these commands exactly:
                "call ajay", "message ajay", "open camera", "open youtube".
                If it doesn’t match any, reply with "unknown".
              `,
            },
            { role: 'user', content: spokenText },
          ],
        }),
      });

      const data = await res.json();
      const command =
        data?.choices?.[0]?.message?.content?.trim().toLowerCase() || 'unknown';

      console.log('🔹 AI Command:', command);

      Tts.speak(`Executing ${command}`);
      await executeCommand(command);
    } catch (err) {
      console.error('❌ OpenAI Error:', err);
    }
  };

  const startListening = async () => {
    try {
      setIsListening(true);

      Voice.onSpeechResults = handleResults;
      Voice.onSpeechEnd = () => setIsListening(false);
      Voice.onSpeechError = err => {
        console.log('❌ Speech error', err);
        setIsListening(false);
      };

      await Voice.start('en-US');
    } catch (err) {
      console.error('❌ Voice Start Error:', err);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      Voice.destroy().then(Voice.removeAllListeners);
    } catch (err) {
      console.error('❌ Voice Stop Error:', err);
    }
  };

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return { isListening, startListening, stopListening };
};
