import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputText from '../components/InputText';
import metrics from '../theme/metrics';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogIn = async values => {
    await AsyncStorage.setItem('user', values.userName);
    navigation.replace('Home', { userName: values.userName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffffff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.WelcomeText}>Welcome {'\n'}Back!</Text>

          <Formik
            initialValues={{ userName: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <InputText
                  placeholder="Username"
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  error={touched.userName && errors.userName}
                />

                <InputText
                  placeholder="Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
  },
  WelcomeText: {
    fontSize: metrics.moderateScale(25),
    fontFamily: 'Raleway-Bold',
    marginTop: metrics.verticalScale(10),
    marginBottom: metrics.verticalScale(20),
    marginLeft: metrics.moderateScale(20),
  },
  button: {
    borderRadius: metrics.moderateScale(12),
    backgroundColor: '#000000',
    paddingVertical: metrics.moderateScale(8),
    marginTop: metrics.moderateScale(20),
    marginHorizontal: metrics.moderateScale(20),
  },
  buttonText: {
    fontSize: metrics.moderateScale(17),
    fontFamily: 'Raleway-Bold',
    color: 'white',
    textAlign: 'center',
  },
});
