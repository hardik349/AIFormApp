import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';

// Helper: Generate random date between June 1, 2025 and Sep 30, 2025
const getRandomDate = () => {
  const start = new Date(2025, 5, 1); // June = 5 (0-based)
  const end = new Date(2025, 8, 30); // Sep = 8
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toDateString();
};

// Sample dummy data
const generateData = () => {
  const inspectors = ['Ajay Yadav', 'Rahul Sharma', 'Neha Singh', 'Alok Yadav'];
  const builders = [
    'ABC Constructions',
    'XYZ Builders',
    'Skyline Infra',
    'Dream Homes',
  ];
  const buildings = [
    'Green Tower',
    'Sunset Apartments',
    'Blue Residency',
    'Lake View Plaza',
  ];
  const addresses = [
    'Noida Sector 62, Uttar Pradesh',
    'Gurgaon, Haryana',
    'Indirapuram, Ghaziabad',
    'Connaught Place, New Delhi',
  ];

  return Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    inspectorName: inspectors[Math.floor(Math.random() * inspectors.length)],
    builderName: builders[Math.floor(Math.random() * builders.length)],
    buildingName: buildings[Math.floor(Math.random() * buildings.length)],
    address: addresses[Math.floor(Math.random() * addresses.length)],
    date: getRandomDate(),
  }));
};

const InspectionListScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.buildingName}</Text>
      <Text>Inspector: {item.inspectorName}</Text>
      <Text>Builder: {item.builderName}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header userName="Ajay Yadav" handleLogout={() => {}} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default InspectionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
