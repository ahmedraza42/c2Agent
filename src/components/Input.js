import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AppStyles from '../theme/AppStyles';
import colors from '../theme/Colors';
import colorfontFamilys from '../theme/Colors';
import {fontFamily} from '../theme/Fonts';

const Input = ({
  value,
  autoCapitalize,
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
  placeholderTextColor='rgba(22, 21, 24, 0.4)',
  editable=true,
}) => {
  const {textInput, errorStyle} = InputFieldStyles;

  return (
    <View style={{}}>
      <View style={{backgroundColor:'rgba(237, 237, 237, 1)',borderRadius:moderateScale(8),paddingLeft:moderateScale(6)}}>
        <TextInput
          ref={rel}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          // selection={{start:0, end:0}}
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          underlineColorAndroid={'transparent'}
          blurOnSubmit={true}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          style={newStyles ? newStyles : textInput}
          autoFocus={autoFocus}
          multiline={multiline}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          backgroundColor={backgroundColor}
          color="black"
        />
      </View>
    </View>
  );
};

const InputFieldStyles = {
  inputHeight: {
    height: moderateScale(54),
  },
  textInput: {
    backgroundColor: 'transparent',
    color: colors.input,
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
    // paddingHorizontal: moderateScale(12),
    height: moderateScale(50),
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

export default Input;
