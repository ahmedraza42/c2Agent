import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {fontFamily} from '../theme/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../theme/Colors';
import {moderateScale} from 'react-native-size-matters';
import AppStyles from '../theme/AppStyles';

const PasswordInput = ({
  value,
  autoCapitalize,
  changeText,
  placeholder,
  error,
  errorStyles,
  onSubmitEditing,
  rel,
  returnKeyType,
  keyboardType,
  newStyles,
  autoFocus,
  multiline,
  maxLength,
  onBlur,
  placeholderTextColor='rgba(22, 21, 24, 0.4)',
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-with-line');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye-with-line') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye') {
      setRightIcon('eye-with-line');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return (
    <View style={{flexDirection:'row',alignItems:'center',  paddingHorizontal: moderateScale(10),backgroundColor:'rgba(237, 237, 237, 1)',borderRadius:moderateScale(8)}}>
    
      <TextInput
        style={styles.input}
        ref={rel}
        autoComplete='off'
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onBlur={onBlur}
        onChangeText={changeText}
        underlineColorAndroid={'transparent'}
        blurOn
        tiline={multiline}
        maxLength={maxLength}
        secureTextEntry={passwordVisibility}
        placeholderTextColor={placeholderTextColor}
      />

      <View style={{width:moderateScale(46),height:moderateScale(46),alignItems:'center',justifyContent:'center',borderRadius:moderateScale(10),backgroundColor:'transparent'}}>
        <TouchableOpacity onPress={() => handlePasswordVisibility()}>
          <Entypo
            style={styles.searchIcon}
            name={rightIcon}
            size={moderateScale(20)}
            color="rgba(193, 206, 204, 1)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    paddingRight: moderateScale(5),
    borderColor: '#7070703D',
  },
  searchIcon: {
    padding: moderateScale(10),
  },
  input: {
    flex: 1,
    paddingRight: moderateScale(10),
    fontSize: moderateScale(12),
    color:colors.input,
    fontFamily: fontFamily.Medium,
    borderTopLeftRadius: moderateScale(6),
    borderBottomLeftRadius: moderateScale(6),
    height:moderateScale(54)
  },
});

export default PasswordInput;
