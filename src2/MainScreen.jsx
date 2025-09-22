import React from 'react';
import { Text, View } from 'react-native';
import TopBar from './components/TopBar';
import SlideView from './components/SlideView';

const MainScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <SlideView />
    </View>
  );
};

export default MainScreen;
