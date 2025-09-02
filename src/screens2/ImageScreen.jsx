import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import metrics from '../theme/metrics';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import { useVoiceExtractor } from '../Hook/useVoiceExtractor';

const { width } = Dimensions.get('window'); // Get screen width
const imageSize = (width - metrics.moderateScale(60)) / 2;
const ImageScreen = () => {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        console.log('Camera response:', response); // Log the entire response
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri;
          console.log('Image URI:', uri); // Log the URI
          if (uri) {
            setPhotos(prev => [...prev, uri]);
            console.log('Photos array after adding:', photos); // Log the state
          }
        }
      },
    );
  };

  const handleFormSubmit = () => {
    Alert.alert('Submission', 'Form submitted sucessfullly!!');
  };

  const {
    isListening,
    extractedData,
    errorMsg,
    startListening,
    stopListening,
  } = useVoiceExtractor(`You are a command extractor and multilingual. 
     Extract ONLY recognized command in JSON format.
     Supported commands: "open camera", "submit form".
     Example: { "command": "open camera" }`);

  useEffect(() => {
    if (extractedData?.command) {
      const command = extractedData.command.toLowerCase().trim();
      console.log('🎤 Voice Command:', command);

      if (command.includes('open camera')) {
        handleOpenCamera();
      } else if (command.includes('submit form')) {
        handleFormSubmit();
      }
    }
  }, [extractedData]);

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.imageThumbnail} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add {'\n'}Building Images</Text>

      <View style={{ height: '63%' }}>
        {photos.length > 0 && (
          <FlatList
            data={photos}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Display two columns
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.imageView}>
        <TouchableOpacity
          style={[styles.imageButtonView]}
          onPress={handleOpenCamera}
        >
          <Text style={styles.buttonText2}>
            {photos.length === 0 ? 'Open' : 'Add'}
          </Text>
          <Entypo
            name={photos.length === 0 ? 'camera' : 'plus'}
            size={22}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.micButtonView]}
          onPress={isListening ? stopListening : startListening}
        >
          <Text style={styles.buttonText2}>
            {isListening ? 'Listening..' : 'Tap to speak'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Image')}
        style={[styles.nextButtonView]}
      >
        <Text style={styles.buttonText}>Submit Form</Text>
        <Feather name="arrow-right" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageScreen;

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

  flatListContainer: {
    paddingBottom: metrics.verticalScale(180),
    // Adjust to prevent buttons from overlapping
  },

  imageThumbnail: {
    width: imageSize,
    height: imageSize,
    margin: metrics.moderateScale(5),
    borderRadius: metrics.moderateScale(8),
  },

  imageView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  imageButtonView: {
    flexDirection: 'row',
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#ffffffff',
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(20),
    width: '48%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
  },

  micButtonView: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#ffffffff',
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(10),
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  nextButtonView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(14),
    paddingHorizontal: metrics.moderateScale(35),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonText: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'white',
  },
  buttonText2: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'black',
  },
});
