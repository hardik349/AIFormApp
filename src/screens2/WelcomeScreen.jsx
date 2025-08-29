//import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useVoiceExtractor } from '../Hook/useVoiceExtractor';

// const WelcomeScreen = () => {
//   const navigation = useNavigation();
//   const [inspectorName, setInspectorName] = useState('');

//   const { isListening, extractedData, startListening, stopListening } =
//     useVoiceExtractor('Extract ONLY inspector name in JSON: { "name": "..." }');

//   useEffect(() => {
//     if (extractedData?.name) {
//       console.log('👮 Inspector detected:', extractedData.name);
//       setInspectorName(extractedData.name);
//     }
//   }, [extractedData]);

//   const goToForm = () => {
//     if (inspectorName.trim() !== '') {
//       navigation.navigate('Form', { inspectorName });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>👮 Welcome Inspector</Text>

//       <View style={styles.inputRow}>
//         <TextInput
//           style={styles.input}
//           placeholder="Inspector Name"
//           value={inspectorName}
//           onChangeText={setInspectorName}
//           placeholderTextColor={'black'}
//         />

//         <TouchableOpacity
//           style={styles.micButton}
//           onPress={isListening ? stopListening : startListening}
//         >
//           <Text style={{ fontSize: 20 }}>{isListening ? '🛑' : '🎤'}</Text>
//         </TouchableOpacity>
//       </View>

//       <Button title="Go to Form" onPress={goToForm} />
//     </View>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '80%',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//     color: 'black',
//   },
//   micButton: {
//     marginLeft: 10,
//     padding: 10,
//     backgroundColor: '#eee',
//     borderRadius: 50,
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';
import metrics from '../theme/metrics';

import Feather from 'react-native-vector-icons/Feather';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [inspectorName, setInspectorName] = useState('');

  const { isListening, extractedData, startListening, stopListening } =
    useVoiceExtractor(
      `You are a strict JSON extractor. 
       Extract ONLY inspector name in JSON. Example: { "name": "Ajay" }.`,
    );

  useEffect(() => {
    if (extractedData?.name) {
      console.log('👮 Inspector detected:', extractedData.name);
      setInspectorName(extractedData.name);
    }
  }, [extractedData]);

  // 👉 Screen mount hote hi mic start
  useEffect(() => {
    let timeoutId;

    const autoStart = async () => {
      await startListening();

      // Agar 5s tak kuch nahi bola gaya toh stop kar do
      timeoutId = setTimeout(() => {
        console.log('⏱️ 5s timeout reached, stopping mic...');
        stopListening();
      }, 5000);
    };

    autoStart();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      stopListening(); // cleanup on unmount
    };
  }, []);

  const goToForm = () => {
    if (inspectorName.trim() !== '') {
      navigation.navigate('Form', { inspectorName });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Inspector</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Inspector Name"
        value={inspectorName}
        onChangeText={setInspectorName}
        placeholderTextColor={'black'}
      />
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={isListening ? stopListening : startListening}
        >
          <Feather
            name={isListening ? 'mic' : 'mic-off'}
            color="white"
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToForm}>
          <View style={styles.buttonView}>
            <Feather name="arrow-right" size={22} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: metrics.moderateScale(20),
  },

  title: {
    fontSize: metrics.moderateScale(25),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(20),
  },

  textInput: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Medium',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderWidth: 1,
    width: '100%',
    marginTop: metrics.verticalScale(8),
    paddingHorizontal: metrics.verticalScale(8),
    color: 'black',
  },

  text: {
    fontSize: metrics.moderateScale(14),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(15),
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: metrics.moderateScale(30),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  buttonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(8),
    paddingHorizontal: metrics.moderateScale(20),
  },
});
