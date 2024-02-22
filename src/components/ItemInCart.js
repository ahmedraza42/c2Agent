import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import Text from './Text'
import { fontFamily } from '../theme/Fonts'

export default function ItemInCart({name=''}) {
  return (
    <Text style={{marginVertical:moderateScale(5),marginLeft:moderateScale(5),fontFamily:fontFamily.Bold,fontSize:moderateScale(16)}}>{name}</Text>
  )
}
