import React, { useContext, useEffect, useState } from 'react'
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
import Input from '../components/Input';
import { ModalContext } from '../context/ModalContext';
import { ProfileContext } from '../context/ProfileContext';

const Commission2=({ navigation, route })=> {
    let id = route.params.item||null
    console.log({id})
    const [userProfile, setUserProfile] = useContext(ProfileContext);
    const [loading, setLoading] = useState(true);
    const [btnloading, setBtnLoading] = useState(false);
    const [payments, setPayment] = React.useState([]);
    const [checked, setChecked] = React.useState(id);
    const [commission, setCommission] = React.useState([]);
    const [acountname, setAcountName] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [bankName, setBankName] = React.useState('');
    const [iban, setiban] = React.useState('');
    const [pop, setModal] = useContext(ModalContext);
    console.log({userProfile})
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

      const navigateToNextPage=async()=>{
        console.log("fdfds")
        if(checked==null){
         showToast("Please select payment method")
         return
        }
        if(checked!=4&&acountname==''){
          showToast("Account name is required")
          return
         }
         if(checked!=4&&accountNumber.length!=16){
          showToast("Account number is invalid")
          return
         }
         if(checked!=4&&accountNumber==''){
          showToast("Account number is required")
          return
         }
         if(checked!=4&&bankName==''){
          showToast("Bank name is required")
          return
         }
         if(checked!=4&&iban==''){
          showToast("IBAN is required")
          return
         }
         if(checked!=4&&iban.length!=23){
          showToast("IBAN is invalid")
          return
         }
        let data={
          user_id:userProfile.id,
          "payment_method_id": checked,
          "account_name":  checked==4?null:acountname,
          "account_number": checked==4?null:accountNumber,
          "bank_name": checked==4?null:bankName,
          "iban_no":checked==4?null:iban,
        };
        setBtnLoading(true)
        try {
          const response = await API_CALLS.updateBankDetails(data);
          console.log("updateBankDetails", response);
          if (response.status === true) {
            setBtnLoading(false)
            
            setModal((state) => ({
                ...state,
                heading: "Commission Setup Complete",
                subHeading: "Your account setup is now complete",
                visible: true,
                // gotoHome: true,
              }));
              navigation.navigate("Homes")
          }
        } catch (error) {
          setBtnLoading(false)
          console.log("getPaymentMethods error", error);
        }  
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
      console.log({commission})
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
                  source={{ uri: item?.img }}
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

       {checked!=4? <>
       <View style={styles.top10}>
            <Text style={styles.emailPassword}>Account Name</Text>
            <Input
              placeholder="Type here"
              value={acountname}
              onChangeText={(text) => setAcountName(text)}
            />
          </View>
          <View style={styles.top10}>
            <Text style={styles.emailPassword}>Account Number</Text>
            <Input
              placeholder="Type here"
              value={accountNumber}
              onChangeText={(text) => {
                if (text?.length < 17) {
                  setAccountNumber(text.replace(/[^0-9]/g, ""));
                }
                }}
            />
          </View>
          <View style={styles.top10}>
            <Text style={styles.emailPassword}>Bank Name</Text>
            <Input
              placeholder="Type here"
              value={bankName}
              onChangeText={(text) => {
                setBankName(text.replace(
                    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/gi,
                    ""
                  ));
                }}
            />
          </View>
          <View style={styles.top10}>
            <Text style={styles.emailPassword}>IBAN</Text>
            <Input
              placeholder="Type here"
              value={iban}
              onChangeText={(text) => {
                if (text?.length < 24) {
                  setiban(text.replace(
                    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/gi,
                    ""
                  ))}}
                }
               
            />
          </View>
          <View style={styles.top10}/>
   
       </>:null}
       <Button
            loading={btnloading}
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