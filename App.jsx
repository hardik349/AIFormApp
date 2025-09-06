import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigation from './src/Navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />

      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />

      <Toast
        config={{
          error: props => (
            <BaseToast
              {...props}
              style={{
                borderLeftColor: 'red',
                backgroundColor: '#fff5f5',
                borderRadius: 12,
              }}
              text1Style={{
                color: 'red',
                fontSize: 15,
                fontWeight: '600',
              }}
            />
          ),
        }}
      />
    </Provider>
  );
};

export default App;
