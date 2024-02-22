import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Text from "./Text";
import { fontFamily } from "../theme/Fonts";
import { useNavigation } from "@react-navigation/native";

const Box = ({
  onPress1,
  onPress2,
  color1,
  color2,
  image1,
  image2,
  title1,
  title2,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.rootView}>
      <View style={styles.rowCenterBetween}>
        <TouchableOpacity
          onPress={onPress1}
          style={{
            ...styles.press1,
            backgroundColor: color1,
          }}
        >
          <Image
            source={image1}
            style={{ width: moderateScale(46), height: moderateScale(46) }}
          />
          <Text style={styles.title}>{title1}</Text>
        </TouchableOpacity>
        <View style={{ width: "8%" }} />
        <TouchableOpacity
          onPress={onPress2}
          style={{
            ...styles.press1,
            backgroundColor: color2,
          }}
        >
          <Image
            source={image2}
            style={{ width: moderateScale(46), height: moderateScale(46) }}
          />
          <Text style={styles.title}>{title2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Box;
const styles = StyleSheet.create({
  rootView: {
    height: moderateScale(125),
    paddingHorizontal: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenterBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  press1: {
    width: "47%",
    height: moderateScale(110),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
  },
});
