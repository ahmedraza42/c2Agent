import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AppStyles from '../theme/AppStyles';
import colors from '../theme/Colors';
import colorfontFamilys from '../theme/Colors';
import {fontFamily} from '../theme/Fonts';

const InputText = ({
  value,
  autoCapitalize,
  icon,
  onChangeText,
  placeholder,
  secureTextEntry,
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
  backgroundColor,
  placeholderTextColor,
  editable=true,
  onFocus,
  isUserName=false
}) => {
  const {textInput, errorStyle} = InputFieldStyles;

  return (
    <View style={{}}>
      <View style={{flexDirection:'row',alignItems:'center',  paddingHorizontal: moderateScale(10),backgroundColor:'white',borderRadius:moderateScale(14)}}>
       {icon?icon:null}
      
        <TextInput
          ref={rel}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          underlineColorAndroid={'transparent'}
          blurOnSubmit={true}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          style={newStyles ? {...newStyles,height:moderateScale(45)} : {...textInput,height:moderateScale(45)}}
          autoFocus={autoFocus}
          multiline={multiline}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          backgroundColor={backgroundColor}
          color="black"
          onFocus={onFocus}
        />
      </View>
    </View>
  );
};

const InputFieldStyles = {
  inputHeight: {
    height: moderateScale(45),
  },
  textInput: {
    backgroundColor: 'transparent',
    color: colors.input,
    fontFamily: fontFamily.Regular,
    fontSize: moderateScale(14),
    // paddingHorizontal: moderateScale(12),
    height: moderateScale(45),
  },
  errorStyle: {
    height: moderateScale(35),
    borderColor: 'red',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(2),
    color: '#000',
    paddingHorizontal: moderateScale(8),
  },
  requireField: {
    color: 'red',
  },
};

export default InputText;
