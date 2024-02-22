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


const ShippingAddress = ({ navigation, route }) => {
  const [listData, setListData] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Dubai",
      isSelected:true,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Sharjah",
      isSelected:false,
    },
  ]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
 
  return (
    <View style={styles.container}>
      <NormalHeader name={"My Shipping Address"} />

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
              renderItem={({item,index})=>{
                return(
                    <ShippingInfo item={item} onPress={()=>{
                      let copy=[...listData];
                      copy.map((i)=>i.isSelected=false)
                      copy[index].isSelected=true;
                      setListData(copy)
                    }} isSelected={item.isSelected}/>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => {
                return <Text style={styles.noData}>No Items in cart</Text>;
              }}
            />
             <View style={{ marginVertical: moderateScale(10) }}/>
          <Button
            // loading={loading}
            primary={true}
            text={"CREATE NEW"}
            onPress={() => {
              navigation.navigate('NewAddress')
            }}
          />
          </View>
         

        </ScrollView>
       
        </View>
      </View>
    
  );
};

export default ShippingAddress;

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
