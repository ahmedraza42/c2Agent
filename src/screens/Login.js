import React, { useContext, useState } from "react";
import {
  Image,
  Keyboard,
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
import { UserContext } from "../context/UserContext";
import { showToast } from "../components/Toast";
import { saveItemToStorage } from "../utils/storage";
import deviceInfoModule from "react-native-device-info";
import TokenStorageService from "../services/tokenService";
import API_CALLS from "../services/constants";
import { useDispatch } from "react-redux";
import { UserCredentialContext } from "../context/UserCredentialContext";
const _tokenStorageService = TokenStorageService.getService();

const Login = ({ navigation, route }) => {
  const [_, setUser] = useContext(UserContext);
  const [userCredential, setUserCredential] = useContext(UserCredentialContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("ahmed@gmail.com");
  const [password, setPassword] = useState("Ahmed@123");
  const GenerateRandomNumberForDeviceID = () => {
    var RandomNumber = Math.floor(Math.random() * 10000000) + 1;
    return `${RandomNumber}@`;
  };

  const checkUserfillAllRequiredDoc = async (loginResponse) => {
    
        if (loginResponse.data.onBoarded == true) {
          saveItemToStorage("showCompleteProfile", "true");
          setUser((state) => ({
            ...state,
            ...loginResponse.model,
            isLoggedIn: true,
            isUserFirstTime: false,
            showCompleteProfile: true,
          }));
        } else {
          saveItemToStorage("showCompleteProfile", "false");
          setUser((state) => ({
            ...state,
            isLoggedIn: true,
            isUserFirstTime: false,
            showCompleteProfile: false,
          }));
        }
      
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
   saveItemToStorage("showCompleteProfile", "true");
        setUser((state) => ({
          ...state,
          isLoggedIn: true,
          isUserFirstTime: false,
          showCompleteProfile: true,
        }));
        return
    if (email.trim() === "") {
      showToast("Email is required");
      return;
    } else if (password.trim() === "") {
      showToast('Password is required"');
      return;
    }

    try {
      setLoading(true);
      let randomDevicesId = GenerateRandomNumberForDeviceID();
      const data = {
        email: email,
        password: password,
        // deviceID: deviceInfoModule.getDeviceId() || randomDevicesId,
      };
      const response = await API_CALLS.login(data);
    
      if (response?.status == true) {
        await saveItemToStorage("current_user", response.data);
        await _tokenStorageService.setAccessToken(response?.data?.token);
        await _tokenStorageService.setRefreshToken(
          response?.data?.refreshToken
        );
        // saveItemToStorage("showCompleteProfile", "true");
        // setUser((state) => ({
        //   ...state,
        //   isLoggedIn: true,
        //   isUserFirstTime: false,
        //   showCompleteProfile: true,
        // }));
        // return
        await checkUserfillAllRequiredDoc(response);
        setLoading(false);
      } else {
        console.log('response responsemmmm',response)
        throw Object.assign({}, new Error("Error."), {
          response: response,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.js ~ line 80 ~ handleLogin ~ error", error);
      showToast(
        error?.response?.data?.message ||
          "Something went wrong"
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
          <Text style={styles.heading}>LOGIN</Text>
          <Text style={styles.goodToSee}>
            Good to see you! Login to continue.
          </Text>
          <Text style={styles.emailPassword}>Email Address</Text>
          <Input
            placeholder={"Enter Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <View style={styles.top10}>
            <Text style={styles.emailPassword}>Password</Text>
            <PasswordInput
              placeholder="Enter Password"
              value={password}
              changeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.forgotView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgetPassword");
              }}
            >
              <Text style={styles.forgetPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            loading={loading}
            text={"LOGIN"}
            onPress={() => {
              handleLogin();
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
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.clickableText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;

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
});
