import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import VoiceInput from './VoiceInput';

const VoiceControlForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [activeField, setActiveField] = useState(null);

  const handleChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    console.log('Form Data:', formData);
  };

  const handleVoiceCommand = command => {
    console.log('Voice Command Received:', command);
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('my name is')) {
      const value = command.replace(/my name is/i, '').trim();
      handleChange('name', value);
      Alert.alert('Voice Command', `Name set to: ${value}`);
      return;
    }

    // Email
    if (lowerCommand.includes('my email is')) {
      const value = command.replace(/my email is/i, '').trim();
      handleChange('email', value);
      Alert.alert('Voice Command', `Email set to: ${value}`);
      return;
    }

    // Age
    if (lowerCommand.includes('age is')) {
      const value = command.replace(/age is/i, '').trim();
      handleChange('age', value);
      Alert.alert('Voice Command', `Age set to: ${value}`);
      return;
    }

    // Submit
    if (lowerCommand.includes('submit form')) {
      handleSubmit();
      return;
    }

    Alert.alert('Voice Command', `Unrecognized command: "${command}"`);
  };

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.title}>Voice-Controlled Form</Text>

      <Text style={formStyles.label}>Name:</Text>
      <TextInput
        style={[
          formStyles.input,
          activeField === 'name' && formStyles.activeInput,
        ]}
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
        placeholder="Enter your name"
      />

      <Text style={formStyles.label}>Email:</Text>
      <TextInput
        style={[
          formStyles.input,
          activeField === 'email' && formStyles.activeInput,
        ]}
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={formStyles.label}>Age:</Text>
      <TextInput
        style={[
          formStyles.input,
          activeField === 'age' && formStyles.activeInput,
        ]}
        value={formData.age}
        onChangeText={text => handleChange('age', text)}
        placeholder="Enter your age"
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />

      <View style={formStyles.voiceControlArea}>
        <VoiceInput onSpeechRecognized={handleVoiceCommand} />
      </View>
    </View>
  );
};

export default VoiceControlForm;

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  activeInput: {
    borderColor: 'blue',
    borderWidth: 2,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  voiceControlArea: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
    alignItems: 'center',
  },
  voicePrompt: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  voiceExample: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
