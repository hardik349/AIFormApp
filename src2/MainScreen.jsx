import React from 'react';
import { Text, View } from 'react-native';
import TopBar from './components/TopBar';
import SlideView from './components/SlideView';

const MainScreen = () => {
  return (
    <View>
      <TopBar />
      <SlideView />
    </View>
  );
};

export default MainScreen;
