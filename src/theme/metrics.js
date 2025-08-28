import { Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const spacing = {
  tiny: moderateScale(4),
  small: moderateScale(8),
  medium12: moderateScale(12),
  medium14: moderateScale(14),
  medium16: moderateScale(16),
  medium18: moderateScale(18),
  medium20: moderateScale(20),
  large22: moderateScale(22),
  large24: moderateScale(24),
  large26: moderateScale(26),
  large28: moderateScale(28),
  large30: moderateScale(30),
  xl: moderateScale(24),
  xxl: moderateScale(32),
};

const fontSizes = {
  font13: moderateScale(13),
  font15: moderateScale(15),
  font17: moderateScale(17),
  font19: moderateScale(19),
  font21: moderateScale(21),
  font23: moderateScale(23),
  font25: moderateScale(25),
  font27: moderateScale(27),
  font30: moderateScale(30),
  font35: moderateScale(35),
};

const borderRadius = {
  small: scale(5),
  medium: scale(10),
  large: scale(15),
  large25: scale(25),
  circle: scale(50), // For creating circular elements
};

const iconSizes = {
  small: moderateScale(16),
  medium: moderateScale(22),
  large: moderateScale(30),
};

const metrics = {
  screenWidth: width,
  screenHeight: height,
  spacing,
  fontSizes,
  borderRadius,
  iconSizes,
  scale,
  verticalScale,
  moderateScale,
};

export default metrics;
