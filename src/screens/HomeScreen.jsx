import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import metrics from '../theme/metrics';

const records = [
  { id: '1', name: 'Sipho Dlamini', date: '02/04/2025' },
  { id: '2', name: 'Kagiso Mokoena', date: '02/04/2025' },
  { id: '3', name: 'Elsabe Coetzee', date: '02/04/2025' },
  { id: '4', name: 'Sarah Jane Smith', date: '02/04/2025' },
  { id: '5', name: 'Rebecca Louise Adams', date: '02/04/2025' },
  { id: '6', name: 'Kagiso Mokoena', date: '02/04/2025' },
  { id: '7', name: 'Elsabe Coetzee', date: '02/04/2025' },
  { id: '8', name: 'Sarah Jane Smith', date: '02/04/2025' },
  { id: '9', name: 'Rebecca Louise Adams', date: '02/04/2025' },
];

const HomeScreen = () => {
  const route = useRoute();
  const { userName } = route.params || {};
  const reduxName = useSelector(state => state.user.name);

  const renderItem = ({ item }) => (
    <View style={styles.recordCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.recordInfo}>
        <Text style={styles.recordName}>{item.name}</Text>
        <Text style={styles.recordDate}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.viewMore}>
        <Text style={styles.viewText}>View More</Text>
        <Feather
          name="more-horizontal"
          size={metrics.moderateScale(18)}
          color="#9b8ef9"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>👨‍🦳</Text>
        <Text style={styles.welcome}>Welcome {userName || reduxName} </Text>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons
            name="notifications-outline"
            size={metrics.moderateScale(20)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Gradient Card */}
      <LinearGradient
        colors={['#a1c4fd', '#c2e9fb', '#d4b5ff', '#fcbad3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.gradientContent}>
          <Feather
            name="list"
            size={metrics.moderateScale(26)}
            color="#000"
            style={styles.cardIcon}
          />
          <View>
            <Text style={styles.cardTitle}>Add New Record</Text>
            <Text style={styles.cardSubtitle}>
              Subtitle will be placed here.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Recent Records */}
      <View style={styles.recordsHeader}>
        <Text style={styles.recordsTitle}>Recent Records</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all ➜</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={records}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: metrics.moderateScale(55) }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    padding: metrics.moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: metrics.moderateScale(28),
  },
  welcome: {
    flex: 1,
    color: '#fff',
    fontSize: metrics.moderateScale(16),
    marginLeft: metrics.moderateScale(10),
  },
  bellButton: {
    backgroundColor: '#1e1e1e',
    padding: metrics.moderateScale(8),
    borderRadius: metrics.moderateScale(10),
  },

  gradientCard: {
    marginVertical: metrics.moderateScale(20),
    borderRadius: metrics.moderateScale(15),
    padding: metrics.moderateScale(15),
  },
  gradientContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: metrics.moderateScale(10),
  },
  cardTitle: {
    fontSize: metrics.moderateScale(15),
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: metrics.moderateScale(12),
    color: '#333',
  },
  createButton: {
    marginTop: metrics.moderateScale(15),
    backgroundColor: '#111',
    paddingVertical: metrics.moderateScale(12),
    borderRadius: metrics.moderateScale(10),
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: metrics.moderateScale(14),
  },

  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: metrics.moderateScale(10),
  },
  recordsTitle: {
    color: '#fff',
    fontSize: metrics.moderateScale(15),
    fontWeight: '600',
  },
  seeAll: {
    color: '#9b8ef9',
    fontSize: metrics.moderateScale(13),
  },

  recordCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: metrics.moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    padding: metrics.moderateScale(14),
    marginBottom: metrics.moderateScale(12),
  },
  avatar: {
    backgroundColor: '#6a5acd',
    width: metrics.moderateScale(40),
    height: metrics.moderateScale(40),
    borderRadius: metrics.moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: metrics.moderateScale(14),
  },
  recordInfo: {
    flex: 1,
    marginLeft: metrics.moderateScale(12),
  },
  recordName: {
    color: '#fff',
    fontSize: metrics.moderateScale(14),
    fontWeight: '500',
  },
  recordDate: {
    color: '#aaa',
    fontSize: metrics.moderateScale(11),
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    color: '#9b8ef9',
    marginRight: metrics.moderateScale(5),
    fontSize: metrics.moderateScale(12),
  },
});
