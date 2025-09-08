import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import metrics from '../theme/metrics';

const Header = ({ userName, handleLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userIconContainer}>
        <EvilIcons name="user" size={metrics.moderateScale(50)} color="black" />
        <Text style={styles.HelloText}>
          Hello {'\n'}
          {userName}
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <AntDesign
          name="logout"
          size={metrics.moderateScale(20)}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.moderateScale(10),
  },
  userIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HelloText: {
    color: '#fff',
    fontSize: metrics.moderateScale(16),
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: 'black',
    padding: metrics.moderateScale(10),
    borderRadius: metrics.moderateScale(10),
  },
});
