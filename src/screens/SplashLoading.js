import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { UserContext } from "../context/UserContext";
import {
  getItemFromStorage,
} from "../utils/storage";
import Text from "../components/Text";
import { fontFamily } from "../theme/Fonts";
import colors from "../theme/Colors";
import { useDispatch } from "react-redux";
import { getUserEmailAndId } from "../redux/actions/user";
import { UserCredentialContext } from "../context/UserCredentialContext";
import { requestLocationPermission } from "../utils/permission";

const SplashLoading = () => {
  const [_, setUser] = useContext(UserContext);
  const [userCredential, setUserCredential] = useContext(UserCredentialContext);
  const navigation = useNavigation();
  const dispatch=useDispatch()
  React.useEffect(() => {
    requestLocationPermission()
  }, []);
  
  useEffect(() => {
    setTimeout(function () {
      bootstrapAsync();
    }, 1000);

    const bootstrapAsync = async () => {
      try {
        let currentUser = await getItemFromStorage('current_user');
        console.log({currentUser})
        let isUserFirstTimeCome = await getItemFromStorage(
          "isUserFirstTimeCome"
        );
        let showCompleteProfile = await getItemFromStorage(
          "showCompleteProfile"
        );
        console.log({showCompleteProfile})
        if (currentUser ) {
          console.log('splash loading',currentUser.id,currentUser.emailAddress)
          // dispatch(getUserEmailAndId(currentUser.id,currentUser.emailAddress))
          setUserCredential((state) => ({
            ...state,
            id:currentUser.id,
            emailAddress:currentUser.emailAddress
          }));
          setUser((state) => ({
            ...state,
            isLoggedIn: true,
            isUserFirstTime: false,
            showCompleteProfile:showCompleteProfile==='true'?true:false
          }));
          return;
        }
        if (isUserFirstTimeCome == "true") {
          setUser((state) => ({
            ...state,
            isLoggedIn: false,
            isUserFirstTime: false,
          }));
          return;
        } else {
          setUser((state) => ({
            ...state,
            isLoggedIn: false,
            isUserFirstTime: true,
          }));
          return;
        }
      } catch (error) {
        setUser((state) => ({
          ...state,
          isLoggedIn: false,
          isUserFirstTime: false,
        }));
      }
    };
  }, []);
  return (
    <View style={styles.RootView}>
      <ActivityIndicator size={"small"} color={colors.input} />
      <View style={styles.textView}>
        <Text style={styles.text}>
          Copyright © 2024 mplace agent LLC. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

export default SplashLoading;

const styles = StyleSheet.create({
  RootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  textView: {
    position: "absolute",
    bottom: moderateScale(25),
  },
  text: {
    color: "black",
    fontSize: moderateScale(10),
    fontFamily:fontFamily.Medium
  },
});
