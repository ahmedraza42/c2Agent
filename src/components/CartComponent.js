import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Text from "./Text";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import colors from "../theme/Colors";
import FastImage from "react-native-fast-image";
const CartComponent = ({
  item,
  index,
  onClick,
  prevOpenedRow,
  row,
  enabled = true,
}) => {
  const closeRow = (index) => {
    console.log("closerow");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity
        onPress={onClick}
        style={styles.delView}
      >
        <Image
          source={require("../assets/vectors/delButton.png")}
          resizeMode="contain"
          style={{ width: moderateScale(25), height: moderateScale(25) }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      enabled={enabled}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, onClick)
      }
      onSwipeableOpen={() => closeRow(index)}
      ref={(ref) => (row[index] = ref)}
      rightOpenValue={-70}
    >
      <View style={styles.swiapableRootView}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.imageView}>
            {/* <Image
              style={styles.image}
              resizeMode="contain"
              source={{
                uri: item.image || "https://",
              }}
            /> */}
             <FastImage
            source={{ uri: item.image || "https://" , priority: FastImage.priority.high,}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
          </View>
          <View style={{ marginLeft: moderateScale(8) }}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.rowCenterBetween}>
              <Text style={styles.quantity}>{"400g"}</Text>
            </View>

            <Text style={styles.price}>{"AED " + item?.price?.toFixed(2)}</Text>
          </View>
        </View>

        <View
          style={styles.qtyView}
        >
          <Text style={{ fontFamily: fontFamily.SemiBold }}>{item?.qty}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export const MemoizedCart = React.memo(CartComponent);

const styles = StyleSheet.create({
  swiapableRootView: {
    flexDirection: "row",
    padding: moderateScale(7),
    backgroundColor: "white",
    shadowColor: "rgba(0, 26, 77, 0.5)",
    justifyContent: "space-between",
    // alignItems:'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(10),
  },
  imageView: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(3),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: moderateScale(0.6),
    borderColor: colors.lightText,
    marginTop: moderateScale(4),
  },
  image: {
    width: moderateScale(45),
    height: moderateScale(45),
  },
  title: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(14),
    width: moderateScale(210),
  },
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantity: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(12),
    color: colors.lightText,
  },
  price: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(12),
    color: colors.primary,
    marginTop: moderateScale(2),
  },
  qtyView:{
    width: moderateScale(25),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
    height: moderateScale(25),
    backgroundColor: "rgba(237, 237, 237, 1)",
  },
  delView:{
    width: moderateScale(30),
    marginVertical: moderateScale(5),
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
  }
});
