import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Image,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import HandleBack from '../components/HandleBack';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { launchCamera } from 'react-native-image-picker';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';
import { useNavigation } from '@react-navigation/native';

const RenderInput = React.memo(
  ({
    fieldKey,
    icon,
    placeholder,
    currentField,
    filled,
    info,
    setInfo,
    setFilled,
    setCurrentFieldIndex,
    fieldOrder,
  }) => {
    const isActive = currentField === fieldKey;
    const status = filled[fieldKey];
    const value = info[fieldKey] ?? '';
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1.02 : 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }, [isActive]);

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View
          style={[
            styles.inputInner,
            isActive && { borderColor: '#A099FF', borderWidth: 1.2 },
          ]}
        >
          <Ionicons name={icon} size={24} color="#bbb" style={styles.icon} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#bbb"
            style={styles.input}
            value={value}
            onChangeText={t => {
              setInfo(prev => ({ ...prev, [fieldKey]: t }));
              setFilled(prev => ({
                ...prev,
                [fieldKey]: t.trim() ? 'filled' : 'empty',
              }));
            }}
            onFocus={() => {
              const index = fieldOrder.indexOf(fieldKey);
              if (index !== -1) setCurrentFieldIndex(index);
            }}
            blurOnSubmit={false}
          />
          {status === 'filled' && (
            <Ionicons name="checkmark-circle" size={20} color="#00ff99" />
          )}
          {status === 'empty' && (
            <Ionicons name="close-circle" size={20} color="red" />
          )}
        </View>
      </Animated.View>
    );
  },
);

