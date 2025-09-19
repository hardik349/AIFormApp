import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import metrics from '../../src/theme/metrics';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const TopBar = () => {
  return (
    <View>
      <View style={styles.topRow}>
        <Entypo name="chevron-thin-left" size={15} />
        <Text style={styles.text}>
          Free delievery for orders over 300 SAR{' '}
          <Text style={{ borderBottomEndRadius: 2 }}>T&Cs</Text>
        </Text>

        <Entypo name="chevron-thin-right" size={15} />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.box}>
          <View style={styles.circleBox}>
            <Feather name="menu" size={16} />
          </View>
          <View style={styles.circleBox}>
            <AntDesign name="user" size={16} />
          </View>
        </View>

        <Image
          source={require('../assets/images/Clientlogo.png')}
          style={{ width: 32, height: 35 }}
        />

        <View style={styles.box}>
          <View style={styles.circleBox}>
            <Feather name="search" size={16} />
          </View>
          <View style={styles.circleBox}>
            <Feather name="shopping-cart" size={16} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    backgroundColor: '#C5DB3D',
    alignItems: 'center',
    height: metrics.verticalScale(32),
    justifyContent: 'center',
    paddingHorizontal: metrics.moderateScale(10),
  },
  text: {
    marginHorizontal: metrics.moderateScale(10),
    fontSize: 14,
  },
  box: {
    flexDirection: 'row',
    borderRadius: metrics.moderateScale(30),
    backgroundColor: '#eaeaeaff',
    height: 50,
    width: 100,
    padding: metrics.moderateScale(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBox: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: metrics.moderateScale(8),
  },
});
