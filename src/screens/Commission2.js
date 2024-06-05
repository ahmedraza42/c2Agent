import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet ,View} from 'react-native';
import { fontFamily } from '../theme/Fonts';
import { moderateScale } from 'react-native-size-matters';
import colors from '../theme/Colors';
import Text from '../components/Text';
import API_CALLS from '../services/constants';
import { RadioButton } from 'react-native-paper';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { showToast } from '../components/Toast';
import Input from '../components/Input';
import { ModalContext } from '../context/ModalContext';

const Commission2=({ navigation, route })=> {
    let id = route.params.item||null
    const [loading, setLoading] = useState(true);
    const [payments, setPayment] = React.useState([]);
    const [checked, setChecked] = React.useState(id);
    const [commission, setCommission] = React.useState([]);
    const [acountname, setAcountNumber] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [bankName, setBankName] = React.useState('');
    const [iban, setiban] = React.useState('');
    const [pop, setModal] = useContext(ModalContext);
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
        navigation.navigate("Homes")
        setModal((state) => ({
            ...state,
            heading: "Commission Setup Complete",
            subHeading: "Your account setup is now complete",
            visible: true,
            // gotoHome: true,
          }));
        
      }
      console.log({commission})
      if (loading) {
        return <Loader />;
      }
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          source={require("../assets/icons/round.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
     <Text style={{textAlign:'center',marginVertical:moderateScale(10),fontFamily:fontFamily.Bold,fontSize:moderateScale(22)}}>SALES COMMISSION</Text>
     <Text style={{textAlign:'center',marginBottom:moderateScale(10),fontFamily:fontFamily.Medium,fontSize:moderateScale(16)}}>How will you like to receive your sales commission</Text>
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

       
        <View style={styles.top10}>
            <Text style={styles.emailPassword}>Account Name</Text>
            <Input
              placeholder="Type here"
              value={''}
              changeText={(text) => {}}
            />
          </View>
          <View style={styles.top10}>
            <Text style={styles.emailPassword}>Account Number</Text>
            <Input
              placeholder="Type here"
              value={''}
              changeText={(text) => {}}
            />
          </View>
          <View style={styles.top10}>
            <Text style={styles.emailPassword}>Bank Name</Text>
            <Input
              placeholder="Type here"
              value={''}
              changeText={(text) => {}}
            />
          </View>
          <View style={styles.top10}>
            <Text style={styles.emailPassword}>IBAN</Text>
            <Input
              placeholder="*********"
              value={''}
              changeText={(text) => {}}
            />
          </View>
          <View style={styles.top10}/>
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

export default Commission2

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
      marginVertical: moderateScale(10),
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
      top10: {
        marginTop: moderateScale(10),
      },
      emailPassword: {
        fontFamily: fontFamily.SemiBold,
        color: colors.black,
        fontSize: moderateScale(14),
        marginBottom: moderateScale(4),
        marginLeft: moderateScale(4),
      },
  });