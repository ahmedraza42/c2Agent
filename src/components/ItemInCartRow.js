import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import colors from '../theme/Colors'
import Text from './Text'
import { fontFamily } from '../theme/Fonts'

const ItemInCartRow=({cartItems=[],navigation})=> {
  return (
    <View
    style={{
      width: "100%",
      paddingHorizontal: moderateScale(10),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: moderateScale(60),
      backgroundColor: colors.primary,
      borderTopLeftRadius: moderateScale(10),
      borderTopRightRadius: moderateScale(10),
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: fontFamily.SemiBold,
          fontSize: moderateScale(17),
          color: colors.white,
        }}
      >
        Items in cart
      </Text>
      <View
        style={{
          width: moderateScale(30),
          height: moderateScale(30),
          marginLeft: moderateScale(10),
          borderRadius: moderateScale(15),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.input,
            fontFamily: fontFamily.Bold,
            fontSize: moderateScale(15),
          }}
        >
          {cartItems?.length}
        </Text>
      </View>
    </View>

    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(5),
        borderRadius: moderateScale(10),
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.SemiBold,
          fontSize: moderateScale(15),
        }}
      >
        Checkout
      </Text>
    </TouchableOpacity>
  </View>
  )
}

export default ItemInCartRow