import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigation from './src/Navigation/AppNavigation';
import MainScreen from './src2/MainScreen';
import { AuthProvider } from './src2/components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <MainScreen />
    </AuthProvider>
  );
};

export default App;
