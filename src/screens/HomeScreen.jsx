// import {
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import metrics from '../theme/metrics';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Header from '../components/Header';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const HomeScreen = () => {

//   const route = useRoute();
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     if (route.params?.userName) {
//       setUserName(route.params.userName);
//     } else {
//       const loadUser = async () => {
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedUser) {
//           setUserName(storedUser);
//         }
//       };
//       loadUser();
//     }
//   }, [route.params]);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('user');
//     navigation.replace('Login');
//   };

//   const handleInspectionForm = () => {
//     navigation.navigate('InspectionList');
//   };
//   const handleInspectionStart = () => {
//     navigation.navigate('Welcome');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}

//       <Header userName={userName} handleLogout={handleLogout} />

//       {/* Body */}
//       <TouchableOpacity
//         onPress={handleInspectionForm}
//         style={styles.InspectionBtn}
//       >
//         <Text style={styles.InspectionTxt}>Inspection Forms</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleInspectionStart}
//         style={styles.InspectionStartBtn}
//       >
//         <Text style={styles.InspectionTxt}> Start Inspection</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a0a0f',
//   },

//   InspectionBtn: {
//     position: 'absolute',
//     width: '90%',
//     bottom: metrics.moderateScale(80),
//     backgroundColor: 'black',
//     padding: metrics.moderateScale(10),
//     borderRadius: metrics.moderateScale(10),
//     marginHorizontal: metrics.moderateScale(20),
//     marginTop: metrics.moderateScale(20),
//   },
//   InspectionTxt: {
//     fontSize: metrics.moderateScale(16),
//     fontWeight: '500',
//     textAlign: 'center',
//     color: 'white',
//   },
//   InspectionStartBtn: {
//     position: 'absolute',
//     width: '90%',
//     bottom: metrics.moderateScale(20),
//     backgroundColor: 'black',
//     padding: metrics.moderateScale(10),
//     borderRadius: metrics.moderateScale(10),
//     marginHorizontal: metrics.moderateScale(20),
//     marginTop: metrics.moderateScale(20),
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const records = [
  { id: '1', name: 'Sipho Dlamini', date: '02/04/2025' },
  { id: '2', name: 'Kagiso Mokoena', date: '02/04/2025' },
  { id: '3', name: 'Elsabe Coetzee', date: '02/04/2025' },
  { id: '4', name: 'Sarah Jane Smith', date: '02/04/2025' },
  { id: '5', name: 'Rebecca Louise Adams', date: '02/04/2025' },
];

const HomeScreen = () => {
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
        <Feather name="more-horizontal" size={20} color="#9b8ef9" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>👨‍🦳</Text>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={20} color="#fff" />
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
          <Feather name="list" size={26} color="#000" style={styles.cardIcon} />
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

      {/* Records List */}
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 30,
  },
  welcome: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  bellButton: {
    backgroundColor: '#1e1e1e',
    padding: 8,
    borderRadius: 10,
  },

  gradientCard: {
    marginVertical: 20,
    borderRadius: 15,
    padding: 15,
  },
  gradientContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#333',
  },
  createButton: {
    marginTop: 15,
    backgroundColor: '#111',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recordsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    color: '#9b8ef9',
    fontSize: 14,
  },

  recordCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#6a5acd',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recordInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recordName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  recordDate: {
    color: '#aaa',
    fontSize: 12,
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    color: '#9b8ef9',
    marginRight: 5,
  },
});
