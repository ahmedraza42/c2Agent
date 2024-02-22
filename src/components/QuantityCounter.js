import React from 'react';
import {View, StyleSheet, TouchableOpacity,Image} from 'react-native';

import {moderateScale} from 'react-native-size-matters';

import {AppStyles} from '../AppStyle';

import Feather from 'react-native-vector-icons/Feather';
import colors from '../theme/Colors';
import { fontFamily } from '../theme/Fonts';
import Text from './Text';

const QuantityCounter = ({onAddCart, onRemoveCart, quantity}) => {
  const Component = quantity <= 0 ? View : TouchableOpacity;

  return (
    <View style={styles.rootView}>
      <Component  onPress={onRemoveCart} style={styles.icon}>
        <Image resizeMode='contain' style={{width:moderateScale(25),height:moderateScale(25)}} source={require('../assets/vectors/delButton.png')}/>
      </Component>
      <View style={styles.counterView}>
      <Text style={{fontSize: moderateScale(18), fontFamily:fontFamily.SemiBold,color:colors.input}}>
        {quantity}
      </Text>
      </View>
      
      <TouchableOpacity onPress={onAddCart} style={styles.icon}>
        <Feather
          name="plus"
          size={moderateScale(25)}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    width: '50%',
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  icon: {
    width:moderateScale(40),height:moderateScale(40),borderRadius:moderateScale(20),backgroundColor:colors.primary,
  justifyContent:'center',
  alignItems:'center'
  },
  counterView:{
    width:moderateScale(50),height:moderateScale(50),borderRadius:moderateScale(10),backgroundColor:'rgba(237, 237, 237, 1)',justifyContent:'center',alignItems:'center'
  }
});
export default QuantityCounter;
