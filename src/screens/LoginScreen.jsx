import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import metrics from '../theme/metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputText from '../components/InputText';
import { login } from '../redux/userSlice';

import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HandleBack from '../components/HandleBack';

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

  const dispatch = useDispatch();

  const handleLogIn = values => {
    dispatch(login(values.userName));
    navigation.replace('BottomTab', {
      screen: 'Home',
      params: { userName: values.userName },
    });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  const handleBack = () => {
    navigation.navigate('GetStarted');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LinearGradient
          colors={['#0a0a0f', '#0f0f1a']}
          style={styles.container}
        >
          <HandleBack handleBack={handleBack} />

          <Text style={styles.WelcomeText}>Welcome Back! 👋</Text>
          <Text style={styles.WelcomeSubText}>
            Great to see you again, You've been missed!
          </Text>
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
                  placeholder="Email"
                  icon="email"
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  error={touched.userName && errors.userName}
                />
                <InputText
                  placeholder="Password"
                  icon="lock"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                />

                <Text style={styles.ForgotText}>Forgot Password ?</Text>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.SignUpContainer}>
                  <Text style={styles.SignUpText}>
                    Don’t Have an Account ?{' '}
                  </Text>
                  <TouchableOpacity
                    style={styles.SignUpButton}
                    onPress={handleSignUp}
                  >
                    <Text style={styles.highlight}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  backContainer: {
    backgroundColor: '#262626',
    borderRadius: metrics.moderateScale(10),
    position: 'absolute',
    padding: metrics.moderateScale(5),
    top: metrics.moderateScale(10),
    left: metrics.moderateScale(20),
  },
  WelcomeText: {
    color: '#fff',
    fontSize: metrics.moderateScale(22),
    fontFamily: 'Inter_18pt-Medium',
    lineHeight: metrics.verticalScale(28),
    marginTop: metrics.moderateScale(70),
    textAlign: 'center',
  },
  WelcomeSubText: {
    color: '#B0B0B0',
    fontSize: metrics.moderateScale(15),
    fontFamily: 'Inter_18pt-Regular',
    lineHeight: metrics.verticalScale(20),
    marginBottom: metrics.moderateScale(30),
    textAlign: 'center',
  },
  highlight: {
    color: '#8a84f9',
  },
  ForgotText: {
    color: '#fff',
    textAlign: 'right',
    marginRight: metrics.moderateScale(20),
    fontSize: metrics.moderateScale(13),
    lineHeight: metrics.verticalScale(18),
    fontFamily: 'Inter_18pt-Regular',
  },
  loginButton: {
    backgroundColor: '#8a84f9',
    gap: metrics.moderateScale(12),
    borderRadius: metrics.moderateScale(12),
    height: metrics.moderateScale(48),
    marginHorizontal: metrics.moderateScale(20),
    paddingVertical: metrics.moderateScale(12),
    paddingHorizontal: metrics.moderateScale(16),
    marginTop: metrics.moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: metrics.moderateScale(16),
    lineHeight: metrics.verticalScale(21),
    fontFamily: 'Inter_24pt-Medium',
  },
  SignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.moderateScale(30),
  },
  SignUpButton: {
    fontSize: metrics.moderateScale(13),
    marginLeft: metrics.moderateScale(2),
  },
  SignUpText: {
    color: '#B0B0B0',
    fontSize: metrics.moderateScale(13),
    lineHeight: metrics.verticalScale(18),
    fontFamily: 'Inter_18pt-Regular',
  },
});
