import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import SQLite from 'react-native-sqlite-storage';
import Tts from 'react-native-tts';
import questions from './src/rawData/questions.json';

type Message = { role: 'ai' | 'user'; text: string };
type UserRecord = {
  id?: number;
  name: string;
  building: string;
  date: string;
  address: string;
};

const db = SQLite.openDatabase(
  { name: 'voiceDemo.db', location: 'default' },
  () => console.log('✅ Database opened'),
  err => console.error('❌ DB error', err),
);

export default function App() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Partial<UserRecord>>({});
  const [step, setStep] = useState(0);
  const [listening, setListening] = useState(false);
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [interactionStarted, setInteractionStarted] = useState(false);
  const [answeredKeys, setAnsweredKeys] = useState<string[]>([]);

  // Confirmation flow
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Setup DB
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, building TEXT, date TEXT, address TEXT);',
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, text TEXT);',
      );

      tx.executeSql('SELECT * FROM questions;', [], (_, result) => {
        if (result.rows.length === 0) {
          questions.forEach(q => {
            tx.executeSql('INSERT INTO questions (key, text) VALUES (?, ?);', [
              q.key,
              q.text,
            ]);
          });
          console.log('✅ Questions inserted from JSON');
        }
      });
    });

    // Setup TTS
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
  }, []);

  // Setup Voice listeners
  useEffect(() => {
    Voice.onSpeechResults = e => {
      const userText = e.value?.[0] ?? '';
      if (userText) handleUserReply(userText);
    };
    Voice.onSpeechEnd = () => setListening(false);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [step, answers, answeredKeys, awaitingConfirmation, editingField]);

  const startListening = async () => {
    try {
      setListening(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error('Voice error:', e);
      setListening(false);
    }
  };

  const speak = (text: string) => {
    Tts.stop();
    Tts.speak(text);
  };

  const handleUserReply = (reply: string) => {
    console.log('🎤 User said:', reply);

    // ===== Confirmation Flow =====
    if (awaitingConfirmation) {
      if (reply.toLowerCase().includes('yes')) {
        saveRecord(answers as UserRecord);
        const thankYou = '✅ Thank you! Your details are saved.';
        setConversation(prev => [...prev, { role: 'ai', text: thankYou }]);
        speak(thankYou);

        // reset
        setStep(0);
        setAnswers({});
        setAnsweredKeys([]);
        setAwaitingConfirmation(false);
        setEditingField(null);
        setInteractionStarted(false);
        return;
      } else if (reply.toLowerCase().includes('no')) {
        const ask =
          'Which field would you like to change? (name, building, date, address)';
        setConversation(prev => [...prev, { role: 'ai', text: ask }]);
        speak(ask);
        setEditingField(''); // waiting for user to pick field
        return;
      }
    }

    // ===== Editing Flow =====
    if (
      editingField === '' &&
      ['name', 'building', 'date', 'address'].includes(reply.toLowerCase())
    ) {
      const field = reply.toLowerCase() as keyof UserRecord;
      setEditingField(field);
      const ask = `Please say the correct ${field}`;
      setConversation(prev => [...prev, { role: 'ai', text: ask }]);
      speak(ask);
      return;
    }

    if (editingField && editingField !== '') {
      setAnswers(prev => ({ ...prev, [editingField!]: reply }));
      setEditingField(null);

      // ✅ Back to confirmation instead of restarting
      confirmDetails({ ...answers, [editingField]: reply });
      return;
    }

    // ===== Normal Q&A Flow =====
    const currentQuestion = questions[step];
    const field = currentQuestion.key as keyof UserRecord;

    setAnswers(prev => ({ ...prev, [field]: reply }));
    setAnsweredKeys(prev => [...prev, field]);
    setConversation(prev => [...prev, { role: 'user', text: reply }]);

    // Next question
    let nextStep = step + 1;
    while (
      nextStep < questions.length &&
      answeredKeys.includes(questions[nextStep].key)
    ) {
      nextStep++;
    }

    if (nextStep < questions.length) {
      const nextQuestion = questions[nextStep].text;
      setStep(nextStep);
      setConversation(prev => [...prev, { role: 'ai', text: nextQuestion }]);
      speak(nextQuestion);
      setTimeout(() => startListening(), 1500);
    } else {
      // All questions done → ask for confirmation
      confirmDetails({ ...answers, [field]: reply });
    }
  };

  const confirmDetails = (data: Partial<UserRecord>) => {
    const confirm = `Here are your details:\nName: ${data.name}\nBuilding: ${data.building}\nDate: ${data.date}\nAddress: ${data.address}\n\nAre these correct? (Yes / No)`;
    setConversation(prev => [...prev, { role: 'ai', text: confirm }]);
    speak(confirm);
    setAwaitingConfirmation(true);
    setTimeout(() => startListening(), 1500);
  };

  const saveRecord = (record: UserRecord) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, building, date, address) VALUES (?, ?, ?, ?);',
        [record.name, record.building, record.date, record.address],
        () => console.log('✅ Record saved'),
        (_, err) => {
          console.error('❌ Insert error', err);
          return false;
        },
      );
    });
  };

  const fetchRecords = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users;', [], (_, result) => {
        const rows: UserRecord[] = [];
        for (let i = 0; i < result.rows.length; i++) {
          rows.push(result.rows.item(i));
        }
        setRecords(rows);
      });
    });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Text
      style={[
        styles.message,
        item.role === 'ai' ? styles.aiMessage : styles.userMessage,
      ]}
    >
      {item.role === 'ai' ? 'AI: ' : 'You: '}
      {item.text}
    </Text>
  );

  const renderRecord = ({ item }: { item: UserRecord }) => (
    <Text style={styles.record}>
      {item.id}. {item.name}, {item.building}, {item.date}, {item.address}
    </Text>
  );

  const startInteraction = () => {
    if (awaitingConfirmation) {
      // resume confirmation listening
      speak('Are these correct? Please say Yes or No.');
      startListening();
      return;
    }

    const nextQuestion = questions.find(q => !answeredKeys.includes(q.key));
    if (!nextQuestion) {
      confirmDetails(answers);
      return;
    }

    const nextIndex = questions.indexOf(nextQuestion);
    setStep(nextIndex);

    setConversation(prev => [...prev, { role: 'ai', text: nextQuestion.text }]);
    speak(nextQuestion.text);
    setInteractionStarted(true);
    startListening();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversation}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderMessage}
      />

      <Text style={{ textAlign: 'center', marginVertical: 10 }}>
        {listening ? '🎤 Listening...' : '🔇 Waiting'}
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={startInteraction}>
        <Text style={styles.startText}>▶️ Start Interaction</Text>
      </TouchableOpacity>

      <Button title="Show Records" onPress={fetchRecords} />

      <FlatList
        data={records}
        keyExtractor={item => item.id?.toString() ?? ''}
        renderItem={renderRecord}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  message: { padding: 8, marginVertical: 4, borderRadius: 6 },
  aiMessage: { backgroundColor: '#cce5ff' },
  userMessage: { backgroundColor: '#d4edda', alignSelf: 'flex-end' },
  startButton: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  startText: { color: '#fff', fontWeight: 'bold' },
  record: { marginTop: 5, fontSize: 14, color: '#333' },
});

// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import Toast, { BaseToast } from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import LoginScreen from './src/screens/LoginScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import FormScreen from './src/screens/FormScreen';
// import WelcomeScreen from './src/screens/WelcomeScreen';
// import InspectionListScreen from './src/screens/InpectionsListScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedUser) {
//           setIsLoggedIn(true);
//         } else {
//           setIsLoggedIn(false);
//         }
//       } catch (error) {
//         console.log('Error checking AsyncStorage:', error);
//         setIsLoggedIn(false);
//       }
//       setChecked(true);
//     };

//     checkLoginStatus();
//   }, []);

//   if (!checked) {
//     return null;
//   }

//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName={isLoggedIn ? 'Home' : 'Login'}
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen
//             name="InspectionList"
//             component={InspectionListScreen}
//           />
//           <Stack.Screen name="Welcome" component={WelcomeScreen} />
//           <Stack.Screen name="Form" component={FormScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>

//       <Toast
//         config={{
//           error: props => (
//             <BaseToast
//               {...props}
//               style={{
//                 borderLeftColor: 'red',
//                 backgroundColor: '#fff5f5',
//                 borderRadius: 12,
//               }}
//               text1Style={{
//                 color: 'red',
//                 fontSize: 15,
//                 fontWeight: '600',
//               }}
//             />
//           ),
//         }}
//       />
//     </>
//   );
// };

// export default App;
