import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet ,TouchableOpacity,View} from 'react-native';
import { fontFamily } from '../theme/Fonts';
import { moderateScale } from 'react-native-size-matters';
import colors from '../theme/Colors';
import Text from '../components/Text';
import API_CALLS from '../services/constants';
import { RadioButton } from 'react-native-paper';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { showToast } from '../components/Toast';

const Commission=({ navigation, route })=> {
    const [loading, setLoading] = useState(true);
    const [payments, setPayment] = React.useState([]);
    const [checked, setChecked] = React.useState(null);
    const [commission, setCommission] = React.useState([]);
    useEffect(() => {
        callHomeApis();
      }, []);
    
      const callHomeApis = async () => {
        setLoading(true);
        //  await getPopularProducts()
        await getPayment();
        await getcommissionStructure()
        setLoading(false);
      };

      const getPayment = async () => {
        try {
          const response = await API_CALLS.getPaymentMethods();
          console.log("getPaymentMethods", response);
          if (response.status === true) {
           setPayment(response.data)
          }
        } catch (error) {
          console.log("getPaymentMethods error", error);
        }
      };
      const getcommissionStructure= async () => {
        try {
          const response = await API_CALLS.commissionStructure();
          console.log("commissionStructure", response);
          if (response.status === true) {
            setCommission(response.data)
          }
        } catch (error) {
          console.log("commissionStructure error", error);
        }
      };

      const navigateToNextPage=()=>{
        console.log("fdfds")
        if(checked==null){
         showToast("Please select payment method")
         return
        }
        navigation.navigate('Commission2',{item:checked})
        
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
                Commission
              </Text>
            </View>
          </View>
        );
      };
      if (loading) {
        return <Loader />;
      }
  return (
    <View style={styles.container}>
    {renderHeader()}
      {/* <View style={styles.iconView}>
        <Image
          source={require("../assets/icons/round.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View> */}
     <Text style={{textAlign:'center',marginVertical:moderateScale(8),fontFamily:fontFamily.Bold,fontSize:moderateScale(20)}}>SALES COMMISSION</Text>
     <Text style={{textAlign:'center',marginBottom:moderateScale(10),fontFamily:fontFamily.Medium,fontSize:moderateScale(14)}}>How will you like to receive your sales commission</Text>
<ScrollView>
<View style={{paddingHorizontal:moderateScale(10)}}>
{payments.map((item, index) => {
            
            return (
            <View  key={`item ${index + 1}`} style={styles.ViewFour}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={styles.paymentIcon}
                  resizeMode="contain"
                  source={{ uri: item?.imagePath }}
                />
                <Text style={styles.paymentText}>{item?.name}</Text>
              </View>

              <RadioButton.Android
                color={colors.primary}
                uncheckedColor={colors.primary}
                value="first"
                status={
                  checked === item?.id ? "checked" : "unchecked"
                }
                onPress={() => {
                  setChecked(item?.id);
                }}
              />
            </View>
          );
          
        
        })}

        <View>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(20),marginTop:moderateScale(8)}}>Commission Structure</Text>
            <Text style={{fontFamily:fontFamily.Medium,fontSize:moderateScale(14),color:'rgba(1, 1, 1, 0.4)'}}>30 Days Rolling</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:moderateScale(8)}}>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(14)}}>Merchant Onboarded</Text>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(14)}}>Per Onboarding</Text>
            </View>
            {commission.map((item, index) => {
            
            return (
                <View key={`index ${index + 1}`} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'rgba(245, 242, 235, 0.5)',marginVertical:moderateScale(5),padding:moderateScale(7),borderRadius:moderateScale(10)}}>
            <Text style={{fontFamily:fontFamily.Medium,fontSize:moderateScale(14)}}>{item.onboarding_target}</Text>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(14),color:'#FC6701'}}>{item.commission}</Text>
            </View>
          );
          
        
        })}
            
        </View>

        <Text style={{textAlign:'center',marginVertical:moderateScale(10),fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:'rgba(28, 27, 31, 1)'}}>Note</Text>
     <Text style={{textAlign:'center',marginBottom:moderateScale(10),fontFamily:fontFamily.Medium,fontSize:moderateScale(12)}}>Sales commission is paid for onboarding merchants only. Incomplete merchant onboardings are not counted towards sales commission calculations.</Text>

     <Button
            // loading={loading}
            text={"NEXT"}
            onPress={() => {
           navigateToNextPage()
            }}
          />
          <View style={{height:moderateScale(20)}}/>
</View>
</ScrollView>

    
    </View>
  )
}

export default Commission

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal: moderateScale(15),
      backgroundColor: colors.white,
    },
    container2: {
      flex: 1,
      padding: moderateScale(15),
      backgroundColor: colors.white,
    },
    iconView: {
        height:moderateScale(130),
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      },
      icon: {
        width: moderateScale(130),
        height: moderateScale(110),
      },
      ViewFour: {
        width: "99%",
      backgroundColor: "white",
      shadowColor: "rgba(0, 26, 77, 0.7)",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
      marginVertical: moderateScale(8),
      borderRadius: moderateScale(12),
      padding:moderateScale(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      paymentIcon:{
        width:moderateScale(25) ,height:moderateScale(25),marginHorizontal:moderateScale(10)
      },
      paymentText: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.Bold,
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

  });