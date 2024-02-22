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
import { MemoizedPayment } from "../components/Payment";
import ShippingInfo from "../components/ShippingInfo";
import Input from "../components/Input";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    isSelected:true,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    isSelected:false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    isSelected:false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Fourth Item",
    isSelected:false,
  },
];

const NewAddress = ({ navigation, route }) => {
  const [listData, setListData] = useState(DATA);
  let row = [];
  let prevOpenedRow;
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
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
    console.log(item, index);
    let a = listData;
    a.splice(index, 1);
    console.log(a);
    setListData([...a]);
  };
  return (
    <View style={styles.container}>
      <NormalHeader name={"New Shipping Address"} />

      <View
        style={styles.rootView}
      >
           <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
        >
        <View style={styles.top10}/>
        <Text style={styles.emailPassword}>Address</Text>
        <Input
            placeholder={"Type Here"}
            value={''}
            onChangeText={()=>{}}
          />
           <Text style={styles.emailPassword}>Street</Text>
           <Input
            placeholder={"Type Here"}
            value={''}
            onChangeText={()=>{}}
          />
         
         <View style={styles.cityCountryRowView}>
          <View style={{flex:1}}>
          <Text style={styles.emailPassword}>Country</Text>
          <Input
            placeholder={"Type Here"}
            value={''}
            onChangeText={()=>{}}
          />
          </View>
          <View style={{width:moderateScale(15)}}/>
          <View style={{flex:1}}>
          <Text style={styles.emailPassword}>City</Text>
          <Input
            placeholder={"Type Here"}
            value={''}
            onChangeText={()=>{}}
          />
          </View>
         </View>

         <Text style={styles.emailPassword}>Delivery Note</Text>
          <Input
            placeholder={"Type Here"}
            value={''}
            onChangeText={()=>{}}
          />
         <View style={styles.top10}/>
          <Button
            // loading={}
            text={"SAVE"}
            onPress={() => {
                navigation.goBack()
            }}
          />
          <View style={styles.top10}/>
        </ScrollView>
       
        </View>
      </View>
    
  );
};

export default NewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rootView:{
    flex: 1,
    paddingHorizontal: moderateScale(10),
    backgroundColor: "white",
    marginTop:moderateScale(10)
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
  top10: {
    marginTop: moderateScale(10),
  },
  cityCountryRowView:{
    flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:moderateScale(5)
  },
  emailPassword: {
    fontFamily: fontFamily.SemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
    marginBottom: moderateScale(4),
    marginLeft: moderateScale(4),
  },
});
