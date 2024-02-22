import React, { useCallback, useState } from "react";
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import Text from "./Text";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/Colors";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/actions/favourites";
import FastImage from "react-native-fast-image";
const WIDTH = Dimensions.get("window").width;
export const PastOrders = ({
  orderNo,
  date,
  Product = [],
  index,
  onPress,
  status,
}) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const handleToggleFavorite = useCallback(
    (data) => dispatch(toggleFavorite(data)),
    [dispatch]
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      key={`item ${index}`}
      style={{ ...styles.renderItemRootView }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.orderNo}>{orderNo || "--"}</Text>
        <Text style={styles.date}>{date || "--"}</Text>
        <View
          style={{
            ...styles.statusView,
            backgroundColor: status == "Confirmed" ? colors.primary : "#3EC664",
          }}
        >
          <Text style={styles.statusText}>{status || "--"}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {Product.map((item, index) => {
          if (index < 2)
            return (
              <View
                style={{
                  ...styles.productImage,
                  backgroundColor: index < 2 ? "transparent" : colors.ligthView,
                  borderWidth: index < 2 ? moderateScale(0.6) : 0,
                }}
              >
                {/* <Image
                  resizeMode="contain"
                  key={`item ${index}`}
                  style={styles.image}
                  source={{ uri: item?.productImage || "https://" }}
                /> */}
                <FastImage
            source={{ uri: item?.productImage || "https://" , priority: FastImage.priority.high,}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
              </View>
            );
        })}
        <View style={styles.productCountView}>
          {<Text style={styles.productCount}>{`+${Product.length - 2}`}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const MemoizedPastOrder = React.memo(PastOrders);
// export default BigProfile;

const styles = StyleSheet.create({
  renderItemRootView: {
    flexDirection: "row",
    width: "99%",
    alignItems: "center",
    margin: moderateScale(3),
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
    backgroundColor: "white",
    shadowColor: "rgba(0, 26, 77, 0.5)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginTop: moderateScale(5),
    elevation: 5,
  },
  orderNo: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(16),
  },
  date: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(11),
    color: colors.lightText,
  },
  statusView: {
    width: moderateScale(100),
    height: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(8),
    marginTop: moderateScale(5),
  },
  statusText: {
    color: colors.white,
    fontFamily: fontFamily.SemiBold,
  },
  productImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(3),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightText,
    marginRight: moderateScale(5),
  },
  image: {
    width: moderateScale(45),
    height: moderateScale(45),
  },
  productCountView: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(3),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightText,
    marginRight: moderateScale(5),
    backgroundColor: colors.ligthView,
  },
  productCount: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(15),
  },
});
