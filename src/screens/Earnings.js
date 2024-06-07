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

const Earnings=({ navigation, route })=> {
    const [loading, setLoading] = useState(true);
    const [data, setData] = React.useState([]);
    const [checked, setChecked] = React.useState(null);
    const [commission, setCommission] = React.useState([]);
    useEffect(() => {
        callHomeApis();
      }, []);
    
      const callHomeApis = async () => {
        setLoading(true);
        //  await getPopularProducts()
        await getPayment();
        setLoading(false);
      };

      const getPayment = async () => {
        try {
          const response = await API_CALLS.earningDashboard();
          console.log("earningDashboard", response);
          if (response.status === true) {
            setData(response.data)
          }
        } catch (error) {
          console.log("getPaymentMethods error", error);
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
                Earnings
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
      <View style={{padding:moderateScale(10)}}>
      <Text style={styles.headingText}>Stats</Text>
      <View style={styles.rowCenterBetween}>
      {data[0]?.stats.map((item,index)=>{
        return(
            <View style={styles.firstBox}>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(10),color:'rgba(252, 103, 1, 1)'}}>{"Total"}</Text>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(13)}}>{item.value}</Text>
            <Text style={{fontFamily:fontFamily.Medium,fontSize:moderateScale(12)}}>{item.key}</Text>
            </View>
           
        )
      })}
      </View>
      <Text style={styles.headingText}>Merchants Onboarded</Text>
      <View style={styles.rowCenterBetween}>
      {data[0]?.merchant_onboarded.map((item,index)=>{
        return(
            <View style={styles.secondBox}>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:'rgba(252, 103, 1, 1)'}}>{item.value||"0"}</Text>
            <Text style={{fontFamily:fontFamily.Medium,fontSize:moderateScale(12),color:'rgba(1, 1, 1, 0.4)'}}>{item.key}</Text>
            </View>
            
           
        )
      })}
      </View>
      <Text style={styles.headingText}>Sales Commission Earned</Text>
      <View style={styles.rowCenterBetween}>
      {data[0]?.sales_commission_earned.map((item,index)=>{
        return(
            <View style={styles.secondBox}>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(15),color:'rgba(252, 103, 1, 1)'}}>{"AED"}</Text>
            <Text style={{fontFamily:fontFamily.Bold,fontSize:moderateScale(16),color:'rgba(252, 103, 1, 1)'}}>{item.value||"0"}</Text>
            <Text style={{fontFamily:fontFamily.Medium,fontSize:moderateScale(12),color:'rgba(1, 1, 1, 0.4)'}}>{item.key}</Text>
            </View>  
        )
      })}
      </View>
      </View>
    </View>
  )
}

export default Earnings

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
      headingText:{
        fontFamily:fontFamily.Bold,fontSize:moderateScale(15),marginVertical:moderateScale(8)
      },
      rowCenterBetween:{
        flexDirection:'row',justifyContent:'space-between',alignItems:'center'
      },
      firstBox:{
        justifyContent:'center',width:moderateScale(100),height:moderateScale(100),borderRadius:moderateScale(10),borderWidth:moderateScale(1),borderColor:'rgba(252, 103, 1, 1)',padding:moderateScale(8)
      },
      secondBox:{
        justifyContent:'center',alignItems:'center',width:moderateScale(100),height:moderateScale(100),borderRadius:moderateScale(10),borderWidth:moderateScale(1),borderColor:'rgba(252, 103, 1, 1)',padding:moderateScale(8)
      }

  });