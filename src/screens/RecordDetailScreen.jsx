import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView, // Added for loading indicator
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import metrics from '../theme/metrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video'; // Import the Video component

const RecordDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { record } = route.params || {};

  if (!record) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>No record found</Text>
      </View>
    );
  }

  // State to manage video loading (optional, but good for UX)
  const [videoLoading, setVideoLoading] = useState({});

  const handleVideoLoadStart = index => {
    setVideoLoading(prev => ({ ...prev, [index]: true }));
  };

  const handleVideoLoad = index => {
    setVideoLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleVideoError = (index, error) => {
    console.error(`Video error for item ${index}:`, error);
    setVideoLoading(prev => ({ ...prev, [index]: false }));
    // You might want to display an error message to the user
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Record Details</Text>
      </View>

      {/* Card */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {record.builderName?.charAt(0)}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{record.builderName}</Text>
            <Text style={styles.date}>Date: {record.date}</Text>
            {record.address && (
              <Text style={styles.detail}>Address: {record.address}</Text>
            )}
            {record.buildingName && (
              <Text style={styles.detail}>Building: {record.buildingName}</Text>
            )}
          </View>
        </View>

        {/* Media Section */}
        {record.media && record.media.length > 0 && (
          <View style={styles.mediaSection}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            {record.media.map((mediaItem, index) => (
              <View key={index} style={styles.mediaItemContainer}>
                {mediaItem.type === 'photo' ? (
                  <Image
                    source={{ uri: mediaItem.uri }}
                    style={styles.mediaImage}
                  />
                ) : (
                  <View style={styles.videoPlayerContainer}>
                    {videoLoading[index] && (
                      <ActivityIndicator
                        size="large"
                        color="#fff"
                        style={styles.videoLoader}
                      />
                    )}
                    <Video
                      source={{ uri: mediaItem.uri }}
                      style={styles.videoPlayer}
                      controls={true}
                      resizeMode="contain"
                      onLoadStart={() => handleVideoLoadStart(index)}
                      onLoad={() => handleVideoLoad(index)}
                      onError={error => handleVideoError(index, error)}
                      paused={true}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    padding: metrics.moderateScale(20),
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.moderateScale(20),
  },
  backBtn: {
    marginRight: metrics.moderateScale(10),
    backgroundColor: '#262626',
    padding: 8,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: metrics.moderateScale(16),
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#6a5acd',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  info: { marginLeft: 15, flex: 1 },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  date: { color: '#aaa', marginTop: 4 },
  detail: { color: '#bbb', marginTop: 4 },

  mediaSection: {
    marginTop: 20,
  },
  mediaItemContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  mediaImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  // New styles for video player
  videoPlayerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#000', // A dark background for the video player
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10, // Apply border radius to the video component itself
  },
  videoLoader: {
    position: 'absolute',
    zIndex: 1, // Ensure loader is above the video
  },

  actionBtn: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a5acd',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  actionText: { color: '#fff', marginLeft: 8, fontWeight: '600' },
});
