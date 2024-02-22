import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
// import Text from './Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Text from './Text';
import {fontFamily} from '../theme/Fonts';
import colors from '../theme/Colors';
const DrawerMenuButton = ({
  highlight = false,
  onPress,
  keyy,
  source,
  count,
  countColor = '#000',
  iconRight,
  title,
  image,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnClickContain}>
    {image}
<Text style={{...styles.btnText, color: colors.black}}>{title}</Text>
    </TouchableOpacity>
   
 
  );
};

export default DrawerMenuButton;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(5),
    // backgroundColor: '#e8e8e8',
    // borderWidth: 1,
    // borderColor: '#ddd',
    // margin: verticalScale(3),s
  },
  btnClickContain: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  btnIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  btnText: {
    fontSize: moderateScale(14),
    // marginLeft: moderateScale(10),
    fontFamily: fontFamily.Medium,
    marginLeft:moderateScale(10)
  
  },

  highlightContainer: {
    // backgroundColor: AppStyles.color.secondary,
  },
  highlightText: {
    // color: AppStyles.color.white,
  },
});
