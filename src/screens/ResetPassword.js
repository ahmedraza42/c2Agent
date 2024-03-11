import React, { useState } from "react";
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

const ResetPassword=({ navigation, route })=> {
    let item = route?.params?.item || {};
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const resetPassword = () => {
        Keyboard.dismiss();
        if (password.trim() == '') {
          showToast('Enter New Password');
          return;
        }
        else if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/) ) {
          showToast('Must contain atleast one number , uppercase and lowercase letter and 8 characters long');
          return;
        } else if (confirmPassword.trim() == '') {
          showToast('Confirm Your New Password');
          return;
        } else if (password != confirmPassword) {
          showToast('Password do not match');
          return;
        } else {
          forgot();
          // navigation.navigate('Login');
        }
      };
    
      const forgot = async () => {
        try {
          setIsLoading(true);
          let data = {email:item}
            data.password = password;
            console.log(data);
          const response = await API_CALLS.resetPass(data);
          if (response.status == true) {
            showToast(response?.message || 'Password changed successfully!');
            navigation.navigate('Login');
          } else {
            throw Object.assign({}, new Error('Error.'), {
              response: response,
            });
          }
        } catch (error) {
          console.log('🚀 ~ file: Login.js ~ line 80 ~ handleLogin ~ error', error);
          showToast(error?.response?.message||error?.response?.data?.userMessage || 'Something went wrong');
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
        <Text style={styles.heading}>RESET PASSWORD</Text>
        <Text style={styles.goodToSee}>
        Create a new Password
        </Text>
        <Text style={styles.emailPassword}>New Password</Text>
        <PasswordInput placeholder={"New Password"} value={password} changeText={(t)=>setPassword(t)} />
        <View style={styles.top10}/>
        <Text style={styles.emailPassword}>Confirm Password</Text>
        <PasswordInput placeholder={"Confirm Password"} value={confirmPassword} changeText={(t)=>setConfirmPassword(t)} />

        <View style={styles.top20} />
        <Button
          loading={isLoading}
          text={"SUBMIT"}
          onPress={() => {
            resetPassword();
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

export default ResetPassword

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
