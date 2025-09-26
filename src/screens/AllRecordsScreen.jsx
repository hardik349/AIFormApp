import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import metrics from '../theme/metrics';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllRecordsScreen = ({ route, navigation }) => {
  const { records } = route.params || { records: [] };

  const [search, setSearch] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(records);

  const handleSearch = text => {
    setSearch(text);
    const filtered = records.filter(item =>
      item.builderName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredRecords(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => navigation.navigate('RecordDetails', { record: item })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.builderName.charAt(0)}</Text>
      </View>
      <View style={styles.recordInfo}>
        <Text style={styles.recordName}>{item.builderName}</Text>
        <Text style={styles.recordDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="arrow-back"
            size={metrics.moderateScale(22)}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Records</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search records..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Records List */}
      <FlatList
        data={filteredRecords}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No records found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AllRecordsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    padding: metrics.moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.moderateScale(15),
  },
  backBtn: {
    marginRight: metrics.moderateScale(10),
    backgroundColor: '#262626',
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: metrics.moderateScale(17),
    fontWeight: '600',
    marginLeft: metrics.moderateScale(14),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: metrics.moderateScale(8),
    paddingHorizontal: metrics.moderateScale(10),
    paddingVertical: metrics.moderateScale(4),
    marginBottom: metrics.moderateScale(15),
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#fff',
    fontSize: metrics.moderateScale(14),
  },
  recordCard: {
    backgroundColor: '#262626',
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
  emptyContainer: {
    marginTop: metrics.moderateScale(40),
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: metrics.moderateScale(14),
  },
});
