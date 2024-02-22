import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import colors from "../theme/Colors";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import NormalHeader from "../components/NormalHeader";
import Text from "../components/Text";
import { MemoizedCart } from "../components/CartComponent";
import SubTotal from "../components/SubTotal";
import Button from "../components/Button";
import ItemInCart from "../components/ItemInCart";
import { useDispatch, useSelector } from "react-redux";
import { toggleProductToCart } from "../redux/actions/cart";


const Cart = ({ navigation, route }) => {
  let row = [];
  let prevOpenedRow;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const cartNetAmount = useSelector((state) => {
    let totalAmount = state?.cart?.netAmount;
    return parseFloat(totalAmount).toFixed(2);
  });

  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    let transformedCartItems = [];
    const items = state.cart.items;

    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: items[key].productId,
        category_name: items[key].category_name,
        description: items[key].description,
        discountedPrice: items[key].discountedPrice,
        image: items[key].image,
        qty:items[key].qty,
        name: items[key].name,
        price: items[key].price,
        product_category_id: items[key].product_category_id,
        quantity: items[key].quantity,
        short_unit: items[key].short_unit,
      });
    }
    return transformedCartItems;
  });
  useEffect(() => {}, []);

  const toggleCartItems = async (value, item) => {
    console.log('value',value,'item',item)
    // const data = {
    //   product_id: item.id || item.productId,
    //   command: value,
    // };

    // setError(null);
    try {
      await dispatch(toggleProductToCart('', value, item));
    } catch (error) {
      console.log('toggleCartItems',error)
      showToast('Something went wrong')
    }
  };
  const renderItem = ({ item, index }, onClick) => {
    return (
      <MemoizedCart
        item={item}
        index={index}
        onClick={onClick}
        row={row}
        prevOpenedRow={prevOpenedRow}
      />
    );
  };
  const deleteItem = ({ item, index }) => {
    toggleCartItems('remove',item)
  };
  return (
    <View style={styles.container}>
      <NormalHeader name={"Cart"} />
      <View style={{flex:1,paddingHorizontal:moderateScale(15),backgroundColor:'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
      <View style={{flex:1 }}>
      {cartItems.length>0&&  <ItemInCart name="Items in cart"/>}
        <FlatList
          data={cartItems}
          renderItem={(v) =>
            renderItem(v, () => {
              console.log("Pressed", v);
              deleteItem(v);
            })
          }
          keyExtractor={(item) => item.id}
          ListEmptyComponent={()=>{
            return(
              <Text style={styles.noData}>No Items in cart</Text>
            )
          }}
        />
        {cartItems.length>0&& <>
      <View style={styles.line}/>
      <SubTotal cartAmount={cartAmount} netAmount={cartNetAmount}/>
      <View style={{marginVertical:moderateScale(5)}}>
      <Button
          // loading={loading}
          text={"PROCEED TO CHECKOUT"}
          onPress={() => {
            navigation.navigate('OrderOverview')
          }}
        />
      </View>
     
      <View style={{height:moderateScale(15)}}/>
      </>}
      </View>
      </ScrollView>
     
     
       
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  noData: {
    textAlign: "center",
    marginTop: moderateScale(15),
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
  },
  line:{
    width:'100%',backgroundColor:'rgba(0, 0, 0, 0.2)',height:moderateScale(1),marginVertical:moderateScale(10)
  }
});
