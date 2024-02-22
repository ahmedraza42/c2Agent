import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { fontFamily } from '../theme/Fonts'
import colors from '../theme/Colors'
import Text from './Text'

function ShippingInfo({onPress,isSelected,item}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.paymentView}>
    <Image
      style={styles.selectedPayment}
      source={isSelected?require("../assets/vectors/selectedCard.png"):require("../assets/vectors/unSelectedCard.png")}
    />
    <View style={styles.innerView}>
      <Image
        style={styles.mapMarkerImage}
        resizeMode="contain"
        source={require("../assets/vectors/mapmarker.png")}
      />
      <View style={{ marginLeft: moderateScale(10) }}>
      <Text style={{fontFamily:fontFamily.SemiBold,fontSize:moderateScale(14)}}>{item?.title}</Text>

        <Text style={styles.tapToChange}>Tap to change</Text>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default ShippingInfo

const styles = StyleSheet.create({
   
  paymentView: {
    backgroundColor: "white",
    shadowColor: "rgba(0, 26, 77, 0.5)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(10),
  },
  selectedPayment: {
    width: moderateScale(30),
    height: moderateScale(30),
    position: "absolute",
    top: 0,
    right: 0,
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(10),
  },
  mapMarkerImage: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  tapToChange: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(14),
    color: colors.primary,
  },
  });