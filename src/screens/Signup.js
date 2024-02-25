import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
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
import CheckBox from "@react-native-community/checkbox";
import { showToast } from "../components/Toast";
import PhoneInput from "react-native-phone-number-input";
import deviceInfoModule from "react-native-device-info";
import API_CALLS from "../services/constants";
import { remove, saveItemToStorage } from "../utils/storage";
import Geolocation from "react-native-geolocation-service";
import { requestLocationPermission } from "../utils/permission";
import CountryPicker from 'react-native-country-picker-modal';
import Geocoder from "react-native-geocoding";
import { GenerateRandomNumberForDeviceID } from "../services/reusableFunctions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SelectDropdown from "react-native-select-dropdown";
// AIzaSyBTDy36qLgX3Ff6ubBMpWI9TcFoOkFDzhw
const Signup = ({ navigation, route }) => {
  const phoneInput = useRef(null);
  const [password, setPassword] = useState("CF!janamercer297");
  const [email, setEmail] = useState("test21@test.com");
  const [loading, setLoading] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [countryCode, setCountryCode] = useState("AE");
  const [phoneCode, setPhoneCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    Geocoder.init("AIzaSyDipHIchD79mO4LM_C_54Hu9LkAfjVscUs");
    if (Platform.OS==='android' &&requestLocationPermission() ) {
      getLatLong()
    }
    else{
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
         authorizationLevel: 'whenInUse',
       });

       getLatLong()
      }
    }
  }, []);

  const getLatLong = async () => {
    await Geolocation.getCurrentPosition(
      (position) => {
        // console.log({ position });
        // getAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getAddress = (lat, long) => {
    Geocoder.from(lat, long)
      .then((json) => {
        var location = json.results[0];
        console.log({location});
      })
      .catch((error) => console.log('error error',error));
  };
  const handleSignup = () => {
    // navigation.navigate('SignupOTP')
    // return
    Keyboard.dismiss();
    var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (phoneInput?.current) {
      const checkValid = phoneInput.current?.isValidNumber(formattedValue);
      if (!checkValid) {
        showToast("Invalid Phone Number");
        return;
      }
    }
    // if (accountName.trim() === "") {
    //   showToast("Account Name is required");
    //   return;
    // }
    // else if (!email.match(validEmailRegex)) {
    //   showToast("Invalid Email");
    //   return;
    // } else if (phoneNumber.length == 0) {
    //   showToast("Phone number is required");
    //   return;
    // }
    
    else if (password.trim() === "") {
      showToast("Password is required");
      return;
    } 
    else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/) ) {
      showToast('Must contain atleast one number , uppercase and lowercase letter and 8 characters long');
      return;
    }
      doSIgnup();
    
  };

  const doSIgnup = async (type) => {
    try {
      remove("current_user");
      remove("mentee");
      remove("showCompleteProfile");
      let randomDevicesId = GenerateRandomNumberForDeviceID();
      console.log({formattedValue})
      setLoading(true);
      const data = {
        phone_number: formattedValue,
        password: password,
        "type" : "seller"
      };
      const signupData = await API_CALLS.signup(data);
      console.log({ signupData });
      if (signupData.status == true) {
        showToast('Signup Successful')
        console.log('response.data.path',signupData.data.path)
        await saveItemToStorage("qrcode", signupData.data.path);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log({ error });
      showToast(
        error?.response?.data?.message ||
          "Something went wrong ,Signup failed"
      );
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.heading}>SIGN UP</Text>
        <Text style={styles.goodToSee}>
          Good to see you! Signup to get started.
        </Text>
        <Text style={styles.emailPassword}>Phone Number</Text>
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

        <View style={styles.top10}>
          <Text style={styles.emailPassword}>Password</Text>
          <PasswordInput
            placeholder="Enter Password"
            value={password}
            changeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.top20} />
        <Button
          loading={loading}
          text={"SIGNUP"}
          onPress={() => {
            handleSignup();
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
};

export default Signup;

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
    color: "black",
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
