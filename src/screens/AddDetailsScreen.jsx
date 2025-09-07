import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import HandleBack from '../components/HandleBack';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const AddDetailsScreen = () => {
  const [builderName, setBuilderName] = useState('');
  const [address, setAddress] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [date, setDate] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSubmit = () => {
    setAlertVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <HandleBack handleBack={() => {}} />
        {/* Header */}
        <Text style={styles.title}>Add New Details</Text>
        <Text style={styles.subtitle}>Sub-title goes here</Text>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={styles.progressDotActive} />
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#bbb"
            style={styles.icon}
          />
          <TextInput
            placeholder="Builder Name"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={builderName}
            onChangeText={setBuilderName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="location-outline"
            size={24}
            color="#bbb"
            style={styles.icon}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="business-outline"
            size={24}
            color="#bbb"
            style={styles.icon}
          />
          <TextInput
            placeholder="Building Name"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={buildingName}
            onChangeText={setBuildingName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#bbb"
            style={styles.icon}
          />
          <TextInput
            placeholder="Date (dd/mm/yyyy)"
            placeholderTextColor="#bbb"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Upload Images</Text>
          <Ionicons
            name="camera-outline"
            size={moderateScale(24)}
            color="#a78bfa"
          />
        </TouchableOpacity>

        {/* Submit Form */}
        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            colors={['#8b5cf6', '#6366f1']}
            style={styles.submitBtn}
          >
            <Text style={styles.submitText}>Submit Form</Text>
            <Ionicons
              name="chevron-forward"
              size={moderateScale(16)}
              color="#fff"
            />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.voiceContainer}>
          <TouchableOpacity>
            <LinearGradient
              colors={['#9CFFAC', '#88C2FF', '#C2A5FF', '#FFADDB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.micCircle}
            >
              <Ionicons
                name="mic-outline"
                size={moderateScale(28)}
                color="#000"
              />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.voiceText}>Tap to Speak</Text>
        </View>
      </ScrollView>

      {/* Success Alert Modal */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setAlertVisible(false)}
      >
        {/* Blur Background */}
        <BlurView
          style={styles.blurBackground}
          blurType="dark"
          blurAmount={2} // lower blur effect
          reducedTransparencyFallbackColor="black"
        />

        {/* Centered Alert */}
        <View style={styles.centeredView}>
          <View style={styles.alertBox}>
            <Ionicons name="checkmark-circle" size={60} color="limegreen" />
            <Text style={styles.alertTitle}>Details Added Successfully</Text>
            <Text style={styles.alertMessage}>
              Your details have been added successfully and are now securely
              stored in our system.
            </Text>
            <TouchableOpacity onPress={() => setAlertVisible(false)}>
              <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    backgroundColor: '#000',
    flexGrow: 1,
  },
  title: {
    fontSize: moderateScale(22),
    fontFamily: 'Inter_18pt-Regular',
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginTop: verticalScale(40),
  },
  subtitle: {
    fontSize: moderateScale(15),
    fontFamily: 'Inter_18pt-Regular',
    color: '#bbb',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  progressDot: {
    width: scale(40),
    height: verticalScale(3),
    backgroundColor: '#444',
    borderRadius: scale(5),
    marginHorizontal: scale(4),
  },
  progressDotActive: {
    width: scale(40),
    height: verticalScale(3),
    backgroundColor: '#8b5cf6',
    borderRadius: scale(5),
    marginHorizontal: scale(4),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(15),
    height: verticalScale(48),
  },
  icon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Inter_18pt-Regular',
    fontSize: moderateScale(15),
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#8b5cf6',
    borderWidth: 1,
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: verticalScale(15),
    gap: scale(10),
    justifyContent: 'center',
  },
  uploadText: {
    color: '#a78bfa',
    fontSize: moderateScale(14),
    fontFamily: 'Inter_18pt-Medium',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    padding: scale(15),
    marginBottom: verticalScale(20),
  },
  submitText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontFamily: 'Inter_18pt-Medium',
    marginRight: scale(6),
  },
  voiceContainer: {
    borderWidth: 1,
    borderColor: '#8b5cf6',
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
  },
  micCircle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceText: {
    color: '#fff',
    marginTop: verticalScale(8),
    fontSize: moderateScale(13),
    fontWeight: '500',
  },

  // Alert Modal
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: scale(300),
    backgroundColor: '#1e1e1e',
    borderRadius: scale(12),
    padding: scale(20),
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#fff',
    marginTop: verticalScale(12),
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: moderateScale(14),
    color: '#bbb',
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
  goBackText: {
    color: '#6c63ff',
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginTop: verticalScale(10),
  },
});

export default AddDetailsScreen;
