import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import metrics from '../../src/theme/metrics';
import { AuthContext } from './AuthContext';

const { width } = Dimensions.get('window');

const productData = {
  name: 'SquishMellows',
  desc: 'SquishMellows Official KellyTop Plush 12 Maui The Pineapple',
  price: '50.00',
  code: 'SKU-235346456',
  images: [
    { id: '1', source: require('../assets/images/Image.png') },
    { id: '2', source: require('../assets/images/Img4.png') },
    { id: '3', source: require('../assets/images/Img3.png') },
    { id: '4', source: require('../assets/images/Img2.png') },
    { id: '5', source: require('../assets/images/Img.png') },
  ],
};

const SlideView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const scrollToIndex = index => {
    if (flatListRef.current && flatListRef.current.scrollToIndex) {
      flatListRef.current.scrollToIndex({ animated: true, index });
      setActiveIndex(index);
    }
  };

  const { isLoggedIn, coupons, login, logout } = useContext(AuthContext);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.source} style={styles.image} resizeMode="cover" />
    </View>
  );

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity onPress={() => scrollToIndex(index)}>
      <Image
        source={item.source}
        style={[
          styles.thumbnail,
          index === activeIndex && styles.activeThumbnailBorder,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <Ionicons name="location-outline" size={18} />
        <Text style={{ marginStart: 8 }}>Deliver to Jedah</Text>
      </View>
      <View style={styles.topRow2}>
        <Entypo name="chevron-thin-left" size={18} />
        <Text style={{ color: 'green', marginStart: 8 }}>Back to Results</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={productData.images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const currentIndex = Math.round(contentOffsetX / width);
          setActiveIndex(currentIndex);
        }}
      />

      <FlatList
        data={productData.images}
        renderItem={renderThumbnail}
        keyExtractor={item => `thumb-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailContainer}
      />
      <View style={styles.productRow}>
        <Text style={styles.productName}>{productData.name}</Text>

        <Text style={styles.productCode}>{productData.code}</Text>
      </View>

      <Text style={styles.productDescription}>{productData.desc}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: metrics.moderateScale(18),
          marginBottom: 40,
        }}
      >
        <View style={{ height: 18, width: 18 }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ height: '100%', width: '100%' }}
          />
        </View>

        <Text style={styles.productPrice}>{productData.price}</Text>
        <Text style={styles.actualPrice}>70.00</Text>
        <Text style={styles.discountPrice}>28% OFF</Text>
      </View>

      {!isLoggedIn ? (
        <View style={styles.authSection}>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.signupText}>Signup and Get</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 18, width: 18 }}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={{ height: '100%', width: '100%' }}
                  />
                </View>

                <Text style={styles.productPrice2}>
                  {productData.price} off
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 40,
                width: 120,
                borderRadius: 8,
                backgroundColor: '#267550',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
                Signup Now
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.authSection}>
          <Text style={styles.couponsHeader}>Your Available Coupons:</Text>
          {coupons.length > 0 ? (
            coupons.map(coupon => (
              <Text key={coupon.id} style={styles.couponItem}>
                - {coupon.code}: {coupon.discount}
              </Text>
            ))
          ) : (
            <Text>No coupons available at the moment.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { height: 800 },
  slide: {
    width: width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnailBorder: {
    borderColor: 'green',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingStart: metrics.moderateScale(20),
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(15),
  },
  topRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingStart: metrics.moderateScale(20),
    marginBottom: metrics.verticalScale(20),
  },
  productName: {
    fontSize: 19,
    fontWeight: 500,
    color: 'green',
    paddingHorizontal: metrics.moderateScale(5),
  },
  productDescription: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: metrics.moderateScale(20),
    marginBottom: metrics.verticalScale(10),
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: metrics.moderateScale(5),
  },
  productPrice2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginStart: metrics.moderateScale(5),
  },
  actualPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a6a6a6ff',
    textDecorationLine: 'line-through',
    marginStart: metrics.moderateScale(8),
  },
  discountPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#aa1414ff',
    marginStart: metrics.moderateScale(8),
  },
  productCode: {
    fontSize: 16,
    color: '#999',
    paddingHorizontal: metrics.moderateScale(20),
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: metrics.moderateScale(15),
    justifyContent: 'flex-start',
    marginTop: metrics.verticalScale(5),
  },

  authSection: {
    height: 100,
    width: '90%',
    borderRadius: 12,
    backgroundColor: '#96D5DB',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },
  signupText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
});

export default SlideView;
