import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import Text from './Text';
import {fontFamily} from '../theme/Fonts';
import colors from '../theme/Colors';

const Retry = ({isLoading, onPress, error}) => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          marginTop: moderateScale(10),
          fontFamily: fontFamily.Medium,
          fontSize: moderateScale(15),
          color: colors.text,
        }}>
        Something went wrong , please retry
      </Text>
      <TouchableOpacity
        disabled={isLoading}
        onPress={onPress}
        style={styles.buttonStyle}>
        <Text style={{color: 'white', fontFamily: fontFamily.Regular}}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Retry;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    width: moderateScale(80),
    marginTop: moderateScale(10),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
