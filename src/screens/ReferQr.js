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
import Share from "react-native-share";
import { SvgUri } from 'react-native-svg';
const ReferQr = ({ navigation }) => {

  const [qr, setQr] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferal()
  }, []);

//   const getDataFromAsync=async()=>{
//     const res= await getItemFromStorage('qrcode')
//     console.log({res})
//     setQr(res)
//     setLoading(false)
//   }
  const getReferal = async () => {
    try {
      const response = await API_CALLS.referalMerchant();
      console.log("getProfile", response);
      if (response.status === true) {
        console.log("getProfile", response);
        setQr(response.data.qr_code)
        setData(response.data.dashboard)
      }
    } catch (error) {
      console.log("getProfile error", error);
    }
    finally{
        setLoading(false)
    }
  };
  const shareSS = async () => {
    try {
    
       
        const shareOption = {
          message: `Refer a fellow merchant and earn cash bonus when they place their first order`,
          url: qr,
        };
        const ShareResponse = await Share.open(shareOption);
    
    } catch (error) {
      console.log({ error });
     
    }
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
      <View style={{flex:1,padding:moderateScale(10)}}>
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
  <View style={{alignItems:'center',paddingHorizontal:moderateScale(15)}}>
  <View style={styles.top10}/>
<Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16)}}>Share QR Code</Text>
<Text style={{fontFamily:fontFamily.Medium,fontSize:moderateScale(14),textAlign:'center',marginTop:moderateScale(8)}}>Refer a fellow merchant and earn cash bonus when they place their first order</Text>
<View style={styles.top10}/>

        <TouchableOpacity onPress={()=>{shareSS()}} style={{width:'100%',alignSelf:"center",backgroundColor:'rgba(254, 225, 204, 1)',justifyContent:'center',alignItems:'center',height:moderateScale(50),borderRadius:moderateScale(12)}}>
<Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(13),color:colors.primary}}>SHARE</Text>
        </TouchableOpacity>
      </View>
      </View>
      
     <View style={{flexDirection:'row',marginTop:moderateScale(15),justifyContent:'space-between',alignItems:'center',padding:moderateScale(10),height:moderateScale(80),borderRadius:moderateScale(10),borderWidth:moderateScale(1),borderColor:colors.primary}}>

      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:colors.primary}}>{data[0].merchant[0].value}</Text>
        <Text style={{color:'rgba(21, 21, 21, 0.4)',fontSize:moderateScale(12),fontFamily:fontFamily.Medium}}>{data[0].merchant[0].key}</Text>
      </View>
      <View style={{height:moderateScale(30),width:moderateScale(2),backgroundColor:colors.primary}}/>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:colors.primary}}>{data[0].merchant[1].value.toString()}</Text>
        <Text style={{color:'rgba(21, 21, 21, 0.4)',fontSize:moderateScale(12),fontFamily:fontFamily.Medium}}>{data[0].merchant[1].key}</Text>
      </View>
     </View>

     <View style={{flexDirection:'row',marginTop:moderateScale(15),justifyContent:'space-between',alignItems:'center',padding:moderateScale(10),height:moderateScale(80),borderRadius:moderateScale(10),borderWidth:moderateScale(1),borderColor:colors.primary}}>

<View style={{justifyContent:'center',alignItems:'center'}}>
  <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:colors.primary}}>{data[1].supplier[0].value}</Text>
  <Text style={{color:'rgba(21, 21, 21, 0.4)',fontSize:moderateScale(12),fontFamily:fontFamily.Medium}}>{data[1].supplier[0].key}</Text>
</View>
<View style={{height:moderateScale(30),width:moderateScale(2),backgroundColor:colors.primary}}/>
<View style={{justifyContent:'center',alignItems:'center'}}>
  <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:colors.primary}}>{data[1].supplier[1].value.toString()}</Text>
  <Text style={{color:'rgba(21, 21, 21, 0.4)',fontSize:moderateScale(12),fontFamily:fontFamily.Medium}}>{data[1].supplier[1].key}</Text>
</View>
</View>
      </View>
    
    </View>
  );
};

export default ReferQr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: moderateScale(15),
  },
  innerContainer: {
    width: "100%",
    // height: moderateScale(300),
    borderRadius: moderateScale(8),
    padding: moderateScale(4),
    marginTop: moderateScale(10),
    backgroundColor: "white",
    // flexDirection: "row",
    paddingHorizontal: moderateScale(20),
    shadowColor: "rgba(0, 26, 77, 0.5)",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,

    justifyContent: "space-between",
    // alignItems: "center",
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
