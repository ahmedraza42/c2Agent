import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import { fontFamily } from "../theme/Fonts";
import { moderateScale } from "react-native-size-matters";
import API_CALLS from "../services/constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../components/Button";
import { getItemFromStorage } from "../utils/storage";
import { SvgUri } from 'react-native-svg';
const Qrcode = ({ navigation }) => {

  const [qr, setQr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromAsync()
  }, []);

  const getDataFromAsync=async()=>{
    const res= await getItemFromStorage('qrcode')
    console.log({res})
    setQr(res)
    setLoading(false)
  }
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
          <Text
            style={{
              marginLeft: moderateScale(15),
              fontFamily: fontFamily.Bold,
              fontSize: moderateScale(15),
              color: colors.white,
            }}
          >
            Share QR Code
          </Text>
        </View>
      </View>
    );
  };
 if(loading){
  return(
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator size={'small'} color={colors.input}/>

  </View>
 )}
  return (
    <View style={styles.container}>
      {renderHeader()}
      <View
        style={styles.innerContainer}
      >
        {/* <Image
          resizeMode="cover"
          source={{uri:qr}}
          style={{ width: moderateScale(350), height: moderateScale(250) }}
        /> */}
         <SvgUri
    width={moderateScale(320)}
    height={moderateScale(250)}
    uri={qr}
  />
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:moderateScale(15)}}>
<Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16)}}>Share QR Code</Text>
<Text style={{fontFamily:fontFamily.Medium,paddingHorizontal:moderateScale(40),fontSize:moderateScale(14),textAlign:'center',marginTop:moderateScale(8)}}>Share your referral QR code with the onboarding merchant</Text>
<View style={styles.top10}/>

          <Button
            // loading={}
            text={"RETURN HOME"}
            onPress={() => {
                navigation.goBack()
            }}
          />
      </View>
     
    </View>
  );
};

export default Qrcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: moderateScale(15),
  },
  innerContainer: {
    width: "100%",
    height: moderateScale(300),
    borderRadius: moderateScale(8),
    padding: moderateScale(4),
    marginTop: moderateScale(10),
    backgroundColor: "white",
    flexDirection: "row",
    paddingHorizontal: moderateScale(20),
    shadowColor: "rgba(0, 26, 77, 0.5)",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,

    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
  },
  header: {
    width: "100%",
    height: moderateScale(60),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.primary,
  },
  backArrow: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
  top10: {
    marginTop: moderateScale(10),
  },
});
