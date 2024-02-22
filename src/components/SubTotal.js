import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";
import { fontFamily } from "../theme/Fonts";
import { moderateScale } from "react-native-size-matters";
import colors from "../theme/Colors";

const SubTotal = ({cartAmount,netAmount}) => {
  let net =netAmount+3.00;
  return (
    <View style={styles.container}>
      <View style={styles.rowCenterBetween}>
        <Text style={styles.lightText}>Amount</Text>
        <Text style={styles.lightText}>AED {cartAmount}</Text>
      </View>
      <View style={styles.rowCenterBetween}>
        <Text style={styles.lightText}>Shipping Fee</Text>
        <Text style={styles.lightText}>AED 2.50</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.rowCenterBetween}>
        <Text style={styles.lightText}>Sub Total</Text>
        <Text style={styles.lightText}>{cartAmount+2.50}</Text>
      </View>
      <View style={styles.rowCenterBetween}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={styles.lightText}>VAT </Text>
        <Text style={{...styles.lightText,color:colors.primary}}>{'(5%)'}</Text>
      </View>
      <Text style={{...styles.lightText,color:colors.primary}}>AED 3.00</Text>
      
      </View>
      
      <View style={styles.line} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.semi}>Total</Text>
        <Text style={styles.semi}>AED {netAmount}</Text>
      </View>
    </View>
  );
};

export default SubTotal;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: moderateScale(1),
    marginVertical: moderateScale(10),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal:moderateScale(5)
  },
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:'white'
  },
  lightText: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
    color: "#151515",
  },
  semi: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(16),
  },
});
