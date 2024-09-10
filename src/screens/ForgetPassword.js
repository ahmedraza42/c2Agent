import React, { useRef, useState } from "react";
import { Image, ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import { fontFamily } from "../theme/Fonts";
import { moderateScale } from "react-native-size-matters";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import API_CALLS from "../services/constants";
import { showToast } from "../components/Toast";
import PhoneInput from "react-native-phone-number-input";

const ForgetPassword=({ navigation, route })=> {
  const phoneInput = useRef(null);
  const [email, setEmail] = useState("test21@gmail.com");
  const [isLoading, setIsLoading] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [countryCode, setCountryCode] = useState("AE");
  const [phoneCode, setPhoneCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const forgetPasword = () => {
    // navigation.navigate('ResetPassword')
    // return
    var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    Keyboard.dismiss();
    if (email.trim() === "") {
      showToast("Email is required");
      return;
    }
    if (!email.match(validEmailRegex)) {
      showToast("Invalid Email");
      return;
    } else {
      forgot();
    }
  };
  const forgot = async () => {
    
    try {
      setIsLoading(true);
      const data = {
        email: email,
      };
      console.log({data})
      const response = await API_CALLS.forgetPass(data);
      console.log({response})
      if (response.status == true) {
        showToast(response?.message);
      
        let item ={
          email:email,
          otp:response.data.otp,
        } 
        navigation.navigate("OTP", { data: item });
      } else {
        throw Object.assign({}, new Error("Error."), {
          response: response,
        });
      }
    } catch (error) {
      console.log("forgot password error", error);
      showToast(error?.response?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
    <View style={styles.iconView}>
      <Image
        source={require("../assets/icons/round.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    </View>
    <View style={styles.container2}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        style={{ flex: 1 }}
      >
        <Text style={styles.heading}>FORGOT PASSWORD</Text>
        <Text style={styles.goodToSee}>
          Good to see you! Enter phone number to reset your password.
        </Text>
        <Text style={styles.emailPassword}>Email Address</Text>
        <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode={countryCode}
                  layout="second"
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                  onChangeCountry={(text) => {
                    console.log(text)
                    setPhoneCode(text.callingCode[0]);
                    setCountryCode(text.cca2);
                  }}
                  codeTextStyle={styles.codeTextStyle}
                  containerStyle={styles.phoneInputContainerStyle}
                  textInputStyle={styles.phoneTextStyle}
                  textContainerStyle={styles.phoneTextContainerStyle}
                  countryPickerButtonStyle={styles.countryPickerButtonStyle}
                />

        <View style={styles.top20} />
        <Button
          loading={isLoading}
          text={"NEXT"}
          onPress={() => {
            forgetPasword();
          }}
        />
        <View style={styles.top20} />
        <View style={styles.justifyCenter}>
          <Text
            style={{
              ...styles.forgetPassword,
              fontFamily: fontFamily.Medium,
            }}
          >
            Dont have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.clickableText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </View>
  );
}

export default ForgetPassword
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
  emailPassword: {
    fontFamily: fontFamily.SemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
    marginBottom: moderateScale(4),
    marginLeft: moderateScale(4),
  },
  forgetPassword: {
    color: colors.input,
    fontFamily: fontFamily.SemiBold,
    fontSize: moderateScale(14),
  },
  forgotView: {
    marginVertical: moderateScale(13),
    alignItems: "flex-end",
  },
  top20: {
    marginTop: moderateScale(20),
  },
  justifyCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  top10: {
    marginTop: moderateScale(10),
  },
  clickableText: {
    color: colors.primary,
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(14),
    // textDecorationLine: "underline",
  },
  heading: {
    fontFamily: fontFamily.Bold,
    fontSize: moderateScale(20),
    color: colors.input,
  },
  goodToSee: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(13),
    color: colors.input,
    marginBottom: moderateScale(10),
  },
  icon: {
    width: moderateScale(130),
    height: moderateScale(110),
  },
  iconView: {
    flex: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  codeTextStyle: {
    fontFamily: fontFamily.Medium,
    fontSize: moderateScale(12),
  },
  phoneInputContainerStyle: {
    backgroundColor: 'rgba(237, 237, 237, 1)',
    height: moderateScale(50),
    borderRadius: moderateScale(14),
    paddingHorizontal: moderateScale(7),
    width: "100%",
  },
  phoneTextStyle: {
    fontFamily: fontFamily.Regular,
    fontSize: moderateScale(14),
    alignItems: "center",
    color: colors.input,
    height: moderateScale(40),
   
    backgroundColor:'rgba(237, 237, 237, 1)',
  },
  phoneTextContainerStyle: {
    alignItems: "center",
    fontSize: moderateScale(10),
    color: "black",
    backgroundColor:'rgba(237, 237, 237, 1)',
  },
  countryPickerButtonStyle: {
    backgroundColor: "rgba(50, 80, 141, 0.2)",
    width: moderateScale(60),
    height: moderateScale(30),
    borderRadius: moderateScale(10),
    alignSelf: "center",
  },
});
