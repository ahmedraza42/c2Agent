import React from 'react';
import {View, TextInput, Text, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AppStyles from '../theme/AppStyles';
import colors from '../theme/Colors';
import colorfontFamilys from '../theme/Colors';
import {fontFamily} from '../theme/Fonts';

const SearchInput = ({
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
  onFocus,
  multiline,
  maxLength,
  backgroundColor,
  placeholderTextColor=colors.input,
  editable=true,
}) => {
  const {textInput, errorStyle} = InputFieldStyles;

  return (
    <View style={{}}>
      <View style={{backgroundColor:'white',borderRadius:moderateScale(10),paddingLeft:moderateScale(6),flexDirection:'row',alignItems:'center'}}>
        <View style={{width:'88%'}}>
        <TextInput
          ref={rel}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          onFocus={onFocus}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          underlineColorAndroid={'transparent'}
          blurOnSubmit={true}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          style={newStyles ? newStyles : textInput}
          autoFocus={false}
          multiline={multiline}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          backgroundColor={backgroundColor}
          color="black"
        />
        </View>
        
         <Image source={require('../assets/vectors/search.png')} style={{width:moderateScale(24),height:moderateScale(24)}}/>
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
    height: moderateScale(54),
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

export default SearchInput;
