import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../theme/Colors";
import { fontFamily } from "../theme/Fonts";
import Text from "./Text";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Reminder = ({
  title,
  subtitle,
  date,
  amount,
  keyItem,
  isExpanded = false,
  onPress,
}) => {
  return (
    <View key={keyItem} style={styles.rootView}>
      <View style={{ flexDirection: "row",alignItems:'center'}}>
        <View style={{ flex: 0.24 }}>
          <Image
            style={styles.image}
            source={require("../assets/vectors/chicken.png")}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: moderateScale(2)}}>
          <Text style={styles.title}>{title || ""}</Text>
         {!isExpanded && <Text style={{ ...styles.subtitle,marginTop:0}}>{date || ""}</Text>}
        </View>

        <TouchableOpacity style={{padding:moderateScale(3)}} onPress={onPress}>
            <MaterialIcons
              name={isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-right"}
              size={moderateScale(25)}
              style={{ marginTop: moderateScale(5) }}
              color="#222838"
            />
          </TouchableOpacity>
      </View>
      {isExpanded && (
        <View style={{}}>
        <Text
          style={{
            ...styles.subtitle,
            marginLeft: moderateScale(3),
            fontSize: moderateScale(13),
            marginTop:moderateScale(6),
          }}
        >
          {subtitle || ""}
        </Text>
        <Text style={{ ...styles.subtitle ,alignSelf:'flex-end'}}>{date || ""}</Text>
        </View>
        
      )}
    </View>
  );
};

// export default Transaction
export const MemoizedReminder = React.memo(Reminder);

const styles = StyleSheet.create({
  rootView: {
    paddingHorizontal: moderateScale(10),
    paddingVertical:moderateScale(6),
    borderRadius: moderateScale(15),
    backgroundColor: colors.white,
    marginTop: moderateScale(10),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    marginTop:moderateScale(3)
  },
  title: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(13),
  },
  subtitle: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
  
  },
});
