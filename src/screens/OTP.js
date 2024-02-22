import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "../components/Text";
import colors from "../theme/Colors";
import { fontFamily } from "../theme/Fonts";
import { moderateScale } from "react-native-size-matters";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { AllowNumbers } from "../utils/regex";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import API_CALLS from "../services/constants";
import { showToast } from "../components/Toast";
import { UserContext } from "../context/UserContext";
import { saveItemToStorage } from "../utils/storage";
import deviceInfoModule from "react-native-device-info";
import {
  GenerateRandomNumberForDeviceID,
  time,
} from "../services/reusableFunctions";
import TokenStorageService from "../services/tokenService";
const _tokenStorageService = TokenStorageService.getService();
const OTP = ({ navigation, route }) => {
  const resentTimeout = 15;
  const [_, setUser] = useContext(UserContext);
  const item = route.params.data || {};
  console.log({ item });
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(true);
  const [clearInput, setClearInput] = useState(false);
  const [counter, setCounter] = useState(resentTimeout);
  const [error, setError] = useState(null);
  const [_code, setCode] = useState("");
  const [otp, setotp] = useState(item.otp);
  const [ValidationError, setValidationError] = useState(false);

  useEffect(() => {
    let countTimer;
    if (counter > 0) {
      countTimer = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setResendLoading(false);
      countTimer && clearTimeout(countTimer);
    }
    return () => {
      countTimer && clearTimeout(countTimer);
    };
  }, [counter]);
  const onCodeChanged = (code) => {
    if (code?.length === 4 && AllowNumbers.test(code)) {
      setCode(parseInt(code));
      handleSubmit(parseInt(code));
    } else {
      setValidationError(true);
    }
  };

  const handleSubmit = async (code) => {
    if (AllowNumbers.test(code)) {
      setValidationError(false);
      setIsLoading(true);
      setError(null);
      try {
        setIsLoading(true);
        let data = {
          email: item.email,
          otp: code.toString(),
        };
        const response = await API_CALLS.verifyOtp(data);
        if (response.status == true) {
          showToast(response?.message);
          navigation.navigate('ResetPassword',{item:item.email})
        } else {
          throw Object.assign({}, new Error("Error."), {
            response: response,
          });
        }
      } catch (error) {
        console.log("🚀 ~ Signup OTp handle submit error", error);
        showToast(
          error?.response?.message|| error?.response?.data?.message||"Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setValidationError(true);
    }
  };

  const resendSubmit = async () => {
    setError(null);
    try {
      setIsLoading(true);
      let data = {
        email: item.email,
      };
      const response = await API_CALLS.forgetPass(data);
      if (response.status == true) {
        console.log("rsend", response);
        setotp(response.data.otp);
        showToast(response?.message || "Please check your email");
        setResendLoading(true);
        setCounter(resentTimeout);
      } else {
        throw Object.assign({}, new Error("Error."), {
          response: response,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.js ~ line 80 ~ handleLogin ~ error", error);
      showToast(error?.response?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    navigation.navigate("Login");
    return;
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          source={require("../assets/icons/loginIcon.png")}
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
          <Text style={styles.heading}>VERIFICATION</Text>
          <Text style={{ ...styles.goodToSee }}>
            A Verification code was sent to your email
          </Text>
          <Text style={{ ...styles.goodToSee, color: colors.primary }}>
            {item.email}/{item.otp}
          </Text>
          <View style={styles.otpRootView}>
            <OTPInputView
              style={styles.OTPInputView}
              pinCount={4}
              autoFocusOnLoad
              editable={!isLoading}
              codeInputHighlightStyle={styles.codeInputHighlightStyle}
              codeInputFieldStyle={styles.codeInputFieldStyle}
              onCodeFilled={onCodeChanged}
              clearInputs={clearInput}
            />
          </View>
          <View style={{}}>
            {error ? (
              <Text style={styles.errorText}>
                Please enter correct verification code
              </Text>
            ) : ValidationError ? (
              <Text style={styles.errorText}>
                5 digits Verification code is required
              </Text>
            ) : null}
          </View>
          <View style={{ alignSelf: "center", marginTop: moderateScale(5) }}>
            {resendLoading ? (
              <Text style={styles.resendText}>{time(counter)}</Text>
            ) : (
              <TouchableOpacity
                onPress={() => resendSubmit()}
                style={styles.resendText}
              >
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* <View style={styles.top20} /> */}
          <Button
            loading={isLoading}
            text={"SUBMIT"}
            onPress={() => {
              handleSubmit();
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
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.clickableText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OTP;

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
    marginBottom: moderateScale(1),
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

  emailPassword: {
    fontFamily: fontFamily.SemiBold,
    color: colors.input,
    fontSize: moderateScale(14),
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
  top10: {
    marginTop: moderateScale(10),
  },
  OTPInputView: {
    height: moderateScale(40),
    alignItems: "center",
  },
  codeInputHighlightStyle: {
    borderColor: colors.primary,
    borderWidth: moderateScale(2),
    padding: moderateScale(10),
    justifyContent: "center",
    width: moderateScale(60),
    height: moderateScale(55),
    alignItems: "center",
  },
  codeInputFieldStyle: {
    fontSize: moderateScale(20),
    // borderColor: 'rgba(142, 124, 124, 0.9)',
    backgroundColor: "rgba(237, 237, 237, 1)",
    borderRadius: moderateScale(5),
    width: moderateScale(60),
    height: moderateScale(55),
    color: colors.input,
  },
  errorText: {
    color: "red",
    fontFamily: fontFamily.Medium,
    marginBottom: moderateScale(10),
    marginLeft: moderateScale(5),
  },
  resendText: {
    color: colors.primary,
    fontFamily: fontFamily.Bold,
    marginBottom: moderateScale(10),
  },
  otpRootView:{
    marginTop: moderateScale(25),marginBottom:moderateScale(15) 
  }
});
