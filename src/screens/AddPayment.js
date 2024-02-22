import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import Header from "../components/Header";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import { Switch } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Input from "../components/Input";
import Button from "../components/Button";
import InputText from "../components/InputText";
const AddPayment = ({ navigation, route }) => {
    const [expirationDate, setExpirationDate] = useState("");
    const [methodName, setmethodName] = useState("");
    const [cvc, setcvc] = useState("");
    const [cardNo, setCardNo] = useState("");
  const [payment, setPayment] = useState([
    {
      id: 1,
      paymentMethodName: "Stripe",
      paymentDetails: "abc company",
      isSelected: true,
    },
    {
      id: 2,
      paymentMethodName: "Paypal",
      paymentDetails: "abc company",
      isSelected: false,
    },
    {
      id: 3,
      paymentMethodName: "Wallee",
      paymentDetails: "abc company",
      isSelected: false,
    },
  ]);
  const handleExpirationDateChange = (text) => {
    let formattedText = text;
    // Remove any non-digit characters
    formattedText = formattedText.replace(/[^0-9]/g, "");
    // Add a "/" after the 2nd character
    if (formattedText.length > 2) {
      formattedText = formattedText.replace(/(.{2})/, "$1/");
    }
    setExpirationDate(formattedText);
  };
  const renderImages = (image) => {
    return (
      <Feather 
      name={image}
      size={moderateScale(20)}
      color={'grey'}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header name={"Payment Method"} />
      <View style={styles.cardView}>
          <Text style={[styles.cardDetailHeadeing]}>Card Details</Text>
          <View style={styles.firstNameInputView}>
            <Text style={[styles.regularText]}>Payment Method Name</Text>
            <InputText
              placeholderTextColor={"rgba(41, 38, 42, 0.6)"}
              placeholder="Payment Method Name"
              newStyles={styles.inputStyle}
              value={methodName}
              icon={renderImages('briefcase')}
              onChangeText={(value) => {
                setmethodName(
                  value.replace(
                    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/gi,
                    ""
                  )
                );
              }}
            />
          </View>

          <View style={styles.firstNameInputView}>
            <Text style={[styles.regularText]}>Card Number</Text>
            <InputText
              placeholderTextColor={"rgba(41, 38, 42, 0.6)"}
              placeholder="Card Number"
              keyboardType={"numeric"}
              newStyles={styles.inputStyle}
              value={cardNo}
              icon={renderImages('credit-card')}
              onChangeText={(value) => {
                if (value?.length < 17) {
                  setCardNo(value.replace(/[^0-9]/g, ""));
                }
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ ...styles.firstNameInputView, width: "48%" }}>
              <Text style={[styles.regularText]}>Expiry</Text>
              <InputText
                placeholderTextColor={"rgba(41, 38, 42, 0.6)"}
                placeholder="MM/YY"
                newStyles={styles.inputStyle}
                value={expirationDate}
                keyboardType={"numeric"}
                icon={renderImages('calendar')}
                onChangeText={(value) => {
                  if (value?.length < 6) {
                    handleExpirationDateChange(value);
                  }
                }}
              />
            </View>
            <View style={{ ...styles.firstNameInputView, width: "48%" }}>
              <Text style={[styles.regularText]}>CVC</Text>
              <InputText
                placeholderTextColor={"rgba(41, 38, 42, 0.6)"}
                placeholder="CVC"
                newStyles={styles.inputStyle}
                keyboardType={"numeric"}
                value={cvc}
                icon={renderImages('lock')}
                onChangeText={(value) => {
                  if (value?.length < 4) {
                    setcvc(value);
                  }
                }}
              />
            </View>
          </View>
        </View>
      

      <Button text={'ADD PAYMENT METHOD'} onPress={()=>navigation.navigate('Favourites')} mystyle={{marginVertical:moderateScale(15)}}/>
    </View>
  );
};

export default AddPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: moderateScale(15),
  },
  walletRootView: {
    backgroundColor: colors.primary,
    height: moderateScale(130),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  heading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(18),
  },
  creditHeading: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(16),
    letterSpacing: moderateScale(0.48),
  },
  credit: {
    fontFamily: fontFamily.Regular,
    fontSize: moderateScale(30),
    letterSpacing: moderateScale(0.58),
  },
  paymentText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.SemiBold,
  },
  paymentSubText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.Regular,
  },
  paymentIcon: {
    width: moderateScale(45),
    height: moderateScale(45),
    marginHorizontal: moderateScale(10),
  },
  paymentButton: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(10),
    width: "100%",
    height: moderateScale(60),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemCenter:{
    alignItems: "center",
    justifyContent: "center",
  },
  cardDetailHeadeing: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(20),
    color: colors.input,
    lineHeight: moderateScale(25),
  },
  firstNameInputView: {
    width: "100%",
    // paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
  },
  regularText: {
    color: colors.black,
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
    marginLeft: moderateScale(5),
    marginBottom: moderateScale(5),
  },
  inputStyle: {
    width: "90%",
    fontFamily: fontFamily.Regular,
  },
  emailIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(3),
  },
  cardView: {
    width: "99%",
   
    marginVertical: moderateScale(15),
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
  },
});
