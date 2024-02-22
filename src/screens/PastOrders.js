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
import Button from "../components/Button";
import ShippingInfo from "../components/ShippingInfo";
import { MemoizedProducts } from "../components/MemoizedProducts";
import { MemoizedPastOrder } from "../components/MemoizedPastOrder";
let data =[
    {
      id:0,
      orderNo:'ORD-00213515',
      date:'12:41 - 22/Mar/2023',
      status:'Confirmed',
      product:[
        {
          id:0,
          productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png'  },
        {
          id:1,
          productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png',
        },
        {
          id:2,
          productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png',
        },
      ]
      },
        {
          id:1,
          orderNo:'ORD-00213587',
          date:'10:41 - 23/Mar/2023',
          status:'Delivered',
          product:[
            {
              id:0,
              productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png'  },
            {
              id:1,
              productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png',
            },
            {
              id:2,
              productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png',
            },
            {
              id:3,
              productImage:'https://purepng.com/public/uploads/large/purepng.com-coca-cola-soda-canobjectscoca-cola-soda-canfood-soda-object-can-drink-beverage-coke-631522325785nut7k.png',
            },
          ]
          },
  ]

const PastOrders = ({ navigation, route }) => {
  const [listData, setListData] = useState(data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
  const renderItem = ({ item, index }) => {
    console.log({item})
    return (
      <MemoizedPastOrder
      onPress={()=>{navigation.navigate("OrderStatus", { item: item })}}
        orderNo={item.orderNo}
        date={item.date}
        status={item.status}
        index={index}
        Product={item?.product}
        />
    );
  };
  return (
    <View style={styles.container}>
      <NormalHeader name={"Past Orders"} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(10),
          backgroundColor: "white",
        }}
      >
        <ScrollView>
          <View style={{ flex: 1,marginTop:moderateScale(10) }}>
           
            <FlatList
              data={listData}
              bounces={false}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={7}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            renderItem={(item, index) => renderItem(item, index)}
              ListEmptyComponent={() => {
                return <Text style={styles.noData}>No Items in cart</Text>;
              }}
            />
             <View style={{ marginVertical: moderateScale(10) }}/>
         
          </View>
         

        </ScrollView>
       
        </View>
      </View>
    
  );
};

export default PastOrders;

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
  line: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: moderateScale(1),
    marginVertical: moderateScale(20),
  },
});
