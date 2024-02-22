import React, { useCallback, useState } from "react";
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import Text from "./Text";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_FOR_IMAGES } from "../services/constants";
import colors from "../theme/Colors";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/actions/favourites";
import { isEmptyObject } from "../utils/functions";
import { showToast } from "./Toast";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from "react-native-fast-image";
// import { styles } from '../style/MenteeFindExpertScreenStyles';
const {width, height} = Dimensions.get('window');
export const Products = ({
  productName,
  productImage,
  quantity,
  index,
  onPress,
  price,
  discountedPrice,
  short_unit,
  loading=true
}) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const handleToggleFavorite = useCallback(
    (data) => dispatch(toggleFavorite(data)),
    [dispatch],
  );

  const toggleFavorites = async (item, msg, command) => {
    let text = msg;
    let normalize = {...item};
    let fav = command === 'add' ? true : false;

    if (normalize.empty) return;
    try {
      
        const data = {
          product_id: normalize.id,
          client_hash: (user && user.user_hash) || '',
          command,
        };
        setIsFavorite(fav);
        await handleToggleFavorite(data);
      
    } catch (error) {
      setIsFavorite(false);
      text = error.response.data.message || 'Something went wrong';
    }
showToast(text)
  };
  function onLoadStart(type) {
    setLoader(type);
  }


  return (
    <TouchableOpacity
      onPress={onPress}
      // navigation.navigate("DetailsScreen", { id: uniqueName });
      key={`item ${index}`}
    //   marginRight:index%2==0?moderateScale(2):0,marginLeft:index%2!=0?moderateScale(2):0
      style={{...styles.renderItemRootView,}}
    >
      <View style={{ width: moderateScale(160), height: moderateScale(246) }}>
        <View
          style={styles.imageView}
        >
          {/* <Image
            source={{ uri: productImage }}
            style={styles.imageStyle}
            resizeMode="contain"
          /> */}
          {loader && (
            <View style={{zIndex:0,marginTop:moderateScale(40)}}>
            <ActivityIndicator  size={'large'} color={colors.primary}/>
            </View>
         
        )}
          <FastImage
          onLoadEnd={()=>onLoadStart(false)}
          onLoadStart={()=>onLoadStart(true)}
            source={{ uri: productImage , priority: FastImage.priority.high,}}
            style={{ ...styles.imageStyle }}
            resizeMode={FastImage.resizeMode.contain}
          />
         
        </View>

        <View
          style={{
            paddingHorizontal: moderateScale(2),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={styles.productName}
            >
              {productName?.length > 15
                ? productName.slice(0, 15).toString() + ".. "
                : productName}
            </Text>
          </View>
          <View style={{ width: moderateScale(135) }}>
            <Text style={styles.shortDesc}>{"Incl. VAT"}</Text>
            <Text style={styles.shortDesc}>{"Min Order : "+short_unit||"--"}</Text>
          </View>

          <View
            style={styles.bottomRowView}
          >
            <View>
              {discountedPrice>0?<Text style={{...styles.shortDesc, textDecorationLine: "line-through",
           textDecorationStyle: "solid",}}>{price||"0"}</Text>:<Text style={{...styles.shortDesc,}}>AED {price||"0"}</Text>}
             {discountedPrice>0&& <Text style={styles.newPrice}>AED {discountedPrice||"0"}</Text>}
            </View>
            <View>
              <Image
              resizeMode="contain"
                style={{ width: moderateScale(35), height: moderateScale(35) }}
                source={require("../assets/vectors/addIcon.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const MemoizedProducts = React.memo(Products);
// export default BigProfile;

const styles = StyleSheet.create({

  renderItemRootView: {
    flex: 0.5,
    zIndex: -1,
    width: "99%",
    // margin: moderateScale(3),
    margin:moderateScale(3),
    borderRadius: moderateScale(8),
    padding: moderateScale(4),
    backgroundColor: "white",
    // shadowColor: "rgba(0, 26, 77, 0.5)",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    // elevation: 5,
    shadowColor: "rgba(0, 26, 77, 0.5)",
							shadowOpacity: 0.1,
							shadowOffset: {
							    width: 0,
							    height: 3
							},
							shadowRadius: 5,
							elevation: 8,
  },
  shortDesc: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(12),
    color: colors.lightText,
  },
  newPrice: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(12),
    color: colors.primary,
  },
  imageView:{
    width: "100%",
    height: moderateScale(145),
    alignItems: "center",
  },
  imageStyle:{
    backgroundColor: "white",
              width: "96%",
              height: "96%",
              marginTop: moderateScale(3),
  },
  productName:{
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(14),
    // height:moderateScale(35),
    width:moderateScale(150),
  },
  bottomRowView:{
    flexDirection: "row",
              justifyContent: "space-between",
              // alignItems: "center",
              width: "94%",
              marginTop: moderateScale(1),
  },
 
});
