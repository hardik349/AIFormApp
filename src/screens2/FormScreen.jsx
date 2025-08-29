import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';
import metrics from '../theme/metrics';

import Feather from 'react-native-vector-icons/Feather';

const FormScreen = () => {
  const route = useRoute();
  const { inspectorName } = route.params || {};
  const [info, setInfo] = useState({
    name: '',
    address: '',
    building: '',
    date: '',
  });
  const [filled, setFilled] = useState({
    name: false,
    address: false,
    building: false,
    date: false,
  });
  const { isListening, extractedData, startListening, stopListening } =
    useVoiceExtractor(
      'Extract in JSON: { "name": "...", "address": "...", "building": "...", "date": "..." }',
    );
  useEffect(() => {
    if (extractedData) {
      console.log('📋 Form Extracted:', extractedData);
      setInfo(prev => ({
        ...prev,
        name: extractedData.name || prev.name,
        address: extractedData.address || prev.address,
        building: extractedData.building || prev.building,
        date: extractedData.date || prev.date,
      }));
      setFilled({
        name: !!extractedData.name,
        address: !!extractedData.address,
        building: !!extractedData.building,
        date: !!extractedData.date,
      });
    }
  }, [extractedData]);
  const renderInput = (field, label, value, onChange, filledFlag) => (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{field}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={label}
        placeholderTextColor={'black'}
        value={value}
        onChangeText={onChange}
      />
      {filledFlag && <Text style={styles.tick}>✅</Text>}
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
          onPress={isListening ? stopListening : startListening}
        >
          <Feather
            name={isListening ? 'mic' : 'mic-off'}
            color="white"
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.buttonView}>
            <Feather name="arrow-right" size={22} color="white" />
          </View>
        </TouchableOpacity>
      </View>
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

  buttonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(25),
  },

  bottomView: {
    flexDirection: 'row',
    marginTop: metrics.moderateScale(30),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  inputContainer: {
    width: '100%',
    marginBottom: 10,
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
  },
  tick: { marginLeft: 10, fontSize: 18 },
});