const AddDetailsScreen = () => {
  // ------------------- FORM STATE -------------------
  const [info, setInfo] = useState({
    builderName: '',
    address: '',
    buildingName: '',
    date: new Date().toLocaleDateString('en-GB'),
  });

  const [filled, setFilled] = useState({
    builderName: 'initial',
    address: 'initial',
    buildingName: 'initial',
    date: 'initial',
  });

  const fieldOrder = ['builderName', 'address', 'buildingName', 'date'];
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const currentField = fieldOrder[currentFieldIndex];
  const navigation = useNavigation();

  const allFieldsFilled =
    info.builderName.trim() !== '' &&
    info.address.trim() !== '' &&
    info.buildingName.trim() !== '' &&
    info.date.trim() !== '';

  const [micStatus, setMicStatus] = useState('idle'); // idle | listening | stopped
  const micStatusRef = useRef(micStatus);
  const listenTimeoutRef = useRef(null);

  const { isListening, extractedData, startListening, stopListening } =
    useVoiceExtractor(
      `Extract only ${currentField} from voice in JSON EXACTLY like: { "${currentField}": "..." }`,
    );

  useEffect(() => {
    micStatusRef.current = micStatus;
  }, [micStatus]);

  useEffect(() => {
    if (extractedData && extractedData[currentField]) {
      const value = String(extractedData[currentField]).trim();
      if (value) {
        setInfo(prev => ({ ...prev, [currentField]: value }));
        setFilled(prev => ({ ...prev, [currentField]: 'filled' }));

        // Move to next field if available
        if (currentFieldIndex < fieldOrder.length - 1) {
          setCurrentFieldIndex(prev => prev + 1);
        }
      }
      stopListening?.();
      setMicStatus('stopped');
    }
  }, [extractedData]);

  useEffect(() => {
    if (listenTimeoutRef.current) {
      clearTimeout(listenTimeoutRef.current);
      listenTimeoutRef.current = null;
    }
    if (micStatus === 'listening') {
      listenTimeoutRef.current = setTimeout(() => {
        if (micStatusRef.current === 'listening') {
          stopListening?.();
          setMicStatus('idle');
          Toast.show({
            type: 'error',
            text1: 'Not recognized… try again',
            position: 'top',
            visibilityTime: 2500,
          });
        }
      }, 5000);
    }
    return () => {
      if (listenTimeoutRef.current) {
        clearTimeout(listenTimeoutRef.current);
        listenTimeoutRef.current = null;
      }
    };
  }, [micStatus, stopListening]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMicButtonPress = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'No internet connection',
        position: 'top',
        visibilityTime: 2500,
      });
      return;
    }
    if (isListening) {
      stopListening();
      setMicStatus('stopped');
    } else {
      startListening();
      setMicStatus('listening');
    }
  };

  // ------------------- DATE PICKER -------------------
  const [showDatePicker, setShowDatePicker] = useState(false);
  const today = new Date();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString('en-GB');
      setInfo(prev => ({ ...prev, date: formatted }));
      setFilled(prev => ({ ...prev, date: 'filled' }));
      // if date was active, advance
      if (currentField === 'date') {
        setCurrentFieldIndex(fieldOrder.length - 1); // last step stays
      }
    }
  };

  const [media, setMedia] = useState([]); // array of {uri, type}

  const openCamera = () => {
    Alert.alert('Choose Media Type', 'Capture Photo or Record Video?', [
      {
        text: 'Photo',
        onPress: () => {
          launchCamera({ mediaType: 'photo', quality: 1 }, resp => {
            if (!resp?.didCancel && !resp?.errorCode && resp?.assets?.length) {
              const asset = resp.assets[0];
              setMedia(prev => [...prev, { uri: asset.uri, type: 'photo' }]);
              Toast.show({
                type: 'success',
                text1: 'Photo added',
                position: 'bottom',
                visibilityTime: 1500,
              });
            }
          });
        },
      },
      {
        text: 'Video',
        onPress: () => {
          launchCamera({ mediaType: 'video', videoQuality: 'high' }, resp => {
            if (!resp?.didCancel && !resp?.errorCode && resp?.assets?.length) {
              const asset = resp.assets[0];
              setMedia(prev => [...prev, { uri: asset.uri, type: 'video' }]);
              Toast.show({
                type: 'success',
                text1: 'Video added',
                position: 'bottom',
                visibilityTime: 1500,
              });
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const [alertVisible, setAlertVisible] = useState(false);
  const handleSubmit = () => setAlertVisible(true);

  // ------------------- PROGRESS -------------------
  const stepsDone = Object.values(filled).filter(s => s === 'filled').length;
  const progressPercent = (stepsDone / fieldOrder.length) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <HandleBack handleBack={handleBack} />

        {/* Header */}
        <Text style={styles.title}>Add New Details</Text>
        <Text style={styles.subtitle}>Sub-title goes here</Text>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progressPercent}%` }]}
          />
        </View>

        {/* Inputs */}
        <View style={{ gap: verticalScale(12), marginTop: verticalScale(8) }}>
          <RenderInput
            fieldKey="builderName"
            icon="person-outline"
            placeholder="Builder Name"
            currentField={currentField}
            filled={filled}
            info={info}
            setInfo={setInfo}
            setFilled={setFilled}
            setCurrentFieldIndex={setCurrentFieldIndex}
            fieldOrder={fieldOrder}
          />

          <RenderInput
            fieldKey="address"
            icon="location-outline"
            placeholder="Address"
            currentField={currentField}
            filled={filled}
            info={info}
            setInfo={setInfo}
            setFilled={setFilled}
            setCurrentFieldIndex={setCurrentFieldIndex}
            fieldOrder={fieldOrder}
          />

          <RenderInput
            fieldKey="buildingName"
            icon="business-outline"
            placeholder="Building Name"
            currentField={currentField}
            filled={filled}
            info={info}
            setInfo={setInfo}
            setFilled={setFilled}
            setCurrentFieldIndex={setCurrentFieldIndex}
            fieldOrder={fieldOrder}
          />

          {/* Date as button input */}
          <TouchableOpacity
            style={[
              styles.inputContainer,
              currentField === 'date' && { borderColor: '#A099FF' },
            ]}
            onPress={() => {
              setCurrentFieldIndex(fieldOrder.indexOf('date'));
              setShowDatePicker(true);
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#bbb"
              style={styles.icon}
            />
            <Text style={{ color: '#fff', fontSize: moderateScale(15) }}>
              {info.date}
            </Text>
            {filled.date === 'filled' && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#00ff99"
                style={{ marginLeft: 'auto' }}
              />
            )}
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={today}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Upload Images / Videos */}
        <TouchableOpacity style={styles.uploadBtn} onPress={openCamera}>
          <Text style={styles.uploadText}>Upload Images</Text>
          <Ionicons
            name="camera-outline"
            size={moderateScale(24)}
            color="#A099FF"
          />
        </TouchableOpacity>

        {/* Thumbnails */}
        {media.length > 0 && (
          <View style={styles.thumbContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {media.map((m, idx) => (
                <View key={`${m.uri}-${idx}`} style={[styles.thumbWrap]}>
                  <Image source={{ uri: m.uri }} style={styles.thumb} />
                  {m.type === 'video' && (
                    <View style={styles.videoBadge}>
                      <Ionicons name="videocam" size={14} color="#000" />
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            !allFieldsFilled && { backgroundColor: '#5C588B' },
          ]}
          disabled={!allFieldsFilled}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit Form</Text>
          <Ionicons
            name="chevron-forward"
            size={moderateScale(16)}
            color="#262626"
          />
        </TouchableOpacity>

        {/* Voice Mic */}
        <View style={styles.voiceContainer}>
          <TouchableOpacity onPress={handleMicButtonPress} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9CFFAC', '#88C2FF', '#C2A5FF', '#FFADDB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.micCircle}
            >
              <Ionicons
                name="mic-outline"
                size={moderateScale(28)}
                color={micStatus === 'listening' ? '#ff3333' : '#000'}
              />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.voiceText}>
            {micStatus === 'listening'
              ? `Listening for ${currentField}…`
              : `Tap to speak ${currentField}`}
          </Text>
        </View>
      </ScrollView>

      {/* Success Alert Modal */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setAlertVisible(false)}
      >
        <BlurView
          style={styles.blurBackground}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="black"
        />

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

export default AddDetailsScreen;

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
    marginTop: verticalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(15),
    fontFamily: 'Inter_18pt-Regular',
    color: '#bbb',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  progressTrack: {
    height: verticalScale(4),
    backgroundColor: '#2b2b2b',
    borderRadius: scale(3),
    overflow: 'hidden',
    marginBottom: verticalScale(20),
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A099FF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: '#1e1e1e',
  },
  inputContainerDim: {
    backgroundColor: '#1e1e1e',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#1e1e1e',
    marginBottom: verticalScale(12),
  },
  activeWrapper: {
    borderRadius: scale(12),
    padding: scale(2),
    marginBottom: verticalScale(12),
  },
  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    height: verticalScale(48),
  },
  icon: { marginRight: scale(8) },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Inter_18pt-Regular',
    fontSize: moderateScale(15),
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A099FF',
    borderWidth: 1,
    borderRadius: scale(10),
    padding: scale(12),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(12),
    gap: scale(10),
    justifyContent: 'center',
  },
  uploadText: {
    color: '#A099FF',
    fontSize: moderateScale(14),
    fontFamily: 'Inter_18pt-Medium',
  },
  thumbContainer: {
    borderColor: '#8a84f9',
    borderWidth: 1.5,
    borderRadius: scale(12),
    overflow: 'hidden',
    justifyContent: 'flex-start',
    padding: scale(8),
    marginBottom: verticalScale(12),
  },
  thumbWrap: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(10),
    overflow: 'hidden',
    marginRight: scale(8),
    position: 'relative',
    backgroundColor: '#222',
  },
  thumb: { width: '100%', height: '100%' },
  videoBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#A099FF',
    borderRadius: 6,
  },
  voiceContainer: {
    borderWidth: 1,
    borderColor: '#A099FF',
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    marginBottom: verticalScale(14),
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
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: '#A099FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    padding: scale(15),
    marginBottom: verticalScale(20),
  },
  submitText: {
    color: '#262626',
    fontSize: moderateScale(15),
    fontFamily: 'Inter_18pt-Medium',
    marginRight: scale(6),
  },
  // Modal
  blurBackground: { ...StyleSheet.absoluteFillObject },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
