import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import Header from "../components/Header";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import { useCurrentUser } from "../CustomHooks";
import API_CALLS from "../services/constants";
import AntDesign from "react-native-vector-icons/AntDesign";

import NormalHeader from "../components/NormalHeader";
import { MemoizedProducts } from "../components/MemoizedProducts";
import Button from "../components/Button";
import QuantityCounter from "../components/QuantityCounter";
import { useDispatch, useSelector } from "react-redux";
import { toggleProductToCart } from "../redux/actions/cart";
import { showToast } from "../components/Toast";
import ItemInCartRow from "../components/ItemInCartRow";
import FastImage from "react-native-fast-image";
import { toggleFavorite } from "../redux/actions/favourites";
import { isEmptyObject } from "../utils/functions";

const ProductDetail = ({ navigation, route }) => {
  const item = route?.params?.item || {};
  let mainflatListRef = useRef(null);
  const dispatch = useDispatch();
  const currentProductInCart = useSelector(
    (state) => state.cart.items[item.id]
  );
  const currentProductIsFavorite = useSelector((state) =>
  state.products.favoriteProducts.filter((product) => product.id === item.id),
);
console.log({currentProductIsFavorite})
  const cartItems = useSelector((state) => {
    let transformedCartItems = [];
    const items = state.cart.items;

    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: items[key].productId,
      });
    }
    return transformedCartItems;
  });
 
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleToggleFavorite = useCallback(
    (data,item) => dispatch(toggleFavorite(data,item)),
    [dispatch],
  );
  const msg = !isFavorite
  ? 'Successfully added to favorites'
  : 'Successfully remove from favorites';
  const command = !isFavorite? 'add' : 'remove';
  useEffect(() => {
    getPopularProducts();
  }, []);
  useEffect(() => {
    if(currentProductIsFavorite?.length>0){
      setIsFavorite(true)
    }
    else{
      setIsFavorite(false)
    }
    
  }, [currentProductIsFavorite && currentProductIsFavorite?.length]);
  const getPopularProducts = async () => {
    try {
      setLoading(true);
      const response = await API_CALLS.popularProducts(`?page_no=${1}`);
      if (response.status === true) {
        console.log({ response });
        setProduct(response.data || []);
      }
    } catch (error) {
      console.log("user profile error", error);
    }
    setLoading(false);
  };
  const toggleFavorites = async (item, msg, command) => {
    console.log({item})
    let text = msg;
    let fav = command === 'add' ? true : false;

    try {
   
        const data = {
          "product_id" : item.id,
    "is_favorite" : command === 'add' ? true : false
        };
        setIsFavorite(fav);
        await handleToggleFavorite(data,item);
      
    } catch (error) {
      setIsFavorite(false);
      text = error.response.data.message || 'Something went wrong';
    }

    showToast(text)
  };
  const toggleCartItems = async (value, item) => {
    if(value ==='minus'&& currentProductInCart?.qty==item.moq){
      showToast('You can not set quantity less then minimum order quantity, Please delete item from cart')
      return
    }
    if (item.quantity > 0) {
      console.log(item.quantity, currentProductInCart?.qty);
      // if(currentProductInCart?.qty>item.quantity){
      try {
        await dispatch(toggleProductToCart("", value, item));
      } catch (error) {
        console.log("toggleCartItems", error);
        showToast("Something went wrong");
      }
      // }
      // else{
      //   showToast('Product quantity limit exceeded ')
      // }
    } else {
      showToast("Product out of stock.");
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <MemoizedProducts
        onPress={() => {
          navigation.navigate("ProductDetail", { item: item });
        }}
        productName={item?.name}
        productImage={item?.image}
        quantity={item?.quantity}
        index={index}
        short_unit={item?.moq}
       price={item?.price}
       discountedPrice={item?.discountedPrice}
      />
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backArrow}
              resizeMode="contain"
              source={require("../assets/vectors/arrowBackBlack.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={()=>toggleFavorites(item, msg, command)}>
          <AntDesign
            name={isFavorite?"heart": "hearto"}
            size={moderateScale(25)}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView>
        <View style={styles.imageView}>
          {/* <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={{ width: "100%", height: moderateScale(240) }}
          /> */}
          <FastImage
            source={{ uri: item.image  , priority: FastImage.priority.high,}}
            style={{ width: "100%", height: moderateScale(240) }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.unit}>
              {"Incl. Vat"}
            </Text>
            <Text style={{...styles.unit,marginTop:moderateScale(4)}}>
              { "Min Order: "+item.moq || "MOQ Not Available"}
            </Text>
            <Text style={styles.details}>
              {item.description || "Description Not Available"}
            </Text>
           {item?.discountedPrice>0? <Text style={{...styles.price, textDecorationLine: "line-through",
    textDecorationStyle: "solid",}}>{item?.currency} {item.price || "0"}</Text>:
    <Text style={{...styles.price}}>{item?.currency} {item.price || "0"}</Text>}
           {item?.discountedPrice>0 && <Text style={styles.newPrice}>
            {item?.currency}  {item.discountedPrice || "0"}
            </Text>}
          </View>

          <View style={{ height: moderateScale(10) }} />
          {currentProductInCart ? (
            <QuantityCounter
              quantity={currentProductInCart ? currentProductInCart?.qty : 0}
              onAddCart={() => toggleCartItems("plus", item)}
              onRemoveCart={() => toggleCartItems("minus", item)}
            />
          ) : (
            <Button
              // loading={loading}
              text={"ADD TO CART"}
              onPress={() => {
                toggleCartItems("plus", item);
              }}
            />
          )}

          <View style={styles.line} />
          {loading?<ActivityIndicator size={'small'} color={colors.input}/>:<FlatList
            ref={mainflatListRef}
            data={product}
            horizontal
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            renderItem={(item, index) => renderItem(item, index)}
            ItemSeparatorComponent={() => {
              return <View style={{ height: moderateScale(5) }} />;
            }}
          />}
        </View>
        <View style={{ height: moderateScale(30), backgroundColor: "white" }} />
      </ScrollView>
      {cartItems?.length > 0 && (
        <ItemInCartRow cartItems={cartItems} navigation={navigation} />
      )}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: moderateScale(15),
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  header: {
    width: "100%",
    height: moderateScale(60),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
  },
  backArrow: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
  productName: {
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(22),
    marginVertical: moderateScale(5),
    // height:moderateScale(35),
    // width:moderateScale(150),
  },
  details: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(15),
    marginVertical: moderateScale(4),
    lineHeight: moderateScale(15),
    textAlign: "justify",
  },
  unit: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(15),
    // marginVertical: moderateScale(5),
    lineHeight: moderateScale(15),
    textAlign: "justify",
  },
  price: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(17),
    marginVertical: moderateScale(3),
    color: colors.lightText,
    textAlign: "center",
   
  },
  newPrice: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(17),
    color: colors.primary,
    textAlign: "center",
  },
  line: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: moderateScale(1),
    marginVertical: moderateScale(10),
  },
  imageView: {
    height: moderateScale(240),
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
