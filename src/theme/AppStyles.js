import {moderateScale} from 'react-native-size-matters';
const AppStyles = {
  color: {
    primaryLight: '#4caf50',
    primaryDark: '#28862b',
    primaryLight2: '#4caf5066',
    secondaryLight: '#3b3b3b',
    secondaryDark: '#272727',
    secondaryLight2: '#545454',
    button: '#EE3169',
    white: '#ffffff',
    lightGreen: '#C3D61B',
  },
  fontSize: {
    xxxxSmall: moderateScale(6),
    xxxSmall: moderateScale(9),
    xsSmall: moderateScale(10),
    small: moderateScale(12),
    medium: moderateScale(15),
    medium2: moderateScale(16),
    large: moderateScale(18),
  },
  fontName: {
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    light: 'Poppins-Light',
    medium: 'Poppins-Medium',
    semi: 'Poppins-SemiBold',

    gilroyRegular: 'Gilroy-Regular',
    gilroyBold: 'Gilroy-Bold',
    gilroySemiBold: 'Gilroy-SemiBold',
    gilroyLight: 'Gilroy-Light',
    gilroyMedium: 'Gilroy-Medium',
  },
  borderRadius: {
    main: moderateScale(24),
    small: moderateScale(7),
    xsSmall: moderateScale(4),
  },
  statusRGB: {
    danger: 'rgba(255, 87, 87, 0.30)',
    info: 'rgba(56, 182, 255, 0.30)',
    primary: 'rgba(76, 175, 80, 0.30)',
    success: 'rgba(76, 175, 80, 0.30)',
    warning: 'rgba(255, 189, 89, 0.30)',
  },
  status: {
    danger: '#ff5757',
    info: '#38b6ff',
    primary: '#4caf50',
    success: '#4caf50',
    warning: '#ffbd59',
  },

  timecardColor: {
    theme: '#313a48',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#f7aa39',
    danger: '#e45758',
    light: '#cacaca',
  },
};

export default AppStyles;

export const ButtonShadow = {
  shadowColor: '#ED8522',
  shadowOffset: {
    width: 0,
    height: moderateScale(2),
  },
  shadowOpacity: moderateScale(0.12),
  shadowRadius: moderateScale(3.84),

  elevation: moderateScale(2),
};
