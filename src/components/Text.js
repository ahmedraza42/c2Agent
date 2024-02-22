import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

import {fontFamily} from '../theme/Fonts';
import colors from '../theme/Colors';

const Text = ({text, children, style, variant,selectable=false}) => {
  let content = children || text;

  let textStyle = {};
  switch (variant) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
    case 'semi_bold':
      textStyle = styles.semi_bold;
      break;
    default:
      textStyle = styles.regular;
      break;
  }
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <RNText selectable={selectable} numberOfLines={50} style={{...textStyle, ...passedStyles}}>
      {content}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  regular: {
    fontFamily: fontFamily.Regular,
    color: colors.input,
  },
  bold: {
    fontFamily: fontFamily.Bold,
    color: colors.input,
  },
  semi_bold: {
    fontFamily: fontFamily.SemiBold,
    color: colors.input,
  },
});
