import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../theme/Colors";
import { moderateScale } from "react-native-size-matters";
import AppStyles from "../theme/AppStyles";
import { fontFamily } from "../theme/Fonts";

const Button = ({
  loading = false,
  text,
  onPress,
  mystyle,
  textStyle,
  buttonColor = colors.black,
  trans=false,
  primary=false
}) => {
  if(primary==false){
    return (
      <TouchableOpacity style={{...styles.btnContainerStyle,backgroundColor:trans?"transparent":colors.primary,...mystyle}} onPress={onPress}>
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text style={{...styles.btnTextStyle,color:trans?colors.input:colors.white}}> {text} </Text>
        )}
      </TouchableOpacity>
    );
  }
  else{
    return (
      <TouchableOpacity style={{...styles.btnContainerStyle,backgroundColor:colors.lightPrimary,...mystyle}} onPress={onPress}>
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text style={{...styles.btnTextStyle,color:colors.primary}}> {text} </Text>
        )}
      </TouchableOpacity>
    );
  }

};

const styles = StyleSheet.create({
  btnContainerStyle: {
    height: moderateScale(50),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: moderateScale(12),
    borderColor:colors.input
  },
  btnTextStyle: {
    color: colors.white,
    fontSize: moderateScale(14),
    // textTransform: 'uppercase',
    textAlign: "center",
    fontFamily: fontFamily.Bold,
    marginBottom:moderateScale(2)
  },
});

export default Button;
